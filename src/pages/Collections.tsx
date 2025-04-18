
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";

const Collections = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  
  const collections = [
    {
      name: "Весна-Лето 2024",
      description: "Легкие и стильные образы для теплого сезона",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
      items: "10 товаров",
      type: "spring-summer",
      products: [
        {
          id: "light-jacket-1",
          name: "Легкий пиджак",
          price: 45990,
          oldPrice: 89990,
          description: "Легкий пиджак из льна и хлопка. Идеален для теплой погоды.",
          images: ["https://images.unsplash.com/photo-1593032465175-481ac7f401a0"]
        },
        {
          id: "linen-pants-1",
          name: "Льняные брюки",
          price: 18990,
          oldPrice: 37980,
          description: "Льняные брюки свободного кроя. Комфортны в жаркую погоду.",
          images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35"]
        },
        {
          id: "pima-polo-1",
          name: "Поло из хлопка пима",
          price: 12990,
          oldPrice: 25980,
          description: "Поло из премиального хлопка пима. Мягкое и приятное к телу.",
          images: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820"]
        },
        {
          id: "light-jacket-2",
          name: "Легкая куртка",
          price: 34990,
          oldPrice: 69980,
          description: "Легкая куртка на весенний сезон. Защищает от ветра и дождя.",
          images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea"]
        },
        {
          id: "bermuda-shorts-1",
          name: "Шорты бермуды",
          price: 15990,
          oldPrice: 31980,
          description: "Шорты-бермуды из хлопка. Стильное решение для жаркой погоды.",
          images: ["https://images.unsplash.com/photo-1565693413579-8ff3fdc1b03b"]
        },
        {
          id: "summer-jumper-1",
          name: "Летний джемпер",
          price: 21990,
          oldPrice: 43980,
          description: "Легкий джемпер из хлопка. Подходит для прохладных летних вечеров.",
          images: ["https://images.unsplash.com/photo-1516826957135-700dedea698c"]
        }
      ]
    },
    {
      name: "Деловой стиль",
      description: "Костюмы и аксессуары для бизнес-встреч",
      image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
      items: "10 товаров",
      type: "suits",
      products: [
        {
          id: "classic-suit-1",
          name: "Классический костюм",
          price: 89990,
          oldPrice: 179980,
          description: "Классический костюм из шерсти. Идеален для деловых встреч.",
          images: ["https://images.unsplash.com/photo-1594938374182-f8830c46f79e"]
        },
        {
          id: "business-suit-1",
          name: "Деловой костюм",
          price: 79990,
          oldPrice: 159980,
          description: "Деловой костюм строгого кроя. Подходит для официальных мероприятий.",
          images: ["https://images.unsplash.com/photo-1593030761757-71fae45fa0e7"]
        },
        {
          id: "silk-tie-1",
          name: "Шелковый галстук",
          price: 8990,
          oldPrice: 17980,
          description: "Шелковый галстук ручной работы. Дополнит деловой образ.",
          images: ["https://images.unsplash.com/photo-1589756823695-278bc923f962"]
        },
        {
          id: "cufflinks-1",
          name: "Запонки",
          price: 15990,
          oldPrice: 31980,
          description: "Запонки из серебра с перламутровыми вставками. Элегантный аксессуар.",
          images: ["https://images.unsplash.com/photo-1590548784585-643d2b9f2925"]
        },
        {
          id: "leather-belt-1",
          name: "Кожаный ремень",
          price: 12990,
          oldPrice: 25980,
          description: "Кожаный ремень ручной работы. Незаменимый аксессуар для делового стиля.",
          images: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c"]
        },
        {
          id: "oxford-shoes-1",
          name: "Оксфорды",
          price: 45990,
          oldPrice: 91980,
          description: "Классические оксфорды из итальянской кожи. Обязательный элемент делового стиля.",
          images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"]
        }
      ]
    },
    {
      name: "Вечерняя коллекция",
      description: "Элегантные образы для особых случаев",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
      items: "10 товаров",
      type: "evening",
      products: [
        {
          id: "tuxedo-1",
          name: "Смокинг",
          price: 129990,
          oldPrice: 259980,
          description: "Элегантный смокинг для особых случаев. Создан из премиальных материалов.",
          images: ["https://images.unsplash.com/photo-1598808503746-f34c53b9323e"]
        },
        {
          id: "bow-tie-1",
          name: "Бабочка",
          price: 7990,
          oldPrice: 15980,
          description: "Шелковая бабочка ручной работы. Идеальное дополнение к смокингу.",
          images: ["https://images.unsplash.com/photo-1589756823695-278bc923f962"]
        },
        {
          id: "patent-shoes-1",
          name: "Лакированные туфли",
          price: 54990,
          oldPrice: 109980,
          description: "Лакированные туфли для вечерних мероприятий. Изготовлены вручную.",
          images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"]
        },
        {
          id: "evening-shirt-1",
          name: "Вечерняя рубашка",
          price: 18990,
          oldPrice: 37980,
          description: "Вечерняя рубашка из египетского хлопка. Специально для вечерних мероприятий.",
          images: ["https://images.unsplash.com/photo-1621072156002-e2fccdc0b176"]
        },
        {
          id: "cufflinks-2",
          name: "Запонки",
          price: 15990,
          oldPrice: 31980,
          description: "Запонки из платины с бриллиантами. Роскошный аксессуар для особых случаев.",
          images: ["https://images.unsplash.com/photo-1590548784585-643d2b9f2925"]
        },
        {
          id: "vest-1",
          name: "Жилет",
          price: 34990,
          oldPrice: 69980,
          description: "Элегантный жилет для смокинга. Изготовлен из премиальных материалов.",
          images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf"]
        }
      ]
    },
    {
      name: "Casual Premium",
      description: "Премиальная повседневная одежда",
      image: "https://images.unsplash.com/photo-1516826957135-700dedea698c",
      items: "10 товаров",
      type: "shirts",
      products: [
        {
          id: "casual-shirt-1",
          name: "Повседневная рубашка",
          price: 12990,
          oldPrice: 25980,
          description: "Повседневная рубашка из хлопка. Комфортная и стильная.",
          images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c"]
        },
        {
          id: "polo-1",
          name: "Рубашка поло",
          price: 9990,
          oldPrice: 19980,
          description: "Рубашка поло из хлопка пике. Идеальна для повседневной носки.",
          images: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820"]
        },
        {
          id: "jeans-1",
          name: "Джинсы премиум",
          price: 19990,
          oldPrice: 39980,
          description: "Джинсы прямого кроя из японского денима. Высокое качество пошива.",
          images: ["https://images.unsplash.com/photo-1604975701397-6365ccbd028a"]
        },
        {
          id: "sneakers-1",
          name: "Кеды премиум",
          price: 36990,
          oldPrice: 73980,
          description: "Кеды из итальянской кожи. Комфортные и стильные.",
          images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772"]
        },
        {
          id: "sweater-1",
          name: "Свитер",
          price: 23990,
          oldPrice: 47980,
          description: "Свитер из мериносовой шерсти. Теплый и приятный к телу.",
          images: ["https://images.unsplash.com/photo-1578587018452-892bacefd3f2"]
        },
        {
          id: "tshirt-1",
          name: "Футболка",
          price: 7990,
          oldPrice: 15980,
          description: "Футболка из хлопка премиального качества. Комфортная и долговечная.",
          images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"]
        }
      ]
    },
    {
      name: "Аксессуары Luxe",
      description: "Премиальные аксессуары для завершения образа",
      image: "https://images.unsplash.com/photo-1509805225007-73e8ba4b5be8",
      items: "10 товаров",
      type: "accessories",
      products: [
        {
          id: "leather-belt-2",
          name: "Кожаный ремень",
          price: 12990,
          oldPrice: 25980,
          description: "Кожаный ремень ручной работы. Изготовлен из итальянской кожи.",
          images: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c"]
        },
        {
          id: "tie-2",
          name: "Шелковый галстук",
          price: 8990,
          oldPrice: 17980,
          description: "Шелковый галстук из итальянского шелка. Ручная работа.",
          images: ["https://images.unsplash.com/photo-1589756823695-278bc923f962"]
        },
        {
          id: "watch-1",
          name: "Часы",
          price: 89990,
          oldPrice: 179980,
          description: "Механические часы швейцарского производства. Корпус из нержавеющей стали.",
          images: ["https://images.unsplash.com/photo-1623998022290-a74f8cc36563"]
        },
        {
          id: "wallet-1",
          name: "Портмоне",
          price: 19990,
          oldPrice: 39980,
          description: "Портмоне из итальянской кожи. Вместительное и стильное.",
          images: ["https://images.unsplash.com/photo-1627123424574-724758594e93"]
        },
        {
          id: "glasses-1",
          name: "Очки",
          price: 24990,
          oldPrice: 49980,
          description: "Солнцезащитные очки в ацетатной оправе. Линзы с защитой от УФ-излучения.",
          images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f"]
        },
        {
          id: "scarf-1",
          name: "Шарф",
          price: 11990,
          oldPrice: 23980,
          description: "Шарф из кашемира. Теплый и приятный к телу.",
          images: ["https://images.unsplash.com/photo-1520903920243-00d872a2d1c9"]
        }
      ]
    },
    {
      name: "Обувь Premium",
      description: "Коллекция премиальной обуви ручной работы",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
      items: "10 товаров",
      type: "shoes",
      products: [
        {
          id: "oxford-1",
          name: "Классические оксфорды",
          price: 45990,
          oldPrice: 91980,
          description: "Классические оксфорды из итальянской кожи. Ручная работа.",
          images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772"]
        },
        {
          id: "derby-1",
          name: "Элегантные дерби",
          price: 42990,
          oldPrice: 85980,
          description: "Элегантные дерби из телячьей кожи. Классический дизайн.",
          images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"]
        },
        {
          id: "loafers-1",
          name: "Лоферы",
          price: 39990,
          oldPrice: 79980,
          description: "Лоферы из мягкой замши. Комфортные и элегантные.",
          images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"]
        },
        {
          id: "brogues-1",
          name: "Броги",
          price: 44990,
          oldPrice: 89980,
          description: "Броги из телячьей кожи. Классический дизайн с перфорацией.",
          images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"]
        },
        {
          id: "chelsea-1",
          name: "Челси",
          price: 41990,
          oldPrice: 83980,
          description: "Челси из телячьей кожи. Эластичные вставки по бокам.",
          images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"]
        },
        {
          id: "sneakers-2",
          name: "Кеды премиум",
          price: 36990,
          oldPrice: 73980,
          description: "Кеды из итальянской кожи. Комфортные и стильные.",
          images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772"]
        }
      ]
    }
  ];

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCollectionClick = (type: string) => {
    setSelectedCollection(type);
  };

  const getCollectionByType = (type: string) => {
    return collections.find(collection => collection.type === type);
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Коллекции</h1>
        
        {selectedCollection ? (
          <>
            <button 
              onClick={() => setSelectedCollection(null)}
              className="mb-8 flex items-center text-white/80 hover:text-white transition-colors"
            >
              <span className="mr-2">←</span> Назад к коллекциям
            </button>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {getCollectionByType(selectedCollection)?.name}
              </h2>
              <p className="text-white/80 mb-8">
                {getCollectionByType(selectedCollection)?.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getCollectionByType(selectedCollection)?.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <div 
                key={collection.name} 
                className="bg-secondary rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleCollectionClick(collection.type)}
              >
                <div className="relative h-[250px] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end">
                    <h3 className="p-6 text-2xl font-semibold text-white">{collection.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-white/80 mb-4">{collection.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">{collection.items}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCollectionClick(collection.type);
                      }}
                      className="bg-white text-primary px-6 py-2 rounded-md font-semibold hover:bg-white/90 transition-colors"
                    >
                      Смотреть коллекцию
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Collections;
