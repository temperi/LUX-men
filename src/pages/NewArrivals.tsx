import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ProductModal } from "@/components/ProductModal";

const NewArrivals = () => {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const newProducts = [
    {
      id: "e9a24d1b-8f4c-4f3a-a7d8-49875a42b3c4",
      name: "Премиум костюм",
      price: 89990,
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
        "https://images.unsplash.com/photo-1594938328870-9623159c8c99"
      ],
      description: "Элегантный костюм премиум-класса из высококачественной шерсти."
    },
    {
      id: "b2c5d8e9-f123-4a56-b789-0c1d2e3f4a5b",
      name: "Классическая рубашка",
      price: 15990,
      images: [
        "https://images.unsplash.com/photo-1604695573706-53170668f6a6",
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
        "https://images.unsplash.com/photo-1594938328870-9623159c8c99"
      ],
      description: "Классическая рубашка из премиального хлопка."
    },
    {
      id: "f7e1ae24-8951-4cea-a812-6e789c46d0e4",
      name: "Кожаные оксфорды",
      price: 45990,
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
        "https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"
      ],
      description: "Элегантные кожаные оксфорды для особых случаев."
    },
    {
      id: "c68c8b5c-7fb8-4e8a-9df1-0e6f61d98c46",
      name: "Шелковый галстук",
      price: 8990,
      images: [
        "https://images.unsplash.com/photo-1589756823695-278bc923f962",
        "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
        "https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"
      ],
      description: "Шелковый галстук для завершения образа."
    },
    {
      id: "d2f7d475-5910-4c45-8b96-2e0e2c0d29d3",
      name: "Кашемировый свитер",
      price: 29990,
      images: [
        "https://images.unsplash.com/photo-1586765677067-f8030bd8e303",
        "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
        "https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"
      ],
      description: "Мягкий кашемировый свитер для холодных дней."
    },
    {
      id: "c68c8b5c-7fb8-4e8a-9df1-0e6f61d98c46",
      name: "Кожаный портфель",
      price: 49990,
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
        "https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"
      ],
      description: "Элегантный кожаный портфель для деловых встреч."
    }
  ];

  const handleAddToCart = (productId: string) => {
    toast({
      title: "Товар добавлен в корзину",
      description: "Перейдите в корзину для оформления заказа",
    });
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12">Новые поступления</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-secondary rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-[300px] object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-2xl font-bold mb-4">{product.price.toLocaleString()} ₽</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product.id);
                  }}
                  className="w-full bg-white text-primary px-4 py-2 rounded-md font-semibold hover:bg-white/90 transition-colors"
                >
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedProduct && (
        <ProductModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default NewArrivals;
