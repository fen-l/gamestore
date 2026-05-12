import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Truck, CreditCard, Wallet, Tag } from "lucide-react";
import { useCart } from "@/store/useStore";
import { GAMES } from "@/data/games";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Оформление заказа — МирИгр" }] }),
});

function CheckoutPage() {
  const { items, clear } = useCart();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState<"courier" | "pickup" | "post">("courier");
  const [payment, setPayment] = useState<"card" | "cash">("card");
  const [agree, setAgree] = useState(false);
  const [promo, setPromo] = useState("");

  const detailed = items.map((i) => ({ ...i, game: GAMES.find((g) => g.id === i.gameId)! })).filter((i) => i.game);
  const subtotal = detailed.reduce((s, i) => s + i.game.price * i.quantity, 0);
  const deliveryCost = delivery === "courier" ? 300 : delivery === "post" ? 200 : 0;
  const total = subtotal + deliveryCost;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return alert("Согласитесь с условиями");
    clear();
    alert("Заказ успешно оформлен!");
    navigate({ to: "/" });
  };

  if (detailed.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Корзина пуста</h1>
        <button onClick={() => navigate({ to: "/catalog" })} className="mt-6 px-6 py-3 rounded-xl gradient-amber text-primary-foreground font-bold">В каталог</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Оформление заказа</h1>

      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-6">
          <section className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Контактные данные</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Имя" className="px-4 py-2.5 rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-ring" />
              <input required placeholder="Фамилия" className="px-4 py-2.5 rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-ring" />
              <input required type="email" placeholder="Email" className="px-4 py-2.5 rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-ring" />
              <input required type="tel" placeholder="Телефон" className="px-4 py-2.5 rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Способ доставки</h2>
            <div className="space-y-2">
              {([
                ["courier", "Курьер по Москве", "300 ₽ • завтра"],
                ["pickup", "Самовывоз из магазина", "Бесплатно • сегодня"],
                ["post", "Почта России", "200 ₽ • 3-7 дней"],
              ] as const).map(([k, l, d]) => (
                <label key={k} className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition ${
                  delivery === k ? "border-primary bg-amber-soft/30" : "border-border hover:bg-accent"
                }`}>
                  <input type="radio" name="del" checked={delivery === k} onChange={() => setDelivery(k)} className="accent-primary" />
                  <Truck className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <div className="font-semibold">{l}</div>
                    <div className="text-sm text-muted-foreground">{d}</div>
                  </div>
                </label>
              ))}
            </div>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Адрес доставки</h2>
            <div className="space-y-3">
              <input required placeholder="Город" defaultValue="Москва" className="w-full px-4 py-2.5 rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-ring" />
              <input required placeholder="Улица, дом, квартира" className="w-full px-4 py-2.5 rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-ring" />
              <textarea placeholder="Комментарий к заказу" rows={2} className="w-full px-4 py-2.5 rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4">Способ оплаты</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {([
                ["card", "Картой онлайн", CreditCard],
                ["cash", "При получении", Wallet],
              ] as const).map(([k, l, Icon]) => (
                <label key={k} className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition ${
                  payment === k ? "border-primary bg-amber-soft/30" : "border-border hover:bg-accent"
                }`}>
                  <input type="radio" name="pay" checked={payment === k} onChange={() => setPayment(k)} className="accent-primary" />
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
                  <img src={i.game.images[0]} alt="" className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold line-clamp-1">{i.game.title}</div>
                    <div className="text-xs text-muted-foreground">{i.quantity} × {i.game.price.toLocaleString("ru-RU")} ₽</div>
                  </div>
                  <div className="font-bold text-sm">{(i.game.price * i.quantity).toLocaleString("ru-RU")} ₽</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-4 pt-4 border-t border-border">
              <Tag className="w-4 h-4 text-primary" />
              <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Промокод" className="flex-1 px-3 py-2 rounded-xl bg-muted text-sm focus:outline-none" />
            </div>

            <div className="space-y-2 text-sm border-t border-border pt-4">
              <div className="flex justify-between"><span className="text-muted-foreground">Товары</span><span>{subtotal.toLocaleString("ru-RU")} ₽</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Доставка</span><span>{deliveryCost === 0 ? "Бесплатно" : `${deliveryCost} ₽`}</span></div>
              <div className="flex justify-between text-xl font-bold pt-3 border-t border-border"><span>Итого</span><span>{total.toLocaleString("ru-RU")} ₽</span></div>
            </div>

            <label className="flex items-start gap-2 mt-5 text-xs text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-primary" />
              Я согласен с условиями обработки персональных данных и публичной офертой
            </label>

            <button type="submit" className="w-full mt-4 py-3 rounded-xl gradient-amber text-primary-foreground font-bold hover:shadow-glow transition">
              Подтвердить заказ
            </button>
            <button type="button" onClick={() => navigate({ to: "/cart" })} className="w-full mt-2 py-3 rounded-xl border border-border font-semibold hover:bg-accent transition">
              Отменить заказ
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}
