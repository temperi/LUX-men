import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Truck, Package, Clock, Shield } from "lucide-react";

const Delivery = () => {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center mb-12">Доставка</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-secondary p-8 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Truck className="w-8 h-8 text-white/80" />
                <h2 className="text-2xl font-semibold">Способы доставки</h2>
              </div>
              <ul className="space-y-4 text-white/80">
                <li>• Курьерская доставка</li>
                <li>• Доставка в пункты выдачи</li>
                <li>• Экспресс-доставка</li>
                <li>• Международная доставка</li>
              </ul>
            </div>

            <div className="bg-secondary p-8 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Clock className="w-8 h-8 text-white/80" />
                <h2 className="text-2xl font-semibold">Сроки доставки</h2>
              </div>
              <ul className="space-y-4 text-white/80">
                <li>• Москва: 1-2 дня</li>
                <li>• Санкт-Петербург: 2-3 дня</li>
                <li>• Другие города: 3-7 дней</li>
                <li>• Международная: 7-14 дней</li>
              </ul>
            </div>

            <div className="bg-secondary p-8 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Package className="w-8 h-8 text-white/80" />
                <h2 className="text-2xl font-semibold">Стоимость</h2>
              </div>
              <ul className="space-y-4 text-white/80">
                <li>• Бесплатно при заказе от 10 000 ₽</li>
                <li>• Курьером по Москве: 500 ₽</li>
                <li>• В пункты выдачи: 300 ₽</li>
                <li>• Экспресс-доставка: от 1000 ₽</li>
              </ul>
            </div>

            <div className="bg-secondary p-8 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Shield className="w-8 h-8 text-white/80" />
                <h2 className="text-2xl font-semibold">Гарантии</h2>
              </div>
              <ul className="space-y-4 text-white/80">
                <li>• Страхование отправлений</li>
                <li>• Отслеживание заказа</li>
                <li>• Бережная упаковка</li>
                <li>• Возврат при повреждении</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Delivery;