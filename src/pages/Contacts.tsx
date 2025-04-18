import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contacts = () => {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center mb-12">Контакты</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-secondary p-8 rounded-lg">
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

            <div className="bg-secondary p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">Напишите нам</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-accent rounded-md text-white"
                    placeholder="Введите ваше имя"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-accent rounded-md text-white"
                    placeholder="Введите ваш email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 bg-accent rounded-md text-white"
                    placeholder="Введите ваше сообщение"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors"
                >
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contacts;