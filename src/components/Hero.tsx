import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary">
        <img
          src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2"
          alt="Hero"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative container mx-auto h-full flex items-center">
        <div className="max-w-2xl animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Откройте новый стиль</h1>
          <p className="text-xl mb-8 text-white/80">
            Премиальная мужская одежда для тех, кто ценит качество и элегантность
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/new-arrivals')} 
              className="bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors"
            >
              Новинки
            </button>
            <button 
              onClick={() => navigate('/collections')} 
              className="border border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors"
            >
              Коллекции
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};