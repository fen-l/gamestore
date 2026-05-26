import { create } from "zustand";
import { persist } from "zustand/middleware";

type Address = {
  id: string;
  label: string; // "Дом", "Работа"
  city: string;
  address: string; // улица, дом, квартира
  comment?: string;
};

type User = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type ProfileState = {
  user: User | null;

  register: (name: string, email: string, phone: string, password: string) => boolean;

  login: (email: string, password: string) => boolean;

  logout: () => void;

  updateUser: (data: Partial<User>) => void;
  addresses: Address[];
  lastUsedAddressId: string | null;
  setLastUsedAddressId: (id: string) => void;

  addAddress: (addr: Omit<Address, "id">) => string;
  removeAddress: (id: string) => void;
  updateAddress: (id: string, addr: Partial<Address>) => void;
};

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      user: null,
      addresses: [],
      lastUsedAddressId: null,

      setLastUsedAddressId: (id) =>
        set(() => ({
          lastUsedAddressId: id,
        })),

      addAddress: (addr) => {
        const id = crypto.randomUUID();

        set((s) => ({
          addresses: [...s.addresses, { id, ...addr }],
          lastUsedAddressId: id,
        }));

        return id;
      },

      removeAddress: (id) =>
        set((s) => ({
          addresses: s.addresses.filter((a) => a.id !== id),
        })),

      updateAddress: (id, data) =>
        set((s) => ({
          addresses: s.addresses.map((a) => (a.id === id ? { ...a, ...data } : a)),
        })),

      register: (name, email, phone, password) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const exists = users.some((u: User) => u.email === email);

        if (exists) {
          return false;
        }

        users.push({
          name,
          email,
          phone,
          password,
        });

        localStorage.setItem("users", JSON.stringify(users));

        set({
          user: {
            name,
            email,
            phone,
            password,
          },
        });

        return true;
      },

      login: (email, password) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const found = users.find((u: User) => u.email === email && u.password === password);

        if (!found) {
          return false;
        }

        set({
          user: {
            name: found.name,
            email: found.email,
            phone: found.phone,
            password: found.password,
          },
        });

        return true;
      },

      logout: () =>
        set({
          user: null,
        }),

      updateUser: (data) =>
        set((s) => ({
          user: s.user
            ? {
                ...s.user,
                ...data,
              }
            : null,
        })),
    }),
    {
      name: "bg-profile",
    },
  ),
);
