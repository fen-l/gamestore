import type { BoardGame } from "@/types";
import catan1 from "/assets/games/catan/1.jpg";
import catan2 from "/assets/games/catan/2.jpg";
import catan3 from "/assets/games/catan/3.jpg";
import catan4 from "/assets/games/catan/4.jpg";
import catan5 from "/assets/games/catan/5.jpg";
import ttr1 from "/assets/games/ttr/1.jpg";
import ttr2 from "/assets/games/ttr/2.jpg";
import ttr3 from "/assets/games/ttr/3.jpg";
import ttr4 from "/assets/games/ttr/4.jpg";
import carc1 from "/assets/games/carc/1.jpg";
import carc2 from "/assets/games/carc/2.jpg";
import carc3 from "/assets/games/carc/3.jpg";
import carc4 from "/assets/games/carc/4.jpg";
import wing1 from "/assets/games/wing/1.jpg";
import wing2 from "/assets/games/wing/2.jpg";
import wing3 from "/assets/games/wing/3.jpg";
import wing4 from "/assets/games/wing/4.jpg";
import wing5 from "/assets/games/wing/5.jpg";
import azul1 from "/assets/games/azul/1.jpg";
import azul2 from "/assets/games/azul/2.jpg";
import azul3 from "/assets/games/azul/3.jpg";
import azul4 from "/assets/games/azul/4.jpg";
import gh1 from "/assets/games/gh/1.jpg";
import gh2 from "/assets/games/gh/2.jpg";
import gh3 from "/assets/games/gh/3.jpg";
import gh4 from "/assets/games/gh/4.jpg";
import gh5 from "/assets/games/gh/5.jpg";
import dixit1 from "/assets/games/dixit/1.jpg";
import dixit2 from "/assets/games/dixit/2.jpg";
import dixit3 from "/assets/games/dixit/3.jpg";
import dixit4 from "/assets/games/dixit/4.jpg";
import spl1 from "/assets/games/spl/1.jpg";
import spl2 from "/assets/games/spl/2.jpg";
import spl3 from "/assets/games/spl/3.jpg";
import spl4 from "/assets/games/spl/4.jpg";
import mans1 from "/assets/games/mans/1.jpg";
import mans2 from "/assets/games/mans/2.jpg";
import mans3 from "/assets/games/mans/3.jpg";
import mans4 from "/assets/games/mans/4.jpg";
import uno1 from "/assets/games/uno/1.jpg";
import uno2 from "/assets/games/uno/2.jpg";
import uno3 from "/assets/games/uno/3.jpg";
import uno4 from "/assets/games/uno/4.jpg";
import mono1 from "/assets/games/mono/1.jpg";
import mono2 from "/assets/games/mono/2.jpg";
import mono3 from "/assets/games/mono/3.jpg";
import mono4 from "/assets/games/mono/4.jpg";
import scythe1 from "/assets/games/scythe/1.jpg";
import scythe2 from "/assets/games/scythe/2.jpg";
import scythe3 from "/assets/games/scythe/3.jpg";
import scythe4 from "/assets/games/scythe/4.jpg";

export const GAMES: BoardGame[] = [
  {
    id: "catan",
    title: "Колонизаторы",
    subtitle: "Классика стратегий",
    price: 133.54,
    oldPrice: 152.67,
    playersMin: 3,
    playersMax: 4,
    ageMin: 10,
    playTimeMin: 60,
    playTimeMax: 120,
    genres: ["Стратегия", "Семейная"],
    publisher: "Hobby World",
    shortDescription:
      "Стройте поселения и торгуйте ресурсами на острове Катан.",
    description:
      "Колонизаторы — легендарная немецкая стратегия о колонизации острова. Игроки строят поселения, прокладывают дороги, торгуются и собирают ресурсы. Каждая партия уникальна благодаря модульному полю.",
    images: [catan1, catan2, catan3, catan4, catan5],
    inStock: true,
    isBestseller: true,
    tags: ["популярное", "евро"],
  },
  {
    id: "ticket-to-ride",
    title: "Билет на поезд",
    subtitle: "Путешествие по Европе",
    price: 106.75,
    playersMin: 2,
    playersMax: 5,
    ageMin: 8,
    playTimeMin: 45,
    playTimeMax: 90,
    genres: ["Семейная", "Стратегия"],
    publisher: "Days of Wonder",
    shortDescription: "Стройте железные дороги между городами Европы.",
    description:
      "Простые правила, глубокая стратегия. Соберите вагоны и проложите маршруты, чтобы выполнить секретные билеты.",
    images: [ttr1, ttr2, ttr3, ttr4],
    inStock: true,
    isNew: true,
    tags: ["семейное"],
  },
  {
    id: "carcassonne",
    title: "Каркассон",
    price: 76.14,
    oldPrice: 87.62,
    playersMin: 2,
    playersMax: 5,
    ageMin: 7,
    playTimeMin: 30,
    playTimeMax: 60,
    genres: ["Семейная", "Тайл-плейсмент"],
    publisher: "Hans im Glück",
    shortDescription: "Постройте средневековый ландшафт из квадратных тайлов.",
    description:
      "Каждый ход — новый тайл. Размещайте миплов и зарабатывайте очки за города, дороги и монастыри.",
    images: [carc1, carc2, carc3, carc4],
    inStock: true,
    isBestseller: true,
    tags: ["семейное"],
  },
  {
    id: "wingspan",
    title: "Крылья",
    subtitle: "Игра о птицах",
    price: 175.63,
    playersMin: 1,
    playersMax: 5,
    ageMin: 10,
    playTimeMin: 40,
    playTimeMax: 70,
    genres: ["Стратегия", "Карточная"],
    publisher: "Stonemaier Games",
    shortDescription: "Привлекайте птиц в свои заповедники.",
    description:
      "Изящная игра о наблюдении за птицами с потрясающими иллюстрациями и глубоким движком.",
    images: [wing1, wing2, wing3, wing4, wing5],
    inStock: true,
    isNew: true,
    isBestseller: true,
    tags: ["топ", "новинка"],
  },
  {
    id: "azul",
    title: "Азул",
    price: 95.27,
    playersMin: 2,
    playersMax: 4,
    ageMin: 8,
    playTimeMin: 30,
    playTimeMax: 45,
    genres: ["Абстрактная", "Семейная"],
    publisher: "Plan B Games",
    shortDescription: "Выкладывайте красивую плитку азулежу.",
    description:
      "Абстрактная стратегия с тактильными компонентами и простыми, но глубокими правилами.",
    images: [azul1, azul2, azul3, azul4],
    inStock: true,
    tags: ["абстракт"],
  },
  {
    id: "gloomhaven",
    title: "Мрачная Гавань",
    price: 382.25,
    oldPrice: 458.77,
    playersMin: 1,
    playersMax: 4,
    ageMin: 14,
    playTimeMin: 60,
    playTimeMax: 180,
    genres: ["Приключения", "Кооператив"],
    publisher: "Cephalofair Games",
    shortDescription: "Эпическая кампания в мире фэнтези.",
    description:
      "Сотни часов кооперативных приключений, развитие персонажей и глубокая боевая система.",
    images: [gh1, gh2, gh3, gh4, gh5],
    inStock: true,
    isBestseller: true,
    tags: ["хардкор", "кампания"],
  },
  {
    id: "dixit",
    title: "Диксит",
    price: 83.8,
    playersMin: 3,
    playersMax: 6,
    ageMin: 8,
    playTimeMin: 30,
    playTimeMax: 45,
    genres: ["Вечериночная", "Карточная"],
    publisher: "Libellud",
    shortDescription: "Игра ассоциаций с волшебными иллюстрациями.",
    description: "Загадывайте ассоциации к карточкам и угадывайте чужие.",
    images: [dixit1, dixit2, dixit3, dixit4],
    inStock: true,
    tags: ["вечеринка"],
  },
  {
    id: "splendor",
    title: "Сплендор",
    price: 91.45,
    playersMin: 2,
    playersMax: 4,
    ageMin: 10,
    playTimeMin: 30,
    playTimeMax: 30,
    genres: ["Стратегия", "Экономическая"],
    publisher: "Space Cowboys",
    shortDescription: "Станьте богатейшим торговцем драгоценностями.",
    description: "Быстрая экономическая стратегия с приятными жетонами.",
    images: [spl1, spl2, spl3, spl4],
    inStock: false,
    tags: ["евро"],
  },
  {
    id: "mansions",
    title: "Особняки Безумия",
    price: 286.59,
    playersMin: 1,
    playersMax: 5,
    ageMin: 14,
    playTimeMin: 120,
    playTimeMax: 180,
    genres: ["Приключения", "Кооператив", "Хоррор"],
    publisher: "Fantasy Flight Games",
    shortDescription: "Кооперативный хоррор с приложением.",
    description:
      "Исследуйте таинственные особняки и раскрывайте загадки в мире Лавкрафта.",
    images: [mans1, mans2, mans3, mans4],
    inStock: true,
    isNew: true,
    tags: ["хоррор"],
  },
  {
    id: "uno",
    title: "Уно",
    price: 26.4,
    playersMin: 2,
    playersMax: 10,
    ageMin: 6,
    playTimeMin: 15,
    playTimeMax: 30,
    genres: ["Вечериночная", "Карточная"],
    publisher: "Mattel",
    shortDescription: "Классическая карточная игра для всех.",
    description: "Сбрасывайте карты по цвету или числу и кричите «Уно!».",
    images: [uno1, uno2, uno3, uno4],
    inStock: true,
    tags: ["классика"],
  },
  {
    id: "monopoly",
    title: "Монополия",
    price: 76.14,
    oldPrice: 95.27,
    playersMin: 2,
    playersMax: 8,
    ageMin: 8,
    playTimeMin: 90,
    playTimeMax: 180,
    genres: ["Семейная", "Экономическая"],
    publisher: "Hasbro",
    shortDescription: "Покупайте улицы и стройте империю.",
    description: "Легендарная семейная игра, любимая поколениями.",
    images: [mono1, mono2, mono3, mono4],
    inStock: true,
    isBestseller: true,
    tags: ["классика"],
  },
  {
    id: "scythe",
    title: "Серп",
    price: 267.46,
    playersMin: 1,
    playersMax: 5,
    ageMin: 14,
    playTimeMin: 90,
    playTimeMax: 120,
    genres: ["Стратегия", "4X"],
    publisher: "Stonemaier Games",
    shortDescription: "Альтернативная Европа 1920-х с шагающими мехами.",
    description:
      "Глубокая стратегия с управлением ресурсами, территорией и боями.",
    images: [scythe1, scythe2, scythe3, scythe4],
    inStock: true,
    tags: ["топ"],
  },
];

export const GENRES = Array.from(
  new Set(GAMES.flatMap((g) => g.genres)),
).sort();
export const PUBLISHERS = Array.from(
  new Set(GAMES.map((g) => g.publisher)),
).sort();
