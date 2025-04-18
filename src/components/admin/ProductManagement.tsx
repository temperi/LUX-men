
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category_id: string;
}

export const ProductManagement = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    images: [""],
    category_id: ""
  });

  const loadProducts = async () => {
    try {
      // Load products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*');

      if (productsError) throw productsError;
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить товары",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      const { error } = await supabase
        .from('products')
        .insert({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          description: newProduct.description,
          images: newProduct.images,
          category_id: newProduct.category_id
        });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Товар добавлен",
      });
      
      loadProducts();
      setNewProduct({
        name: "",
        price: "",
        description: "",
        images: [""],
        category_id: ""
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось добавить товар",
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: selectedProduct.name,
          price: selectedProduct.price,
          description: selectedProduct.description,
          images: selectedProduct.images,
          category_id: selectedProduct.category_id
        })
        .eq('id', selectedProduct.id);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Товар обновлен",
      });
      
      loadProducts();
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить товар",
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Товар удален",
      });
      
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить товар",
      });
    }
  };

  // Load products when component mounts
  useState(() => {
    loadProducts();
  });

  if (isLoading) {
    return <div>Загрузка товаров...</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Управление товарами</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Добавить товар
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить новый товар</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Название"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <Input
                placeholder="Цена"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <Textarea
                placeholder="Описание"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
              <Input
                placeholder="URL изображения"
                value={newProduct.images[0]}
                onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
              />
              <Input
                placeholder="ID категории"
                value={newProduct.category_id}
                onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
              />
              <Button onClick={handleAddProduct}>Добавить</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price.toLocaleString()} ₽</TableCell>
                <TableCell>{product.category_id}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setSelectedProduct(product)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Редактировать товар</DialogTitle>
                        </DialogHeader>
                        {selectedProduct && (
                          <div className="space-y-4">
                            <Input
                              placeholder="Название"
                              value={selectedProduct.name}
                              onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                            />
                            <Input
                              placeholder="Цена"
                              type="number"
                              value={selectedProduct.price}
                              onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })}
                            />
                            <Textarea
                              placeholder="Описание"
                              value={selectedProduct.description}
                              onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                            />
                            <Input
                              placeholder="URL изображения"
                              value={selectedProduct.images[0]}
                              onChange={(e) => setSelectedProduct({ ...selectedProduct, images: [e.target.value] })}
                            />
                            <Input
                              placeholder="ID категории"
                              value={selectedProduct.category_id}
                              onChange={(e) => setSelectedProduct({ ...selectedProduct, category_id: e.target.value })}
                            />
                            <Button onClick={handleUpdateProduct}>Сохранить</Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
