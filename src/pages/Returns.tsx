import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RefreshCw, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";

const Returns = () => {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center mb-12">Возврат товара</h1>

          <div className="bg-secondary p-8 rounded-lg mb-8">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="w-8 h-8 text-white/80" />
              <h2 className="text-2xl font-semibold">Условия возврата</h2>
            </div>
            <p className="text-white/80 leading-relaxed">
              Мы принимаем возврат товара в течение 14 дней с момента получения заказа. Товар должен быть в неношеном состоянии, с сохранением всех бирок и упаковки.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-secondary p-8 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <RefreshCw className="w-8 h-8 text-white/80" />
                <h2 className="text-2xl font-semibold">Процесс возврата</h2>
              </div>
              <ol className="space-y-4 text-white/80">
                <li>1. Заполните заявку на возврат</li>
                <li>2. Упакуйте товар</li>
                <li>3. Отправьте нам посылку</li>
                <li>4. Получите возмещение</li>
              </ol>
            </div>

            <div className="bg-secondary p-8 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <AlertCircle className="w-8 h-8 text-white/80" />
                <h2 className="text-2xl font-semibold">Важно знать</h2>
              </div>
              <ul className="space-y-4 text-white/80">
                <li>• Сохраняйте чек</li>
                <li>• Не удаляйте бирки</li>
                <li>• Проверяйте товар при получении</li>
                <li>• Сохраняйте упаковку</li>
              </ul>
            </div>
          </div>

          <div className="bg-secondary p-8 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <HelpCircle className="w-8 h-8 text-white/80" />
              <h2 className="text-2xl font-semibold">Часто задаваемые вопросы</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Сколько времени занимает возврат денег?</h3>
                <p className="text-white/80">Возврат денежных средств осуществляется в течение 3-10 рабочих дней после получения нами товара.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Кто оплачивает обратную доставку?</h3>
                <p className="text-white/80">При возврате товара надлежащего качества доставку оплачивает покупатель.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Returns;