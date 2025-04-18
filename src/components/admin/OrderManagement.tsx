
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Package, Eye, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  created_at: string;
  status: string;
  shipping_address: string;
  user_email?: string;
}

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_time: number;
  product_name?: string;
}

export const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Fetch user emails for each order
      if (data) {
        const ordersWithEmail = await Promise.all(
          data.map(async (order) => {
            const { data: userData } = await supabase.auth.admin.getUserById(order.user_id);
            return {
              ...order,
              user_email: userData?.user?.email || 'Неизвестный пользователь'
            };
          })
        );
        
        setOrders(ordersWithEmail);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить список заказов",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderItems = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);
        
      if (error) throw error;
      
      if (data) {
        // Fetch product names for each item
        const itemsWithProductNames = await Promise.all(
          data.map(async (item) => {
            const { data: productData } = await supabase
              .from('products')
              .select('name')
              .eq('id', item.product_id)
              .single();
              
            return {
              ...item,
              product_name: productData?.name || 'Неизвестный товар'
            };
          })
        );
        
        setOrderItems(itemsWithProductNames);
      }
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      setIsUpdating(true);
      
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
        
      if (error) throw error;
      
      // Update the orders list
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));
      
      toast({
        title: "Успех",
        description: "Статус заказа обновлен",
      });
      
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус заказа",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    fetchOrderItems(order.id);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Ожидает</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Обработка</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Отправлен</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Доставлен</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Отменен</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Управление заказами</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Фильтр по статусу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все статусы</SelectItem>
                <SelectItem value="pending">Ожидает</SelectItem>
                <SelectItem value="processing">Обработка</SelectItem>
                <SelectItem value="shipped">Отправлен</SelectItem>
                <SelectItem value="delivered">Доставлен</SelectItem>
                <SelectItem value="cancelled">Отменен</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Номер</TableHead>
                  <TableHead>Покупатель</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                    <TableCell>{order.user_email}</TableCell>
                    <TableCell>{formatDate(order.created_at)}</TableCell>
                    <TableCell>{order.total_amount.toLocaleString()} ₽</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>Просмотр заказа #{selectedOrder?.id.substring(0, 8)}</DialogTitle>
                          </DialogHeader>
                          
                          {selectedOrder && (
                            <div className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium text-sm text-muted-foreground">Покупатель</h4>
                                  <p>{selectedOrder.user_email}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm text-muted-foreground">Дата заказа</h4>
                                  <p>{formatDate(selectedOrder.created_at)}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm text-muted-foreground">Адрес доставки</h4>
                                  <p>{selectedOrder.shipping_address}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm text-muted-foreground">Статус</h4>
                                  {getStatusBadge(selectedOrder.status)}
                                </div>
                              </div>
                              
                              <div className="mt-6">
                                <h4 className="font-medium mb-2">Позиции заказа</h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Товар</TableHead>
                                      <TableHead>Цена</TableHead>
                                      <TableHead>Кол-во</TableHead>
                                      <TableHead className="text-right">Сумма</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {orderItems.map((item) => (
                                      <TableRow key={item.id}>
                                        <TableCell>{item.product_name}</TableCell>
                                        <TableCell>{Number(item.price_at_time).toLocaleString()} ₽</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell className="text-right">
                                          {(Number(item.price_at_time) * item.quantity).toLocaleString()} ₽
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                                <div className="flex justify-between items-center mt-4">
                                  <div className="font-medium">Итого:</div>
                                  <div className="font-bold text-lg">{selectedOrder.total_amount.toLocaleString()} ₽</div>
                                </div>
                              </div>
                              
                              <div className="mt-6 space-y-2">
                                <h4 className="font-medium">Изменить статус</h4>
                                <div className="flex gap-2">
                                  <Select 
                                    value={selectedStatus || selectedOrder.status} 
                                    onValueChange={setSelectedStatus}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Выберите статус" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Ожидает</SelectItem>
                                      <SelectItem value="processing">Обработка</SelectItem>
                                      <SelectItem value="shipped">Отправлен</SelectItem>
                                      <SelectItem value="delivered">Доставлен</SelectItem>
                                      <SelectItem value="cancelled">Отменен</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Button 
                                    onClick={() => updateOrderStatus(selectedOrder.id, selectedStatus || selectedOrder.status)}
                                    disabled={isUpdating || (!selectedStatus || selectedStatus === selectedOrder.status)}
                                  >
                                    {isUpdating ? (
                                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    ) : (
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                    )}
                                    Сохранить
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">Нет заказов</h3>
              <p className="text-muted-foreground">
                {statusFilter ? "Нет заказов с выбранным статусом" : "Пока нет заказов"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
