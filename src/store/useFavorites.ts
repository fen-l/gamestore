import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesState = {
  favorites: Record<string, string[]>;

  toggle: (email: string, gameId: string) => void;
  remove: (email: string, gameId: string) => void;
  clear: (email: string) => void;
};

export const useFavorites = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: {},

      toggle: (email, gameId) => {
        set((s) => {
          const current = s.favorites[email] ?? [];

          const next = current.includes(gameId)
            ? current.filter((id) => id !== gameId)
            : [...current, gameId];

          return {
            favorites: {
              ...s.favorites,
              [email]: next,
            },
          };
        });
      },

      remove: (email, gameId) => {
        set((s) => ({
          favorites: {
            ...s.favorites,
            [email]: (s.favorites[email] ?? []).filter((id) => id !== gameId),
          },
        }));
      },

      clear: (email) => {
        set((s) => ({
          favorites: {
            ...s.favorites,
            [email]: [],
          },
        }));
      },
    }),
    {
      name: "bg-favorites",
    },
  ),
);
