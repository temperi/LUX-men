
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Star, Heart, ThumbsUp, ThumbsDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

// Демонстрационные данные для примера
const DEMO_PRODUCTS = [
  { id: "1", name: "Классический костюм" },
  { id: "2", name: "Деловой костюм" },
  { id: "3", name: "Вечерний костюм" },
  { id: "4", name: "Смокинг" },
  { id: "11", name: "Классическая рубашка" },
  { id: "12", name: "Повседневная рубашка" },
  { id: "21", name: "Классические оксфорды" },
  { id: "31", name: "Кожаный ремень" }
];

const DEMO_REVIEWS = [
  {
    id: "r1",
    created_at: "2024-12-11",
    user_id: "u1",
    product_id: "1",
    rating: 5,
    comment: "Шикарный костюм! Начиная с фирменной упаковки с логотипом, продолжая самим комплектом и заканчивая приятным презентом! Сам комплект очень качественный, сшит максимально аккуратно.",
    likes: 12,
    dislikes: 1,
    user_name: "Zen",
    product_name: "Классический костюм"
  },
  {
    id: "r2",
    created_at: "2024-12-10",
    user_id: "u2",
    product_id: "1",
    rating: 5,
    comment: "Отличное качество пошива, приятный материал. Размер соответствует заявленному.",
    likes: 8,
    dislikes: 0,
    user_name: "Михаил",
    product_name: "Классический костюм"
  },
  {
    id: "r3",
    created_at: "2024-12-05",
    user_id: "u3",
    product_id: "11",
    rating: 4,
    comment: "Рубашка хорошего качества, материал приятный к телу. Немного не подошел размер, взял на размер больше.",
    likes: 5,
    dislikes: 1,
    user_name: "Александр",
    product_name: "Классическая рубашка"
  },
  {
    id: "r4",
    created_at: "2024-12-03",
    user_id: "u4",
    product_id: "21",
    rating: 5,
    comment: "Превосходные туфли! Кожа высшего качества, удобная колодка. Отлично смотрятся с деловым костюмом.",
    likes: 15,
    dislikes: 0,
    user_name: "Дмитрий",
    product_name: "Классические оксфорды"
  },
  {
    id: "r5",
    created_at: "2024-11-28",
    user_id: "u5",
    product_id: "4",
    rating: 5,
    comment: "Смокинг превзошел все ожидания! Идеальная посадка, качественные материалы. На мероприятии получил много комплиментов.",
    likes: 20,
    dislikes: 0,
    user_name: "Игорь",
    product_name: "Смокинг"
  }
];

interface Review {
  id: string;
  created_at: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
  user_name?: string;
  product_name?: string;
}

const Reviews = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>(DEMO_REVIEWS);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Для демонстрации
  const [newReview, setNewReview] = useState({
    product_id: "",
    rating: 5,
    comment: ""
  });
  const [userLikes, setUserLikes] = useState<Record<string, 'like' | 'dislike' | null>>({});
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast({
        title: "Требуется авторизация",
        description: "Пожалуйста, войдите в систему чтобы оставить отзыв",
      });
      return;
    }
    
    if (!newReview.product_id) {
      toast({
        title: "Выберите товар",
        description: "Пожалуйста, выберите товар для отзыва",
      });
      return;
    }
    
    if (!newReview.comment.trim()) {
      toast({
        title: "Введите комментарий",
        description: "Пожалуйста, напишите текст отзыва",
      });
      return;
    }
    
    // Создаем новый отзыв (в демо-режиме)
    const product = DEMO_PRODUCTS.find(p => p.id === newReview.product_id);
    
    const newReviewItem: Review = {
      id: `r${reviews.length + 1}`,
      created_at: new Date().toISOString().split('T')[0],
      user_id: "current-user",
      product_id: newReview.product_id,
      rating: newReview.rating,
      comment: newReview.comment,
      likes: 0,
      dislikes: 0,
      user_name: "Вы",
      product_name: product?.name || "Неизвестный товар"
    };
    
    setReviews([newReviewItem, ...reviews]);
    setNewReview({
      product_id: "",
      rating: 5,
      comment: ""
    });
    
    toast({
      title: "Отзыв добавлен",
      description: "Ваш отзыв успешно опубликован",
    });
  };
  
  const handleReaction = (reviewId: string, reaction: 'like' | 'dislike') => {
    if (!isLoggedIn) {
      toast({
        title: "Требуется авторизация",
        description: "Пожалуйста, войдите в систему чтобы оценить отзыв",
      });
      return;
    }
    
    const currentReaction = userLikes[reviewId];
    
    // Если уже есть такая же реакция, удаляем ее
    if (currentReaction === reaction) {
      const updatedLikes = {...userLikes};
      delete updatedLikes[reviewId];
      setUserLikes(updatedLikes);
      
      setReviews(reviews.map(review => 
        review.id === reviewId 
          ? {...review, [reaction === 'like' ? 'likes' : 'dislikes']: review[reaction === 'like' ? 'likes' : 'dislikes'] - 1}
          : review
      ));
    } 
    // Если реакция другая или отсутствует
    else {
      // Если была противоположная реакция, уменьшаем соответствующий счетчик
      if (currentReaction) {
        setReviews(reviews.map(review => 
          review.id === reviewId 
            ? {...review, [currentReaction === 'like' ? 'likes' : 'dislikes']: review[currentReaction === 'like' ? 'likes' : 'dislikes'] - 1}
            : review
        ));
      }
      
      // Обновляем счетчики
      setUserLikes({...userLikes, [reviewId]: reaction});
      setReviews(reviews.map(review => 
        review.id === reviewId 
          ? {...review, [reaction === 'like' ? 'likes' : 'dislikes']: review[reaction === 'like' ? 'likes' : 'dislikes'] + 1}
          : review
      ));
    }
  };
  
  const toggleFavorite = (reviewId: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Требуется авторизация",
        description: "Пожалуйста, войдите в систему чтобы добавить отзыв в избранное",
      });
      return;
    }
    
    if (favorites.includes(reviewId)) {
      setFavorites(favorites.filter(id => id !== reviewId));
      
      toast({
        title: "Удалено из избранного",
        description: "Отзыв удален из избранного",
      });
    } else {
      setFavorites([...favorites, reviewId]);
      
      toast({
        title: "Добавлено в избранное",
        description: "Отзыв добавлен в избранное",
      });
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Отзывы клиентов</h1>

        <div className="flex justify-end mb-6">
          <Button 
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            variant={isLoggedIn ? "destructive" : "default"}
          >
            {isLoggedIn ? "Выйти" : "Войти"}
          </Button>
        </div>

        {isLoggedIn && (
          <div className="bg-secondary p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Написать отзыв</h2>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block mb-2">Выберите товар</label>
                <select 
                  className="w-full p-2 rounded bg-primary border border-white/20"
                  value={newReview.product_id}
                  onChange={(e) => setNewReview({...newReview, product_id: e.target.value})}
                >
                  <option value="">Выберите товар</option>
                  {DEMO_PRODUCTS.map((product) => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block mb-2">Оценка</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      className={`w-6 h-6 cursor-pointer ${
                        rating <= newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                      }`}
                      onClick={() => setNewReview({...newReview, rating})}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block mb-2">Комментарий</label>
                <Textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Напишите ваш отзыв..."
                  className="min-h-[100px]"
                />
              </div>
              
              <Button type="submit">Опубликовать отзыв</Button>
            </form>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg">Загрузка отзывов...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-secondary rounded-lg">
            <p className="text-xl">Пока нет отзывов</p>
            <p className="mt-2 text-white/60">Будьте первым, кто оставит отзыв о наших товарах</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-secondary p-6 rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-accent rounded-full p-2">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{review.user_name}</span>
                  </div>
                  <span className="text-sm text-white/60">
                    {new Date(review.created_at).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                
                <div className="mb-1">
                  <span className="text-sm font-medium text-white/60">Товар: {review.product_name}</span>
                </div>
                
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                
                <p className="mb-4">{review.comment}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <button 
                      className={`flex items-center gap-1 ${userLikes[review.id] === 'like' ? 'text-green-500' : 'text-white/60'}`}
                      onClick={() => handleReaction(review.id, 'like')}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.likes || 0}</span>
                    </button>
                    
                    <button 
                      className={`flex items-center gap-1 ${userLikes[review.id] === 'dislike' ? 'text-red-500' : 'text-white/60'}`}
                      onClick={() => handleReaction(review.id, 'dislike')}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>{review.dislikes || 0}</span>
                    </button>
                  </div>
                  
                  <button 
                    className={`flex items-center gap-1 ${favorites.includes(review.id) ? 'text-red-500' : 'text-white/60'}`}
                    onClick={() => toggleFavorite(review.id)}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(review.id) ? 'fill-red-500' : ''}`} />
                    <span>{favorites.includes(review.id) ? 'В избранном' : 'В избранное'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Reviews;
