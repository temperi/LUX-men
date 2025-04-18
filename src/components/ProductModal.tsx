
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { Star, Heart, Truck, Package, Ruler } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProductGallery } from "./product/ProductGallery";
import { ProductDetails } from "./product/ProductDetails";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    images: string[];
    description: string;
  };
}

export const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const sizes = ["S", "M", "L", "XL", "XXL"];
  
  const productDetails = {
    season: "Зима",
    material: "Полиэстер, Эластан",
    composition: "Полиэстер 95%, эластан 5%",
    collection: "Осень-зима 2024",
    style: "Повседневный"
  };

  // Демо отзывы, в реальном приложении должны загружаться из БД
  const reviews = [
    { 
      id: 1, 
      rating: 5, 
      author: "Zen", 
      date: "11 декабря 2024",
      comment: "Шикарный товар! Начиная с фирменной упаковки с логотипом, продолжая самим комплектом термобелья и заканчивая приятным презентом! Сам комплект очень качественный, сшит максимально аккуратно.",
      verified: true 
    },
    { 
      id: 2, 
      rating: 5, 
      author: "Михаил", 
      date: "10 декабря 2024",
      comment: "Отличное качество пошива, приятный материал. Размер соответствует заявленному.",
      verified: true 
    }
  ];

  const averageRating = 4.9;
  const reviewCount = reviews.length;

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast({
        title: "Выберите размер",
        description: "Пожалуйста, выберите размер перед добавлением в корзину",
      });
      return;
    }

    try {
      // Поскольку у нас пока нет интеграции с базой данных, просто показываем уведомление
      toast({
        title: "Товар добавлен в корзину",
        description: "Перейдите в корзину для оформления заказа",
      });
      
      onClose();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось добавить товар в корзину",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-[#1A1F2C]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">{product.name}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 font-semibold text-white">{averageRating}</span>
              </div>
              <span className="text-white/60">• {reviewCount} отзывов</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <ProductGallery images={product.images} name={product.name} />
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-bold text-white">{product.price.toLocaleString()} ₽</h3>
                {product.oldPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 line-through">{product.oldPrice.toLocaleString()} ₽</span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full">
                      -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-white">Выберите размер:</h4>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-md border ${
                        selectedSize === size
                          ? "bg-blue-500 text-white border-blue-500"
                          : "border-white/20 hover:border-blue-500 text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <p className="text-white/80 mt-4">{product.description}</p>
              
              <div className="flex flex-col space-y-2 mt-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  <span>Доставка послезавтра</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  <span>Бесплатная доставка при заказе от 10 000 ₽</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5" />
                  <span>Размеры соответствуют стандартным</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full bg-white text-primary px-4 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors"
            >
              Добавить в корзину
            </button>
            
            <button
              onClick={() => {
                toast({
                  title: "Добавлено в избранное",
                  description: "Товар добавлен в список избранного",
                });
              }}
              className="w-full flex items-center justify-center gap-2 border border-white/20 px-4 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors"
            >
              <Heart className="w-5 h-5" />
              В избранное
            </button>
            
            <ProductDetails details={productDetails} />
            
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">Отзывы покупателей</h4>
                <Link to="/reviews" className="text-blue-400 hover:text-blue-300 text-sm">
                  Смотреть все отзывы
                </Link>
              </div>
              
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`w-4 h-4 ${
                                index < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">{review.author}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded">
                            Проверенная покупка
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-white/60">{review.date}</span>
                    </div>
                    <p className="text-white/80">{review.comment}</p>
                  </div>
                ))}
                
                <Link 
                  to="/reviews" 
                  className="block w-full text-center bg-secondary hover:bg-secondary/80 text-white py-2 rounded-md"
                >
                  Написать отзыв
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
