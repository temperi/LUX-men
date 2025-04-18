export const Promotions = () => {
  const promotions = [
    {
      id: 1,
      title: "Весенняя распродажа",
      description: "Скидки до 50% на весеннюю коллекцию",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
      discount: "50%"
    },
    {
      id: 2,
      title: "Акция на костюмы",
      description: "При покупке пиджака - брюки в подарок",
      image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
      discount: "Подарок"
    },
    {
      id: 3,
      title: "Специальное предложение",
      description: "Бесплатная доставка при заказе от 10 000 ₽",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
      discount: "0 ₽"
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Акции и специальные предложения</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((promo) => (
            <div key={promo.id} className="bg-primary rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                  {promo.discount}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{promo.title}</h3>
                <p className="text-white/80">{promo.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};