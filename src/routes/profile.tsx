import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { User, MapPin, LogOut, Camera, Package } from "lucide-react";
import { useProfile } from "@/store/profile";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  beforeLoad: () => {
    const auth = useProfile.getState();

    if (!auth.isAuth) {
      throw redirect({
        to: "/login",
      });
    }
  },

  component: ProfilePage,
  head: () => ({ meta: [{ title: "Профиль — МирИгр" }] }),
});

const ORDERS = [
  {
    id: "#10234",
    date: "2025-04-10",
    total: 5790,
    status: "Доставлен",
    items: 2,
  },
  { id: "#10198", date: "2025-03-22", total: 2490, status: "В пути", items: 1 },
  {
    id: "#10155",
    date: "2025-02-14",
    total: 9890,
    status: "Доставлен",
    items: 3,
  },
];

const TABS = [
  { id: "info", label: "Личные данные", icon: User },
  { id: "orders", label: "История заказов", icon: Package },
  { id: "addresses", label: "Адреса", icon: MapPin },
] as const;

function ProfilePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("info");
  const navigate = useNavigate();

  const { user, updateUser, logout } = useProfile();

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Профиль</h1>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-2">
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="relative w-24 h-24 mx-auto mb-3">
              <div className="w-24 h-24 rounded-full gradient-amber flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-soft">
                {user.name.charAt(0)}
              </div>
            </div>
            <div className="font-bold">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${
                tab === t.id
                  ? "gradient-amber text-primary-foreground shadow-soft"
                  : "hover:bg-accent"
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
          <button
            onClick={() => {
              logout();

              navigate({
                to: "/",
              });
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-destructive hover:bg-destructive/10 transition"
          >
            <LogOut className="w-4 h-4" /> Выйти
          </button>
        </aside>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 animate-fade-in">
          {tab === "info" && (
            <form
              className="max-w-xl space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <h2 className="text-xl font-bold mb-4">Личные данные</h2>
              {[
                [
                  "Имя",
                  user.name,
                  (value: string) => updateUser({ name: value }),
                  "text",
                ],
                [
                  "Email",
                  user.email,
                  (value: string) => updateUser({ email: value }),
                  "email",
                ],
                [
                  "Телефон",
                  user.phone,
                  (value: string) => updateUser({ phone: value }),
                  "tel",
                ],
              ].map(([l, v, set, type]) => (
                <div key={l as string}>
                  <label className="text-sm font-semibold mb-1.5 block">
                    {l as string}
                  </label>
                  <input
                    type={type as string}
                    value={v as string}
                    onChange={(e) =>
                      (set as (v: string) => void)(e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ))}
              <button className="px-6 py-3 rounded-xl gradient-amber text-primary-foreground font-bold">
                Сохранить
              </button>
            </form>
          )}

          {tab === "orders" && (
            <div>
              <h2 className="text-xl font-bold mb-4">История заказов</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-border">
                      <th className="py-3">Заказ</th>
                      <th>Дата</th>
                      <th>Товаров</th>
                      <th>Сумма</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERS.map((o) => (
                      <tr
                        key={o.id}
                        className="border-b border-border last:border-0"
                      >
                        <td className="py-4 font-bold">{o.id}</td>
                        <td>{o.date}</td>
                        <td>{o.items}</td>
                        <td className="font-semibold">
                          {o.total.toLocaleString("ru-RU")} ₽
                        </td>
                        <td>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              o.status === "Доставлен"
                                ? "bg-green-100 text-green-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "addresses" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Адреса доставки</h2>
              <div className="space-y-3">
                {[
                  { l: "Дом", a: "Москва, ул. Игровая, 1, кв. 42" },
                  { l: "Работа", a: "Москва, Тверская, 15, офис 305" },
                ].map((a, i) => (
                  <div
                    key={i}
                    className="bg-muted rounded-xl p-4 flex items-start gap-3"
                  >
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-bold">{a.l}</div>
                      <div className="text-sm text-muted-foreground">{a.a}</div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 rounded-xl border-2 border-dashed border-border text-sm font-semibold hover:bg-accent transition">
                  + Добавить адрес
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
