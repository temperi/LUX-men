
import { useState } from "react";
import { ProductModal } from "./ProductModal";

export const Categories = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    {
      id: "kostum",
      name: "Костюмы",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=500",
      featured: {
        id: "premium-suit-1",
        name: "Премиум костюм",
        price: 89990,
        oldPrice: 179980,
        description: "Элегантный костюм премиум-класса, идеально подходит для особых случаев и деловых встреч. Изготовлен из высококачественной шерсти.",
        images: [
          "https://images.unsplash.com/photo-1617137968427-85924c800a22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=500",
          "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=500",
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=500"
        ]
      }
    },
    {
      id: "rubashki",
      name: "Рубашки",
      image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=500",
      featured: {
        id: "premium-shirt-1",
        name: "Классическая рубашка",
        price: 15990,
        oldPrice: 31980,
        description: "Классическая рубашка из египетского хлопка с французскими манжетами. Идеально подходит для официальных мероприятий.",
        images: [
          "https://images.unsplash.com/photo-1589310243389-96a5483213a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=500",
          "https://images.unsplash.com/photo-1604695573706-53170668f6a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=500",
          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=500"
        ]
      }
    },
    {
      id: "obuv",
      name: "Обувь",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=500",
      featured: {
        id: "premium-shoes-1",
        name: "Классические оксфорды",
        price: 45990,
        oldPrice: 91980,
        description: "Классические оксфорды ручной работы из итальянской кожи. Идеально подходят для официальных мероприятий.",
        images: [
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=500",
          "https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=500"
        ]
      }
    },
    {
      id: "aksessuary",
      name: "Аксессуары",
      image: "https://images.unsplash.com/photo-1624526267942-ab0c0e53d0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=500",
      featured: {
        id: "premium-accessory-1",
        name: "Кожаный ремень",
        price: 12990,
        oldPrice: 25980,
        description: "Кожаный ремень ручной работы с пряжкой из нержавеющей стали. Идеально дополняет деловой костюм.",
        images: [
          "https://images.unsplash.com/photo-1624526267942-ab0c0e53d0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=500",
          "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=500"
        ]
      }
    }
  ];

  const handleCategoryClick = (category: any) => {
    setSelectedProduct(category.featured);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card cursor-pointer h-[180px] md:h-[250px] relative group"
              onClick={() => handleCategoryClick(category)}
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 rounded-lg flex items-end">
                <h3 className="p-4 text-lg md:text-xl font-semibold text-white">{category.name}</h3>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-lg">
                <span className="bg-white text-primary px-4 py-2 rounded-md font-medium">Смотреть товары</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />
      )}
    </section>
  );
};
