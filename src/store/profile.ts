import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type ProfileState = {
  isAuth: boolean;
  user: User | null;

  register: (
    name: string,
    email: string,
    phone: string,
    password: string,
  ) => boolean;

  login: (email: string, password: string) => boolean;

  logout: () => void;

  updateUser: (data: Partial<User>) => void;
};

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      isAuth: false,

      user: null,

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
          isAuth: true,
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

        const found = users.find(
          (u: User) => u.email === email && u.password === password,
        );

        if (!found) {
          return false;
        }

        set({
          isAuth: true,
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
          isAuth: false,
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
