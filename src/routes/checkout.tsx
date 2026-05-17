import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Truck, CreditCard, Wallet, Tag } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useProfile } from "@/store/useProfile";
import { GAMES } from "@/data/games";
import { useOrders } from "@/store/useOrders";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Оформление заказа — МирИгр" }] }),
});

function CheckoutPage() {
  const { items, clear, promoCode, discount } = useCart();
  const addOrder = useOrders((s) => s.addOrder);

  const navigate = useNavigate();

  const { addresses, addAddress, lastUsedAddressId, setLastUsedAddressId } =
    useProfile();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    lastUsedAddressId ?? null,
  );

  const [form, setForm] = useState({
    label: "",
    city: "Минск",
    address: "",
    comment: "",
  });

  const [delivery, setDelivery] = useState<
    "courier" | "pickup" | "euro-post" | "bel-post"
  >("courier");

  const [payment, setPayment] = useState<"card" | "cash">("card");

  const [agree, setAgree] = useState(false);

  const detailed = items
    .map((i) => ({
      ...i,
      game: GAMES.find((g) => g.id === i.gameId)!,
    }))
    .filter((i) => i.game);

  const subtotal = detailed.reduce((s, i) => s + i.game.price * i.quantity, 0);

  const discountAmt = Math.round(subtotal * discount);

  const deliveryCost =
    delivery === "courier"
      ? 5
      : delivery === "pickup"
        ? 0
        : delivery === "euro-post"
          ? 7
          : delivery === "bel-post"
            ? 9
            : 0;

  const total = subtotal - discountAmt + deliveryCost;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agree) {
      alert("Согласитесь с условиями");
      return;
    }

    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
    if (!selectedAddress) {
      alert("Выберите адрес доставки");
      return;
    }

    const orderId = addOrder({
      items: detailed.map((i) => ({
        gameId: i.gameId,
        title: i.game.title,
        price: i.game.price,
        quantity: i.quantity,
      })),
      subtotal,
      delivery: deliveryCost,
      discount: discountAmt,
      total,
      address: selectedAddress,
    });

    setTimeout(() => {
      useOrders.getState().updateStatus(orderId, "В пути");
    }, 60000); //через минуту будет статус в пути

    setTimeout(() => {
      useOrders.getState().updateStatus(orderId, "Доставлен");
    }, 360000); //через 6 минут статус станет доставлен

    clear();

    alert("Заказ успешно оформлен!");

    navigate({ to: "/" });
  };

  if (detailed.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Корзина пуста</h1>

        <button
          onClick={() => navigate({ to: "/catalog" })}
          className="mt-6 px-6 py-3 rounded-xl gradient-amber text-primary-foreground font-bold"
        >
          В каталог
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Оформление заказа</h1>

      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-6">
          <section className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Способ доставки</h2>

            <div className="space-y-2">
              {(
                [
                  ["courier", "Курьер по Минску", "5 руб • завтра"],
                  ["pickup", "Самовывоз из магазина", "Бесплатно • сегодня"],
                  ["euro-post", "Европочта", "7 руб • 3-7 дней"],
                  ["bel-post", "Белпочта", "9 руб • 1-5 дней"],
                ] as const
              ).map(([k, l, d]) => (
                <label
                  key={k}
                  className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition ${
                    delivery === k
                      ? "border-primary bg-amber-soft/30"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  <input
                    type="radio"
                    name="del"
                    checked={delivery === k}
                    onChange={() => setDelivery(k)}
                    className="accent-primary"
                  />

                  <Truck className="w-5 h-5 text-primary" />

                  <div className="flex-1">
                    <div className="font-semibold">{l}</div>

                    <div className="text-sm text-muted-foreground">{d}</div>
                  </div>
                </label>
              ))}
            </div>
          </section>
          {delivery !== "pickup" && (
            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-bold text-lg mb-4">Адрес доставки</h2>

              <div className="space-y-3">
                {addresses.map((a) => (
                  <label
                    key={a.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                      selectedAddressId === a.id
                        ? "border-primary bg-amber-soft/30"
                        : "border-border hover:bg-accent"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedAddressId === a.id}
                      onChange={() => {
                        setSelectedAddressId(a.id);
                        setLastUsedAddressId(a.id);
                      }}
                      className="accent-primary mt-1"
                    />

                    <div className="flex-1">
                      <div className="font-bold">{a.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {a.city}, {a.address}
                      </div>
                      {a.comment && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {a.comment}
                        </div>
                      )}
                    </div>
                  </label>
                ))}

                {!showAddressForm ? (
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(true)}
                    className="w-full py-3 rounded-xl border-2 border-dashed border-border text-sm font-semibold hover:bg-accent transition"
                  >
                    + Добавить адрес
                  </button>
                ) : (
                  <div className="space-y-2">
                    <input
                      placeholder="Название (Дом, Работа)"
                      value={form.label}
                      onChange={(e) =>
                        setForm({ ...form, label: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-muted"
                    />

                    <input
                      placeholder="Город"
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-muted"
                    />

                    <input
                      placeholder="Адрес"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-muted"
                    />

                    <textarea
                      placeholder="Комментарий"
                      value={form.comment}
                      onChange={(e) =>
                        setForm({ ...form, comment: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-muted"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const id = addAddress(form);
                        setSelectedAddressId(id);

                        setShowAddressForm(false);
                        setForm({
                          label: "",
                          city: "Минск",
                          address: "",
                          comment: "",
                        });
                      }}
                      className="w-full py-2.5 rounded-xl gradient-amber text-primary-foreground font-bold"
                    >
                      Сохранить адрес
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}
          <section className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Способ оплаты</h2>

            <div className="grid sm:grid-cols-2 gap-3">
              {(
                [
                  ["card", "Картой онлайн", CreditCard],
                  ["cash", "При получении", Wallet],
                ] as const
              ).map(([k, l, Icon]) => (
                <label
                  key={k}
                  className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition ${
                    payment === k
                      ? "border-primary bg-amber-soft/30"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    checked={payment === k}
                    onChange={() => setPayment(k)}
                    className="accent-primary"
                  />

                  <Icon className="w-5 h-5 text-primary" />

                  <span className="font-semibold">{l}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 shadow-soft">
            <h2 className="font-bold text-xl mb-4">Ваш заказ</h2>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 mb-4">
              {detailed.map((i) => (
                <div key={i.gameId} className="flex gap-3 items-center">
                  <img
                    src={i.game.images[0]}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold line-clamp-1">
                      {i.game.title}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {i.quantity} × {i.game.price.toLocaleString("ru-RU")} руб
                    </div>
                  </div>

                  <div className="font-bold text-sm">
                    {(i.game.price * i.quantity).toLocaleString("ru-RU")} руб
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border mb-4">
              {promoCode && discount > 0 ? (
                <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-3 text-sm text-green-600">
                  <Tag className="w-4 h-4" />

                  <span>
                    Промокод <span className="font-bold">{promoCode}</span>{" "}
                    применён
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Tag className="w-4 h-4" />
                  Промокод не применён
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm border-t border-border pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Товары</span>

                <span>{subtotal.toLocaleString("ru-RU")} руб</span>
              </div>

              {discountAmt > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Скидка</span>

                  <span>−{discountAmt.toLocaleString("ru-RU")} руб</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Доставка</span>

                <span>
                  {deliveryCost === 0 ? "Бесплатно" : `${deliveryCost} руб`}
                </span>
              </div>

              <div className="flex justify-between text-xl font-bold pt-3 border-t border-border">
                <span>Итого</span>

                <span>{total.toLocaleString("ru-RU")} руб</span>
              </div>
            </div>

            <label className="flex items-start gap-2 mt-5 text-xs text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 accent-primary"
              />
              Я согласен с условиями обработки персональных данных и публичной
              офертой
            </label>

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-xl gradient-amber text-primary-foreground font-bold hover:shadow-glow transition"
            >
              Подтвердить заказ
            </button>

            <button
              type="button"
              onClick={() => navigate({ to: "/cart" })}
              className="w-full mt-2 py-3 rounded-xl border border-border font-semibold hover:bg-accent transition"
            >
              Отменить заказ
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}
