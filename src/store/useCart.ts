import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  gameId: string;
  quantity: number;
};

type UserCart = {
  items: CartItem[];

  promoCode: string;
  discount: number;
};

type CartState = {
  carts: Record<string, UserCart>;

  add: (email: string, gameId: string, qty?: number) => void;
  remove: (email: string, gameId: string) => void;

  setQty: (email: string, gameId: string, qty: number) => void;

  clear: (email: string) => void;

  applyPromo: (email: string, code: string) => boolean;

  clearPromo: (email: string) => void;
};

const EMPTY_CART: UserCart = {
  items: [],
  promoCode: "",
  discount: 0,
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      carts: {},

      add: (email, gameId, qty = 1) =>
        set((s) => {
          const cart = s.carts[email] ?? EMPTY_CART;

          const existing = cart.items.find((i) => i.gameId === gameId);

          const items = existing
            ? cart.items.map((i) =>
                i.gameId === gameId ? { ...i, quantity: i.quantity + qty } : i,
              )
            : [...cart.items, { gameId, quantity: qty }];

          return {
            carts: {
              ...s.carts,
              [email]: {
                ...cart,
                items,
              },
            },
          };
        }),

      remove: (email, gameId) =>
        set((s) => {
          const cart = s.carts[email] ?? EMPTY_CART;

          return {
            carts: {
              ...s.carts,
              [email]: {
                ...cart,
                items: cart.items.filter((i) => i.gameId !== gameId),
              },
            },
          };
        }),

      setQty: (email, gameId, qty) =>
        set((s) => {
          const cart = s.carts[email] ?? EMPTY_CART;

          return {
            carts: {
              ...s.carts,
              [email]: {
                ...cart,
                items: cart.items
                  .map((i) =>
                    i.gameId === gameId
                      ? {
                          ...i,
                          quantity: Math.max(1, qty),
                        }
                      : i,
                  )
                  .filter((i) => i.quantity > 0),
              },
            },
          };
        }),

      clear: (email) =>
        set((s) => ({
          carts: {
            ...s.carts,
            [email]: EMPTY_CART,
          },
        })),

      applyPromo: (email, code) => {
        const normalized = code.trim().toUpperCase();

        let discount = 0;

        if (normalized === "GAME10") {
          discount = 0.1;
        }

        if (normalized === "MIR20") {
          discount = 0.2;
        }

        set((s) => {
          const cart = s.carts[email] ?? EMPTY_CART;

          return {
            carts: {
              ...s.carts,
              [email]: {
                ...cart,
                promoCode: discount ? normalized : "",
                discount,
              },
            },
          };
        });

        return discount > 0;
      },

      clearPromo: (email) =>
        set((s) => {
          const cart = s.carts[email] ?? EMPTY_CART;

          return {
            carts: {
              ...s.carts,
              [email]: {
                ...cart,
                promoCode: "",
                discount: 0,
              },
            },
          };
        }),
    }),
    {
      name: "bg-cart",
    },
  ),
);
