
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Minus, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
}

const Cart = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Требуется авторизация",
            description: "Пожалуйста, войдите в систему чтобы просмотреть корзину",
          });
          navigate('/login');
          setIsLoading(false);
          return;
        }

        const { data: cartData, error: cartError } = await supabase
          .from('cart_items')
          .select(`
            id,
            quantity,
            product_id,
            products (
              id,
              name,
              price,
              images
            )
          `)
          .eq('user_id', user.id);

        if (cartError) {
          console.error('Error fetching cart items:', cartError);
          throw cartError;
        }

        console.log('Raw cart data:', cartData); // Debug log
        
        // Трансформируем данные в ожидаемый формат
        const formattedCartItems = cartData?.map(item => ({
          id: item.id,
          product: item.products || {
            id: item.product_id || '',
            name: 'Товар недоступен',
            price: 0,
            images: ['/placeholder.svg']
          },
          quantity: item.quantity
        })) || [];
        
        console.log('Formatted cart items:', formattedCartItems); // Debug log
        setCartItems(formattedCartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить корзину",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [toast, navigate]);

  const updateQuantity = async (id: string, change: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const item = cartItems.find(item => item.id === id);
      if (!item) return;

      const newQuantity = Math.max(1, item.quantity + change);

      const { error } = await supabase
        .from('cart_items')
        .update({ 
          quantity: newQuantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setCartItems(items =>
        items.map(item =>
          item.id === id
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить количество",
      });
    }
  };

  const removeItem = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setCartItems(items => items.filter(item => item.id !== id));
      toast({
        title: "Товар удален из корзины",
        description: "Товар был успешно удален из корзины",
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить товар",
      });
    }
  };

  const total = cartItems.reduce((sum, item) => 
    sum + (item.product?.price || 0) * item.quantity, 0
  );

  const handleCheckout = () => {
    toast({
      title: "Заказ оформлен",
      description: "Спасибо за покупку! Мы свяжемся с вами в ближайшее время",
    });
    setCartItems([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center text-white">
            Загрузка...
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Корзина</h1>

          {cartItems.length === 0 ? (
            <div className="text-center text-white/80">
              <p className="text-xl mb-4">Ваша корзина пуста</p>
              <button
                onClick={() => window.history.back()}
                className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors"
              >
                Вернуться к покупкам
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-secondary p-6 rounded-lg flex items-center gap-6">
                  <img
                    src={item.product?.images?.[0] || '/placeholder.svg'}
                    alt={item.product?.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{item.product?.name}</h3>
                    <p className="text-white/80">{item.product?.price?.toLocaleString() || 0} ₽</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-accent rounded-md transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-accent rounded-md transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}

              <div className="bg-secondary p-6 rounded-lg">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg">Итого:</span>
                  <span className="text-2xl font-bold">{total.toLocaleString()} ₽</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors"
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
