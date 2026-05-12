export type Review = {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
};

export type BoardGame = {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  playersMin: number;
  playersMax: number;
  ageMin: number;
  playTimeMin: number;
  playTimeMax: number;
  genres: string[];
  publisher: string;
  description: string;
  shortDescription: string;
  images: string[];
  inStock: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  tags: string[];
  reviews: Review[];
};

export type CartItem = {
  gameId: string;
  quantity: number;
};

export type Order = {
  id: string;
  date: string;
  total: number;
  status: "Доставлен" | "В пути" | "Обработка" | "Отменён";
  items: number;
};

export type Address = {
  id: string;
  label: string;
  city: string;
  street: string;
  zip: string;
};
