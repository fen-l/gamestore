import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Address = {
  id: string;
  label: string;
  city: string;
  address: string;
  comment?: string;
};

export type OrderItem = {
  gameId: string;
  title: string;
  price: number;
  quantity: number;
};

export type OrderStatus = "Новый" | "В пути" | "Доставлен";

export type Order = {
  id: string;
  date: string;

  items: OrderItem[];

  subtotal: number;
  delivery: number;
  discount: number;
  total: number;

  status: OrderStatus;

  address?: Address;
};

type OrdersState = {
  orders: Record<string, Order[]>;

  addOrder: (
    email: string,
    order: Omit<Order, "id" | "date" | "status">,
  ) => string;

  updateStatus: (email: string, id: string, status: OrderStatus) => void;

  clear: (email: string) => void;
};

const EMPTY_ORDERS: Order[] = [];

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: {},

      addOrder: (email, order) => {
        const id = `#${Date.now()}`;

        set((state) => ({
          orders: {
            ...state.orders,

            [email]: [
              {
                ...order,

                id,

                date: new Date().toISOString().slice(0, 10),

                status: "Новый",
              },

              ...(state.orders[email] ?? EMPTY_ORDERS),
            ],
          },
        }));

        return id;
      },

      updateStatus: (email, id, status) =>
        set((state) => ({
          orders: {
            ...state.orders,

            [email]: (state.orders[email] ?? EMPTY_ORDERS).map((o) =>
              o.id === id ? { ...o, status } : o,
            ),
          },
        })),

      clear: (email) =>
        set((state) => ({
          orders: {
            ...state.orders,
            [email]: [],
          },
        })),
    }),
    {
      name: "bg-orders",
    },
  ),
);
