import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = { gameId: string; quantity: number };

type CartState = {
  items: CartItem[];
  add: (gameId: string, qty?: number) => void;
  remove: (gameId: string) => void;
  setQty: (gameId: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (gameId, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.gameId === gameId);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.gameId === gameId ? { ...i, quantity: i.quantity + qty } : i,
              ),
            };
          }
          return { items: [...s.items, { gameId, quantity: qty }] };
        }),
      remove: (gameId) => set((s) => ({ items: s.items.filter((i) => i.gameId !== gameId) })),
      setQty: (gameId, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.gameId === gameId ? { ...i, quantity: Math.max(1, qty) } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "bg-cart" },
  ),
);

type FavState = {
  ids: string[];
  toggle: (id: string) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
};

export const useFavorites = create<FavState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id],
        })),
      remove: (id) => set((s) => ({ ids: s.ids.filter((x) => x !== id) })),
      has: (id) => get().ids.includes(id),
    }),
    { name: "bg-fav" },
  ),
);

type ThemeState = { theme: "light" | "dark"; toggle: () => void; init: () => void };

export const useTheme = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggle: () => {
        const next = get().theme === "light" ? "dark" : "light";
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", next === "dark");
        }
        set({ theme: next });
      },
      init: () => {
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", get().theme === "dark");
        }
      },
    }),
    { name: "bg-theme" },
  ),
);
