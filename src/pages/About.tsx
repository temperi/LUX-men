
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Truck, RotateCcw, CreditCard, Shield } from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const About = () => {
  const [openDelivery, setOpenDelivery] = useState(false);
  const [openReturns, setOpenReturns] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center mb-8">О нас</h1>
          
          <div className="bg-secondary p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">История бренда</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              LUXMEN - это премиальный бренд мужской одежды, основанный в 2010 году. Мы специализируемся на создании элегантной и качественной одежды для мужчин, которые ценят стиль и комфорт.
            </p>
            <p className="text-white/80 leading-relaxed">
              Наша миссия - помогать мужчинам выглядеть безупречно в любой ситуации, предлагая одежду высочайшего качества и современного дизайна.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-secondary p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Наши ценности</h2>
              <ul className="space-y-4 text-white/80">
                <li>• Качество материалов и пошива</li>
                <li>• Внимание к деталям</li>
                <li>• Современный дизайн</li>
                <li>• Индивидуальный подход</li>
              </ul>
            </div>
            <div className="bg-secondary p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Преимущества</h2>
              <ul className="space-y-4 text-white/80">
                <li>• Премиальные материалы</li>
                <li>• Эксклюзивные коллекции</li>
                <li>• Профессиональные консультации</li>
                <li>• Гарантия качества</li>
              </ul>
            </div>
          </div>
          
          {/* Contact information section */}
          <div className="bg-secondary p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-semibold mb-6">Контактная информация</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-white/80" />
                <div>
                  <h3 className="font-semibold mb-1">Телефон</h3>
                  <p className="text-white/80">+7 (800) 555-35-35</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-white/80" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-white/80">info@luxmen.ru</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-white/80" />
                <div>
                  <h3 className="font-semibold mb-1">Адрес</h3>
                  <p className="text-white/80">г. Москва, ул. Тверская, д. 1</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-white/80" />
                <div>
                  <h3 className="font-semibold mb-1">Режим работы</h3>
                  <p className="text-white/80">Пн-Вс: 10:00 - 22:00</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Delivery and returns information using Collapsible */}
          <div className="space-y-4">
            <Collapsible 
              open={openDelivery} 
              onOpenChange={setOpenDelivery}
              className="bg-secondary rounded-lg shadow-lg overflow-hidden"
            >
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full p-6 flex items-center justify-between" 
                >
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5" />
                    <span className="text-xl font-semibold">Доставка</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openDelivery ? "transform rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6">
                <p className="text-white/80 leading-relaxed">
                  Мы осуществляем доставку по всей России. Стандартная доставка занимает 1-3 рабочих дня в Москве и Санкт-Петербурге, 3-7 рабочих дней в других регионах. Доставка бесплатна при заказе от 5000 ₽.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible 
              open={openReturns} 
              onOpenChange={setOpenReturns}
              className="bg-secondary rounded-lg shadow-lg overflow-hidden"
            >
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full p-6 flex items-center justify-between" 
                >
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5" />
                    <span className="text-xl font-semibold">Возврат</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openReturns ? "transform rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6">
                <p className="text-white/80 leading-relaxed">
                  Вы можете вернуть товар в течение 14 дней с момента получения. Товар должен быть в неношеном состоянии, с бирками и в оригинальной упаковке. Для возврата свяжитесь с нашей службой поддержки.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible 
              open={openPayment} 
              onOpenChange={setOpenPayment}
              className="bg-secondary rounded-lg shadow-lg overflow-hidden"
            >
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full p-6 flex items-center justify-between" 
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <span className="text-xl font-semibold">Оплата</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openPayment ? "transform rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6">
                <p className="text-white/80 leading-relaxed mb-4">
                  Мы принимаем различные способы оплаты для вашего удобства:
                </p>
                <ul className="space-y-2 text-white/80">
                  <li>• Банковские карты (Visa, MasterCard, МИР)</li>
                  <li>• Электронные кошельки</li>
                  <li>• Оплата при получении (наложенный платеж)</li>
                </ul>
                <div className="flex items-center gap-2 mt-4 text-white/80">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Все платежи защищены современными технологиями шифрования</span>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
