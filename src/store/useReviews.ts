import { create } from "zustand";

export type Review = {
  id: string;
  gameId: string;
  userEmail: string;
  userName: string;
  rating: number;
  text: string;
  createdAt: string;
};

type ReviewsState = {
  reviews: Review[];

  addReview: (
    gameId: string,
    userEmail: string,
    userName: string,
    rating: number,
    text: string,
  ) => void;

  getGameReviews: (gameId: string) => Review[];

  getGameStats: (gameId: string) => {
    rating: number;
    reviewCount: number;
  };
};

export const useReviews = create<ReviewsState>((set, get) => ({
  reviews: [
    {
      id: crypto.randomUUID(),
      gameId: "catan",
      userEmail: "ivan@test.ru",
      userName: "Иван",
      rating: 5,
      text: "Очень атмосферная игра",
      createdAt: new Date().toISOString(),
    },

    {
      id: crypto.randomUUID(),
      gameId: "catan",
      userEmail: "anna@test.ru",
      userName: "Анна",
      rating: 4,
      text: "Хорошо играется компанией",
      createdAt: new Date().toISOString(),
    },
  ],

  addReview: (gameId, userEmail, userName, rating, text) => {
    set((state) => ({
      reviews: [
        {
          id: crypto.randomUUID(),
          gameId,
          userEmail,
          userName,
          rating,
          text,
          createdAt: new Date().toISOString(),
        },
        ...state.reviews,
      ],
    }));
  },

  getGameReviews: (gameId) => {
    return get().reviews.filter((r) => r.gameId === gameId);
  },

  getGameStats: (gameId) => {
    const reviews = get().reviews.filter((r) => r.gameId === gameId);

    if (!reviews.length) {
      return {
        rating: 0,
        reviewCount: 0,
      };
    }

    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    return {
      rating: Number(avg.toFixed(1)),
      reviewCount: reviews.length,
    };
  },
}));
