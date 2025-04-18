import { Star } from "lucide-react";

interface Review {
  id: number;
  rating: number;
  author: string;
  date: string;
  comment: string;
  verified: boolean;
}

interface ProductReviewsProps {
  reviews: Review[];
}

export const ProductReviews = ({ reviews }: ProductReviewsProps) => {
  return (
    <div className="border-t border-white/10 pt-4">
      <h4 className="font-semibold mb-4">Отзывы покупателей</h4>
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
      </div>
    </div>
  );
};