
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Users, CreditCard, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface StoreStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
}

export const StoreOverview = () => {
  const [stats, setStats] = useState<StoreStats>({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStoreStats = async () => {
      try {
        setIsLoading(true);
        
        // Fetch total products
        const { count: productsCount } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });
          
        // Fetch total orders
        const { count: ordersCount } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true });
          
        // Fetch total users
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
          
        // Calculate total sales
        const { data: salesData } = await supabase
          .from('orders')
          .select('total_amount');
          
        const totalSales = salesData?.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0;
        
        setStats({
          totalProducts: productsCount || 0,
          totalOrders: ordersCount || 0,
          totalUsers: usersCount || 0,
          totalSales
        });
      } catch (error) {
        console.error('Error fetching store statistics:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStoreStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Выручка</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-8 w-24 bg-muted/20 animate-pulse rounded"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">{stats.totalSales.toLocaleString()} ₽</div>
              <p className="text-xs text-muted-foreground">Общая сумма продаж</p>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Заказы</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-8 w-12 bg-muted/20 animate-pulse rounded"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">Всего заказов</p>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Товары</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-8 w-12 bg-muted/20 animate-pulse rounded"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">Активных товаров</p>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Пользователи</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-8 w-12 bg-muted/20 animate-pulse rounded"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Всего пользователей</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
