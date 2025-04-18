
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    images: string[];
    description?: string;
  };
  onViewDetails: (product: any) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
}

export const ProductCard = ({ 
  product, 
  onViewDetails, 
  isFavorite = false,
  onToggleFavorite
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Проверяем авторизацию пользователя (в данном примере для демонстрации)
    const isLoggedIn = false; // В реальном приложении проверяем через суперабазу
    
    if (!isLoggedIn) {
      toast({
        title: "Требуется авторизация",
        description: "Пожалуйста, войдите в систему чтобы добавить товар в корзину",
      });
      navigate('/login');
      return;
    }

    // В реальном приложении добавляем товар в корзину
    toast({
      title: "Товар добавлен в корзину",
      description: "Перейдите в корзину для оформления заказа",
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  };

  return (
    <div 
      className="bg-secondary p-4 rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer group"
      onClick={() => onViewDetails(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-[250px] object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        {product.oldPrice && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </span>
        )}
        {onToggleFavorite && (
          <button
            onClick={handleToggleFavorite}
            className="absolute top-2 left-2 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite
                  ? "text-red-500 fill-red-500"
                  : "text-white"
              }`}
            />
          </button>
        )}
        
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
          <Button 
            variant="default" 
            size="sm"
            className="bg-white text-primary hover:bg-white/90"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
          >
            Посмотреть детали
          </Button>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
      <div className="flex justify-between items-center">
        <div>
          <span className="font-bold">{product.price.toLocaleString()} ₽</span>
          {product.oldPrice && (
            <span className="ml-2 text-white/60 line-through text-sm">{product.oldPrice.toLocaleString()} ₽</span>
          )}
        </div>
        <Button 
          onClick={handleAddToCart}
          size="sm"
          className="bg-white text-primary hover:bg-white/90"
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          В корзину
        </Button>
      </div>
    </div>
  );
};
