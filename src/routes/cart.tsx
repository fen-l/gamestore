import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Tag,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/store/useCart";
import { GAMES } from "@/data/games";
import { GameCard } from "@/components/GameCard";
import { useProfile } from "@/store/useProfile.ts";

export const Route = createFileRoute("/cart")({
  beforeLoad: () => {
    const auth = useProfile.getState();

    if (!auth.user) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: CartPage,
  head: () => ({ meta: [{ title: "Корзина — МирИгр" }] }),
});

function CartPage() {
  const navigate = useNavigate();
  const user = useProfile((s) => s.user);
  const userCart = useCart((s) => (user ? s.carts[user.email] : undefined));
  const cart = userCart ?? {
    items: [],
    promoCode: "",
    discount: 0,
  };
  const { setQty, remove, applyPromo } = useCart();
  const [promo, setPromo] = useState(cart.promoCode);

  const detailed = cart.items
    .map((i) => ({ ...i, game: GAMES.find((g) => g.id === i.gameId)! }))
    .filter((i) => i.game);

  const subtotal = detailed.reduce((s, i) => s + i.game.price * i.quantity, 0);
  const discountAmt = Math.round(subtotal * cart.discount);
  const total = subtotal - discountAmt;

  const handleApplyPromo = () => {
    if (!user) {
      return;
    }
    const success = applyPromo(user.email, promo);

    if (!success) {
      alert("Промокод не найден");
    }
  };

  const recommend = GAMES.filter(
    (g) => !cart.items.some((i) => i.gameId === g.id),
  ).slice(0, 4);

  if (detailed.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 mx-auto rounded-full gradient-amber-soft flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Корзина пуста</h1>
        <p className="text-muted-foreground mb-8">
          Добавьте игры из каталога, чтобы оформить заказ
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl gradient-amber text-primary-foreground font-bold shadow-soft hover:shadow-glow transition"
        >
          В каталог <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Корзина</h1>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-4">
          {detailed.map((i) => (
            <div
              key={i.gameId}
              className="bg-card border border-border rounded-2xl p-4 flex gap-4 animate-fade-in"
            >
              <Link
                to="/product/$id"
                params={{ id: i.gameId }}
                className="shrink-0"
              >
                <img
                  src={i.game.images[0]}
                  alt={i.game.title}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to="/product/$id" params={{ id: i.gameId }}>
                  <h3 className="font-bold line-clamp-1 hover:text-primary">
                    {i.game.title}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground">
                  {i.game.publisher}
                </p>
                <div className="text-lg font-bold mt-1">
                  {i.game.price.toLocaleString("ru-RU")} руб
                </div>
                <div className="flex items-center justify-between mt-3 gap-3">
                  <div className="flex items-center bg-muted rounded-xl">
                    <button
                      onClick={() => {
                        if (!user) {
                          navigate({ to: "/login" });
                          return;
                        }

                        setQty(user.email, i.gameId, i.quantity - 1);
                      }}
                      className="p-2 hover:bg-accent rounded-l-xl"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 font-bold w-8 text-center">
                      {i.quantity}
                    </span>
                    <button
                      onClick={() => {
                        if (!user) {
                          navigate({ to: "/login" });
                          return;
                        }

                        setQty(user.email, i.gameId, i.quantity + 1);
                      }}
                      className="p-2 hover:bg-accent rounded-r-xl"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      if (!user) {
                        navigate({ to: "/login" });
                        return;
                      }

                      remove(user.email, i.gameId);
                    }}
                    className="p-2 text-muted-foreground hover:text-destructive transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 shadow-soft">
            <h2 className="font-bold text-xl mb-4">Итого</h2>
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-primary" />
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Промокод"
                className="flex-1 px-3 py-2 rounded-xl bg-muted text-sm focus:outline-none"
              />
              <button
                onClick={handleApplyPromo}
                className="px-4 py-2 rounded-xl bg-foreground text-background text-sm font-semibold"
              >
                OK
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Попробуйте: GAME10 или MIR20
            </p>
            {cart.promoCode && cart.discount > 0 && (
              <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-600">
                Промокод <span className="font-bold">{cart.promoCode}</span>{" "}
                применён
              </div>
            )}

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
                <span>Бесплатно</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>К оплате</span>
                <span>{total.toLocaleString("ru-RU")} руб</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block text-center mt-5 py-3 rounded-xl gradient-amber text-primary-foreground font-bold hover:shadow-glow transition"
            >
              Перейти к оформлению
            </Link>
          </div>
        </div>
      </div>

      {recommend.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Рекомендуем</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {recommend.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
