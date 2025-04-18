import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Promotions = () => {
  const [selectedPromo, setSelectedPromo] = useState<(typeof promotions)[0] | null>(null);

  const promotions = [
    {
      id: 1,
      title: "Весенняя распродажа",
      description: "Скидки до 50% на весеннюю коллекцию",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
      discount: "50%",
      endDate: "2024-03-31",
      products: [
        {
          id: 1,
          name: "Легкое весеннее пальто",
          price: 12990,
          oldPrice: 25980,
          image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea"
        },
        {
          id: 2,
          name: "Платье с цветочным принтом",
          price: 7990,
          oldPrice: 15980,
          image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1"
        },
        {
          id: 3,
          name: "Джинсовая куртка",
          price: 5990,
          oldPrice: 11980,
          image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a"
        }
      ]
    },
    {
      id: 2,
      title: "Акция на костюмы",
      description: "При покупке пиджака - брюки в подарок",
      image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
      discount: "Подарок",
      endDate: "2024-03-15",
      products: [
        {
          id: 4,
          name: "Классический костюм",
          price: 29990,
          oldPrice: 45980,
          image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35"
        },
        {
          id: 5,
          name: "Деловой костюм",
          price: 34990,
          oldPrice: 49980,
          image: "https://images.unsplash.com/photo-1594938374182-f8830c46f3b8"
        },
        {
          id: 6,
          name: "Вечерний костюм",
          price: 39990,
          oldPrice: 59980,
          image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0"
        }
      ]
    },
    {
      id: 3,
      title: "Специальное предложение",
      description: "Бесплатная доставка при заказе от 10 000 ₽",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
      discount: "0 ₽",
      endDate: "2024-03-20",
      products: [
        {
          id: 7,
          name: "Кожаная сумка",
          price: 15990,
          oldPrice: 19990,
          image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c"
        },
        {
          id: 8,
          name: "Кроссовки",
          price: 12990,
          oldPrice: 16990,
          image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a"
        },
        {
          id: 9,
          name: "Шелковый шарф",
          price: 4990,
          oldPrice: 7990,
          image: "https://images.unsplash.com/photo-1601924921557-45e6dea0a157"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12">Акции и специальные предложения</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((promo) => (
            <div 
              key={promo.id} 
              className="bg-secondary rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => setSelectedPromo(promo)}
            >
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
                <p className="text-white/80 mb-4">{promo.description}</p>
                <p className="text-sm text-white/60">Действует до: {promo.endDate}</p>
                <Button className="mt-4 w-full">Подробнее</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedPromo} onOpenChange={() => setSelectedPromo(null)}>
        <DialogContent className="max-w-3xl">
          {selectedPromo && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPromo.title}</DialogTitle>
                <DialogDescription>{selectedPromo.description}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedPromo.products.map((product) => (
                    <div key={product.id} className="bg-secondary rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold mb-2">{product.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">{product.price} ₽</span>
                          <span className="text-sm text-white/60 line-through">{product.oldPrice} ₽</span>
                        </div>
                        <Button className="mt-2 w-full">В корзину</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-white/60">
                  Акция действует до: {selectedPromo.endDate}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Promotions;