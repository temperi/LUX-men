
export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  images: string[];
  description?: string;
}

export interface CategoryInfo {
  title: string;
  description: string;
  products: Product[];
}

export type CategoryDataType = {
  [key: string]: CategoryInfo;
};

export const categoryData: CategoryDataType = {
  kostum: {
    title: "Костюмы",
    description: "Элегантные мужские костюмы премиального качества",
    products: [
      {
        id: "1",
        name: "Классический костюм",
        price: 89990,
        oldPrice: 179980,
        images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35"],
        description: "Классический костюм из шерсти. Идеален для деловых встреч."
      },
      {
        id: "2",
        name: "Деловой костюм",
        price: 79990,
        oldPrice: 159980,
        images: ["https://images.unsplash.com/photo-1593030761757-71fae45fa0e7"],
        description: "Деловой костюм строгого кроя. Подходит для официальных мероприятий."
      },
      {
        id: "3",
        name: "Вечерний костюм",
        price: 99990,
        oldPrice: 199980,
        images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf"],
        description: "Вечерний костюм из премиальных материалов. Создан для особых случаев."
      },
      {
        id: "4",
        name: "Смокинг",
        price: 129990,
        oldPrice: 259980,
        images: ["https://images.unsplash.com/photo-1598808503746-f34c53b9323e"],
        description: "Элегантный смокинг для особых случаев. Создан из премиальных материалов."
      },
      {
        id: "5",
        name: "Костюм-тройка",
        price: 109990,
        oldPrice: 219980,
        images: ["https://images.unsplash.com/photo-1617127365659-c47fa864d8bc"],
        description: "Классический костюм-тройка с жилетом. Идеален для деловых встреч."
      },
      {
        id: "6",
        name: "Летний костюм",
        price: 69990,
        oldPrice: 139980,
        images: ["https://images.unsplash.com/photo-1593032465175-481ac7f401a0"],
        description: "Легкий летний костюм из хлопка и льна. Комфортен в жаркую погоду."
      }
    ]
  },
  rubashki: {
    title: "Рубашки",
    description: "Стильные мужские рубашки из премиальных материалов",
    products: [
      {
        id: "11",
        name: "Классическая рубашка",
        price: 15990,
        oldPrice: 31980,
        images: ["https://images.unsplash.com/photo-1604695573706-53170668f6a6"],
        description: "Классическая рубашка из египетского хлопка с французскими манжетами. Идеально подходит для официальных мероприятий."
      },
      {
        id: "12",
        name: "Повседневная рубашка",
        price: 12990,
        oldPrice: 25980,
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c"],
        description: "Повседневная рубашка из хлопка. Комфортная и стильная."
      },
      {
        id: "13",
        name: "Вечерняя рубашка",
        price: 18990,
        oldPrice: 37980,
        images: ["https://images.unsplash.com/photo-1621072156002-e2fccdc0b176"],
        description: "Вечерняя рубашка из египетского хлопка. Специально для вечерних мероприятий."
      },
      {
        id: "14",
        name: "Рубашка Oxford",
        price: 14990,
        oldPrice: 29980,
        images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10"],
        description: "Рубашка Oxford из хлопка. Универсальна и комфортна."
      },
      {
        id: "15",
        name: "Льняная рубашка",
        price: 13990,
        oldPrice: 27980,
        images: ["https://images.unsplash.com/photo-1603252109303-2751441dd157"],
        description: "Льняная рубашка для жаркой погоды. Натуральный материал обеспечивает комфорт."
      },
      {
        id: "16",
        name: "Рубашка в клетку",
        price: 11990,
        oldPrice: 23980,
        images: ["https://images.unsplash.com/photo-1608234808654-2a8875faa7fd"],
        description: "Рубашка в клетку из хлопка. Стильный повседневный вариант."
      }
    ]
  },
  obuv: {
    title: "Обувь",
    description: "Премиальная мужская обувь ручной работы",
    products: [
      {
        id: "21",
        name: "Классические оксфорды",
        price: 45990,
        oldPrice: 91980,
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772"],
        description: "Классические оксфорды из итальянской кожи. Ручная работа."
      },
      {
        id: "22",
        name: "Элегантные дерби",
        price: 42990,
        oldPrice: 85980,
        images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"],
        description: "Элегантные дерби из телячьей кожи. Классический дизайн."
      },
      {
        id: "23",
        name: "Лоферы",
        price: 39990,
        oldPrice: 79980,
        images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"],
        description: "Лоферы из мягкой замши. Комфортные и элегантные."
      },
      {
        id: "24",
        name: "Броги",
        price: 44990,
        oldPrice: 89980,
        images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"],
        description: "Броги из телячьей кожи. Классический дизайн с перфорацией."
      },
      {
        id: "25",
        name: "Монки",
        price: 46990,
        oldPrice: 93980,
        images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"],
        description: "Монки из телячьей кожи. Элегантная модель с пряжкой."
      },
      {
        id: "26",
        name: "Челси",
        price: 41990,
        oldPrice: 83980,
        images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"],
        description: "Челси из телячьей кожи. Эластичные вставки по бокам."
      }
    ]
  },
  aksessuary: {
    title: "Аксессуары",
    description: "Стильные аксессуары для завершения образа",
    products: [
      {
        id: "31",
        name: "Кожаный ремень",
        price: 12990,
        oldPrice: 25980,
        images: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c"],
        description: "Кожаный ремень ручной работы. Изготовлен из итальянской кожи."
      },
      {
        id: "32",
        name: "Шелковый галстук",
        price: 8990,
        oldPrice: 17980,
        images: ["https://images.unsplash.com/photo-1589756823695-278bc923f962"],
        description: "Шелковый галстук из итальянского шелка. Ручная работа."
      },
      {
        id: "33",
        name: "Запонки",
        price: 15990,
        oldPrice: 31980,
        images: ["https://images.unsplash.com/photo-1590548784585-643d2b9f2925"],
        description: "Запонки из серебра с перламутровыми вставками. Элегантный аксессуар."
      },
      {
        id: "34",
        name: "Портмоне",
        price: 19990,
        oldPrice: 39980,
        images: ["https://images.unsplash.com/photo-1627123424574-724758594e93"],
        description: "Портмоне из итальянской кожи. Вместительное и стильное."
      },
      {
        id: "35",
        name: "Часы",
        price: 89990,
        oldPrice: 179980,
        images: ["https://images.unsplash.com/photo-1623998022290-a74f8cc36563"],
        description: "Механические часы швейцарского производства. Корпус из нержавеющей стали."
      },
      {
        id: "36",
        name: "Зонт",
        price: 14990,
        oldPrice: 29980,
        images: ["https://images.unsplash.com/photo-1590845947376-2638caa89309"],
        description: "Складной зонт с деревянной ручкой. Надежная защита от дождя."
      }
    ]
  },
  "spring-summer": {
    title: "Весна-Лето 2024",
    description: "Легкие и стильные образы для теплого сезона",
    products: [
      {
        id: "41",
        name: "Легкий пиджак",
        price: 45990,
        oldPrice: 91980,
        images: ["https://images.unsplash.com/photo-1593032465175-481ac7f401a0"],
        description: "Легкий пиджак из льна и хлопка. Идеален для теплой погоды."
      },
      {
        id: "42",
        name: "Льняные брюки",
        price: 18990,
        oldPrice: 37980,
        images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35"],
        description: "Льняные брюки свободного кроя. Комфортны в жаркую погоду."
      },
      {
        id: "43",
        name: "Поло из хлопка пима",
        price: 12990,
        oldPrice: 25980,
        images: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820"],
        description: "Поло из премиального хлопка пима. Мягкое и приятное к телу."
      },
      {
        id: "44",
        name: "Легкая куртка",
        price: 34990,
        oldPrice: 69980,
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea"],
        description: "Легкая куртка на весенний сезон. Защищает от ветра и дождя."
      },
      {
        id: "45",
        name: "Шорты бермуды",
        price: 15990,
        oldPrice: 31980,
        images: ["https://images.unsplash.com/photo-1565693413579-8ff3fdc1b03b"],
        description: "Шорты-бермуды из хлопка. Стильное решение для жаркой погоды."
      },
      {
        id: "46",
        name: "Летний джемпер",
        price: 21990,
        oldPrice: 43980,
        images: ["https://images.unsplash.com/photo-1516826957135-700dedea698c"],
        description: "Легкий джемпер из хлопка. Подходит для прохладных летних вечеров."
      }
    ]
  },
  suits: {
    title: "Деловой стиль",
    description: "Костюмы и аксессуары для бизнес-встреч",
    products: [
      {
        id: "51",
        name: "Классический костюм",
        price: 89990,
        oldPrice: 179980,
        images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35"],
        description: "Классический костюм из шерсти. Идеален для деловых встреч."
      },
      {
        id: "52",
        name: "Деловой костюм",
        price: 79990,
        oldPrice: 159980,
        images: ["https://images.unsplash.com/photo-1593030761757-71fae45fa0e7"],
        description: "Деловой костюм строгого кроя. Подходит для официальных мероприятий."
      },
      {
        id: "53",
        name: "Шелковый галстук",
        price: 8990,
        oldPrice: 17980,
        images: ["https://images.unsplash.com/photo-1589756823695-278bc923f962"],
        description: "Шелковый галстук из итальянского шелка. Ручная работа."
      },
      {
        id: "54",
        name: "Запонки",
        price: 15990,
        oldPrice: 31980,
        images: ["https://images.unsplash.com/photo-1590548784585-643d2b9f2925"],
        description: "Запонки из серебра с перламутровыми вставками. Элегантный аксессуар."
      },
      {
        id: "55",
        name: "Кожаный ремень",
        price: 12990,
        oldPrice: 25980,
        images: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c"],
        description: "Кожаный ремень ручной работы. Изготовлен из итальянской кожи."
      },
      {
        id: "56",
        name: "Оксфорды",
        price: 45990,
        oldPrice: 91980,
        images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"],
        description: "Классические оксфорды из итальянской кожи. Ручная работа."
      }
    ]
  },
  evening: {
    title: "Вечерняя коллекция",
    description: "Элегантные образы для особых случаев",
    products: [
      {
        id: "61",
        name: "Смокинг",
        price: 129990,
        oldPrice: 259980,
        images: ["https://images.unsplash.com/photo-1598808503746-f34c53b9323e"],
        description: "Элегантный смокинг для особых случаев. Создан из премиальных материалов."
      },
      {
        id: "62",
        name: "Бабочка",
        price: 7990,
        oldPrice: 15980,
        images: ["https://images.unsplash.com/photo-1589756823695-278bc923f962"],
        description: "Шелковая бабочка ручной работы. Идеальное дополнение к смокингу."
      },
      {
        id: "63",
        name: "Лакированные туфли",
        price: 54990,
        oldPrice: 109980,
        images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"],
        description: "Лакированные туфли для вечерних мероприятий. Изготовлены вручную."
      },
      {
        id: "64",
        name: "Запонки",
        price: 15990,
        oldPrice: 31980,
        images: ["https://images.unsplash.com/photo-1590548784585-643d2b9f2925"],
        description: "Запонки из платины с бриллиантами. Роскошный аксессуар для особых случаев."
      },
      {
        id: "65",
        name: "Жилет",
        price: 34990,
        oldPrice: 69980,
        images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf"],
        description: "Элегантный жилет для смокинга. Изготовлен из премиальных материалов."
      },
      {
        id: "66",
        name: "Вечерняя рубашка",
        price: 18990,
        oldPrice: 37980,
        images: ["https://images.unsplash.com/photo-1621072156002-e2fccdc0b176"],
        description: "Вечерняя рубашка из египетского хлопка. Специально для вечерних мероприятий."
      }
    ]
  },
  shirts: {
    title: "Рубашки Premium",
    description: "Коллекция премиальных рубашек из лучших материалов",
    products: [
      {
        id: "71",
        name: "Классическая рубашка",
        price: 15990,
        oldPrice: 31980,
        images: ["https://images.unsplash.com/photo-1604695573706-53170668f6a6"],
        description: "Классическая рубашка из египетского хлопка с французскими манжетами. Идеально подходит для официальных мероприятий."
      },
      {
        id: "72",
        name: "Повседневная рубашка",
        price: 12990,
        oldPrice: 25980,
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c"],
        description: "Повседневная рубашка из хлопка. Комфортная и стильная."
      },
      {
        id: "73",
        name: "Вечерняя рубашка",
        price: 18990,
        oldPrice: 37980,
        images: ["https://images.unsplash.com/photo-1621072156002-e2fccdc0b176"],
        description: "Вечерняя рубашка из египетского хлопка. Специально для вечерних мероприятий."
      },
      {
        id: "74",
        name: "Рубашка Oxford",
        price: 14990,
        oldPrice: 29980,
        images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10"],
        description: "Рубашка Oxford из хлопка. Универсальна и комфортна."
      },
      {
        id: "75",
        name: "Льняная рубашка",
        price: 13990,
        oldPrice: 27980,
        images: ["https://images.unsplash.com/photo-1603252109303-2751441dd157"],
        description: "Льняная рубашка для жаркой погоды. Натуральный материал обеспечивает комфорт."
      },
      {
        id: "76",
        name: "Рубашка поло",
        price: 9990,
        oldPrice: 19980,
        images: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820"],
        description: "Рубашка поло из хлопка пике. Идеальна для повседневной носки."
      }
    ]
  },
  accessories: {
    title: "Аксессуары Luxe",
    description: "Премиальные аксессуары для завершения образа",
    products: [
      {
        id: "81",
        name: "Кожаный ремень",
        price: 12990,
        oldPrice: 25980,
        images: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c"],
        description: "Кожаный ремень ручной работы. Изготовлен из итальянской кожи."
      },
      {
        id: "82",
        name: "Шелковый галстук",
        price: 8990,
        oldPrice: 17980,
        images: ["https://images.unsplash.com/photo-1589756823695-278bc923f962"],
        description: "Шелковый галстук из итальянского шелка. Ручная работа."
      },
      {
        id: "83",
        name: "Запонки",
        price: 15990,
        oldPrice: 31980,
        images: ["https://images.unsplash.com/photo-1590548784585-643d2b9f2925"],
        description: "Запонки из серебра с перламутровыми вставками. Элегантный аксессуар."
      },
      {
        id: "84",
        name: "Портмоне",
        price: 19990,
        oldPrice: 39980,
        images: ["https://images.unsplash.com/photo-1627123424574-724758594e93"],
        description: "Портмоне из итальянской кожи. Вместительное и стильное."
      },
      {
        id: "85",
        name: "Часы",
        price: 89990,
        oldPrice: 179980,
        images: ["https://images.unsplash.com/photo-1623998022290-a74f8cc36563"],
        description: "Механические часы швейцарского производства. Корпус из нержавеющей стали."
      },
      {
        id: "86",
        name: "Очки",
        price: 24990,
        oldPrice: 49980,
        images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f"],
        description: "Солнцезащитные очки в ацетатной оправе. Линзы с защитой от УФ-излучения."
      }
    ]
  },
  shoes: {
    title: "Обувь Premium",
    description: "Коллекция премиальной обуви ручной работы",
    products: [
      {
        id: "91",
        name: "Классические оксфорды",
        price: 45990,
        oldPrice: 91980,
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772"],
        description: "Классические оксфорды из итальянской кожи. Ручная работа."
      },
      {
        id: "92",
        name: "Элегантные дерби",
        price: 42990,
        oldPrice: 85980,
        images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"],
        description: "Элегантные дерби из телячьей кожи. Классический дизайн."
      },
      {
        id: "93",
        name: "Лоферы",
        price: 39990,
        oldPrice: 79980,
        images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"],
        description: "Лоферы из мягкой замши. Комфортные и элегантные."
      },
      {
        id: "94",
        name: "Броги",
        price: 44990,
        oldPrice: 89980,
        images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"],
        description: "Броги из телячьей кожи. Классический дизайн с перфорацией."
      },
      {
        id: "95",
        name: "Монки",
        price: 46990,
        oldPrice: 93980,
        images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"],
        description: "Монки из телячьей кожи. Элегантная модель с пряжкой."
      },
      {
        id: "96",
        name: "Челси",
        price: 41990,
        oldPrice: 83980,
        images: ["https://images.unsplash.com/photo-1614252370173-6f8bdea6f8e3"],
        description: "Челси из телячьей кожи. Эластичные вставки по бокам."
      }
    ]
  }
};
