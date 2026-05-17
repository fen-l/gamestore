import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = { gameId: string; quantity: number };

type CartState = {
  items: CartItem[];

  promoCode: string;
  discount: number;

  add: (gameId: string, qty?: number) => void;
  remove: (gameId: string) => void;
  setQty: (gameId: string, qty: number) => void;
  clear: () => void;

  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      promoCode: "",
      discount: 0,

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

          return {
            items: [...s.items, { gameId, quantity: qty }],
          };
        }),

      remove: (gameId) =>
        set((s) => ({
          items: s.items.filter((i) => i.gameId !== gameId),
        })),

      setQty: (gameId, qty) =>
        set((s) => ({
          items: s.items
            .map((i) =>
              i.gameId === gameId ? { ...i, quantity: Math.max(1, qty) } : i,
            )
            .filter((i) => i.quantity > 0),
        })),

      clear: () =>
        set({
          items: [],
          promoCode: "",
          discount: 0,
        }),

      applyPromo: (code) => {
        const normalized = code.trim().toUpperCase();

        if (normalized === "GAME10") {
          set({
            promoCode: normalized,
            discount: 0.1,
          });

          return true;
        }

        if (normalized === "MIR20") {
          set({
            promoCode: normalized,
            discount: 0.2,
          });

          return true;
        }

        set({
          promoCode: "",
          discount: 0,
        });

        return false;
      },

      clearPromo: () =>
        set({
          promoCode: "",
          discount: 0,
        }),
    }),
    { name: "bg-cart" },
  ),
);
