
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { ProductModal } from "./ProductModal";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  images: string[];
  description: string;
}

export const Sale = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(6);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Проставляем oldPrice для скидок
          const productsWithDiscount = data.map(product => ({
            ...product,
            oldPrice: product.price * 2 // В два раза больше для скидки 50%
          }));
          
          setSaleProducts(productsWithDiscount);
        } else {
          // Если нет данных в БД, используем заглушку
          setSaleProducts([
            {
              id: "d2f7d475-5910-4c45-8b96-2e0e2c0d29d3",
              name: "Премиум костюм",
              price: 49990,
              oldPrice: 99990,
              images: [
                "https://images.unsplash.com/photo-1617137968427-85924c800a22?crop=1",
                "https://images.unsplash.com/photo-1593032465175-481ac7f401a0",
                "https://images.unsplash.com/photo-1594938328870-9623159c8c99"
              ],
              description: "Элегантный костюм премиум-класса, идеально подходит для особых случаев и деловых встреч. Изготовлен из высококачественной шерсти."
            },
            {
              id: "c68c8b5c-7fb8-4e8a-9df1-0e6f61d98c46",
              name: "Классический костюм",
              price: 49990,
              oldPrice: 99990,
              images: [
                "https://images.unsplash.com/photo-1617137968427-85924c800a22?crop=2",
                "https://images.unsplash.com/photo-1593032465175-481ac7f401a0",
                "https://images.unsplash.com/photo-1594938328870-9623159c8c99"
              ],
              description: "Классический костюм из премиальной ткани, подходит для любых официальных мероприятий. Отличное качество пошива и материалов."
            },
            {
              id: "f7e1ae24-8951-4cea-a812-6e789c46d0e4",
              name: "Деловой костюм",
              price: 49990,
              oldPrice: 99990,
              images: [
                "https://images.unsplash.com/photo-1617137968427-85924c800a22?crop=3",
                "https://images.unsplash.com/photo-1593032465175-481ac7f401a0",
                "https://images.unsplash.com/photo-1594938328870-9623159c8c99"
              ],
              description: "Современный деловой костюм, сочетающий в себе комфорт и элегантность. Идеально подходит для повседневной офисной работы."
            }
          ]);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const loadFavorites = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('favorites')
          .select('product_id')
          .eq('user_id', user.id);

        if (error) throw error;

        setFavorites(data.map(fav => fav.product_id));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadProducts();
    loadFavorites();
  }, []);

  const toggleFavorite = async (productId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Требуется авторизация",
          description: "Пожалуйста, войдите в систему чтобы добавить товар в избранное",
        });
        navigate('/login');
        return;
      }

      if (favorites.includes(productId)) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) throw error;

        setFavorites(favorites.filter(id => id !== productId));
        toast({
          title: "Удалено из избранного",
          description: "Товар успешно удален из избранного",
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            product_id: productId
          });

        if (error) throw error;

        setFavorites([...favorites, productId]);
        toast({
          title: "Добавлено в избранное",
          description: "Товар успешно добавлен в избранное",
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить избранное",
      });
    }
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-accent">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Специальное предложение</h2>
          <p className="text-xl mb-8 text-white/80">Загрузка товаров...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Специальное предложение</h2>
        <p className="text-xl mb-8 text-white/80">Скидки до 50% на выбранные товары</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={() => setSelectedProduct(product)}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
    </section>
  );
};
