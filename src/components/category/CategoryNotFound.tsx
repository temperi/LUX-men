
import { Link } from "react-router-dom";

export const CategoryNotFound = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Категория не найдена</h1>
        <p className="mb-8 text-white/60">Запрашиваемая категория не существует или была удалена</p>
        <Link to="/" className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};
