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

export type OrderStatus = "Новый" | "В пути" | "Доставлен";

type OrdersState = {
  orders: Order[];

  addOrder: (order: Omit<Order, "id" | "date" | "status">) => string;
  updateStatus: (id: string, status: OrderStatus) => void;
};

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (order) => {
        const id = `#${Date.now()}`;

        set((state) => ({
          orders: [
            {
              ...order,
              id,
              date: new Date().toISOString().slice(0, 10),
              status: "Новый",
            },
            ...state.orders,
          ],
        }));

        return id;
      },

      updateStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
    }),
    { name: "bg-orders" },
  ),
);
