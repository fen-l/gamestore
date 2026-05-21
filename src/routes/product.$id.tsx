import {
  createFileRoute,
  Link,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  Users,
  Clock,
  Award,
  Truck,
  Shield,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { GAMES } from "@/data/games";
import { GameCard } from "@/components/GameCard";
import { useFavorites } from "@/store/useFavorites";
import { useCart } from "@/store/useCart";
import { useProfile } from "@/store/useProfile.ts";
import { useReviews } from "@/store/useReviews";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
  loader: ({ params }) => {
    const game = GAMES.find((g) => g.id === params.id);
    if (!game) throw notFound();
    return { game };
  },
});

function ProductPage() {
  const { id } = Route.useParams();
  const game = GAMES.find((g) => g.id === id)!;
  const [imgIdx, setImgIdx] = useState(0);
  const [tab, setTab] = useState<"desc" | "specs" | "rules" | "reviews">(
    "desc",
  );
  const [lightbox, setLightbox] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const { setQty: setCartQty } = useCart();
  const user = useProfile((s) => s.user);
  const userCart = useCart((s) => (user ? s.carts[user.email] : undefined));
  const cart = userCart ?? {
    items: [],
    promoCode: "",
    discount: 0,
  };
  const cartItem = cart.items.find((i) => i.gameId === game.id);
  const qty = cartItem?.quantity ?? 1;

  const addCart = useCart((s) => s.add);
  const fav = useFavorites();
  const favorites = useFavorites((s) =>
    user?.email ? s.favorites[user.email] : undefined,
  );
  const favoriteIds = favorites ?? [];
  const isFav = favoriteIds.includes(game.id);
  const navigate = useNavigate();

  const similar = GAMES.filter(
    (g) => g.id !== game.id && g.genres.some((x) => game.genres.includes(x)),
  ).slice(0, 4);
  const bundle = GAMES.filter((g) => g.id !== game.id).slice(0, 3);
  const recommend = GAMES.filter(
    (g) => g.id !== game.id && g.isBestseller,
  ).slice(0, 4);
  const getGameStats = useReviews((s) => s.getGameStats);
  const stats = getGameStats(id);
  const allReviews = useReviews((s) => s.reviews);
  const reviews = allReviews.filter((r) => r.gameId === game.id);
  const addReview = useReviews((s) => s.addReview);
  const alreadyReviewed = user
    ? reviews.some((r) => r.userEmail === user.email)
    : false;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-muted-foreground mb-6 flex gap-2 items-center">
        <Link to="/" className="hover:text-primary">
          Главная
        </Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-primary">
          Каталог
        </Link>
        <span>/</span>
        <span className="text-foreground">{game.title}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <button
            onClick={() => setLightbox(true)}
            className="relative aspect-square w-full rounded-3xl overflow-hidden bg-muted shadow-soft block"
          >
            <img
              src={game.images[imgIdx]}
              alt={game.title}
              className="w-full h-full object-cover"
            />
            {game.oldPrice && (
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-destructive text-destructive-foreground rounded-full text-sm font-bold">
                -
                {Math.round(
                  ((game.oldPrice - game.price) / game.oldPrice) * 100,
                )}
                %
              </span>
            )}
          </button>
          <div className="grid grid-cols-5 gap-2">
            {game.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition ${i === imgIdx ? "border-primary shadow-soft" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            {game.isBestseller && (
              <span className="px-2.5 py-1 text-xs font-bold rounded-full gradient-amber text-primary-foreground">
                ХИТ
              </span>
            )}
            {game.isNew && (
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-foreground text-background">
                NEW
              </span>
            )}
            <span className="text-sm text-muted-foreground">
              {game.publisher}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{game.title}</h1>
          {game.subtitle && (
            <p className="text-lg text-muted-foreground mb-4">
              {game.subtitle}
            </p>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-5 h-5 ${s <= Math.round(stats.rating) ? "fill-primary text-primary" : "text-muted"}`}
                />
              ))}
              <span className="ml-2 font-bold">{stats.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {stats.reviewCount} отзывов
            </span>
          </div>

          <p className="text-foreground/80 mb-6">{game.shortDescription}</p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              {
                icon: Users,
                label: "Игроки",
                val: `${game.playersMin}–${game.playersMax}`,
              },
              {
                icon: Clock,
                label: "Время",
                val: `${game.playTimeMin}–${game.playTimeMax} мин`,
              },
              { icon: Award, label: "Возраст", val: `${game.ageMin}+` },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-4 text-center"
              >
                <s.icon className="w-5 h-5 mx-auto text-primary mb-1.5" />
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="font-bold">{s.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <div className="flex items-end gap-3 mb-5">
              <div className="text-4xl font-extrabold">
                {game.price.toLocaleString("ru-RU")} руб
              </div>
              {game.oldPrice && (
                <div className="text-lg text-muted-foreground line-through mb-1">
                  {game.oldPrice.toLocaleString("ru-RU")} руб
                </div>
              )}
              <div className="ml-auto text-sm">
                {game.inStock ? (
                  <span className="text-green-600 font-semibold">
                    В наличии
                  </span>
                ) : (
                  <span className="text-destructive">Нет в наличии</span>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center bg-muted rounded-xl">
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    if (!user) {
                      navigate({ to: "/login" });
                      return;
                    }

                    setCartQty(user.email, game.id, Math.max(1, qty - 1));
                  }}
                  className="p-3 hover:bg-accent rounded-l-xl"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <span className="px-4 font-bold w-10 text-center">{qty}</span>

                <button
                  onClick={(e) => {
                    e.preventDefault();

                    if (!user) {
                      navigate({ to: "/login" });
                      return;
                    }

                    setCartQty(user.email, game.id, Math.max(1, qty + 1));
                  }}
                  className="p-3 hover:bg-accent rounded-r-xl"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();

                  if (!user) {
                    navigate({ to: "/login" });
                    return;
                  }

                  addCart(user.email, game.id, 1);
                }}
                disabled={!game.inStock}
                className="flex-1 py-3 px-6 rounded-xl gradient-amber text-primary-foreground font-bold hover:shadow-glow transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart className="w-5 h-5" /> В корзину
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();

                  if (!user) {
                    navigate({ to: "/login" });
                    return;
                  }

                  fav.toggle(user.email, game.id);
                }}
                className="p-3 rounded-xl border border-border hover:bg-accent transition"
                aria-label="В избранное"
              >
                <Heart
                  className={`w-5 h-5 ${isFav ? "fill-destructive text-destructive" : ""}`}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Truck className="w-4 h-4 text-primary" /> Доставка завтра
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" /> Гарантия качества
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-2 border-b border-border mb-6 overflow-x-auto">
          {(
            [
              ["desc", "Описание"],
              ["specs", "Характеристики"],
              ["rules", "Правила"],
              ["reviews", `Отзывы (${reviews.length})`],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k as typeof tab)}
              className={`px-5 py-3 font-semibold whitespace-nowrap border-b-2 transition ${
                tab === k
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="animate-fade-in">
          {tab === "desc" && (
            <p className="text-foreground/80 leading-relaxed max-w-3xl">
              {game.description}
            </p>
          )}
          {tab === "specs" && (
            <dl className="grid sm:grid-cols-2 gap-x-8 max-w-3xl">
              {[
                ["Издатель", game.publisher],
                ["Жанры", game.genres.join(", ")],
                ["Кол-во игроков", `${game.playersMin}–${game.playersMax}`],
                ["Возраст", `${game.ageMin}+`],
                ["Время партии", `${game.playTimeMin}–${game.playTimeMax} мин`],
                ["В наличии", game.inStock ? "Да" : "Нет"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between py-3 border-b border-border"
                >
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-semibold text-right">{v}</dd>
                </div>
              ))}
            </dl>
          )}
          {tab === "rules" && (
            <div className="prose max-w-3xl text-foreground/80 space-y-3">
              <p>
                Базовые правила игры включают подготовку поля, раздачу
                компонентов и по очереди ход каждого игрока.
              </p>
              <p>
                Полные правила прилагаются в коробке. Средняя длительность
                партии — {game.playTimeMin}–{game.playTimeMax} минут.
              </p>
            </div>
          )}
          {tab === "reviews" && (
            <div className="max-w-3xl space-y-6">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-card border border-border rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold">{r.userName}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(r.createdAt).toLocaleDateString("ru-RU")}
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-foreground/80">{r.text}</p>
                </div>
              ))}

              {alreadyReviewed ? (
                <div className="bg-muted rounded-2xl p-4 text-sm">
                  Вы уже оставили отзыв
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    if (!user) {
                      navigate({ to: "/login" });
                      return;
                    }

                    if (!reviewText.trim()) return;

                    addReview(
                      game.id,
                      user.email,
                      user.name,
                      reviewRating,
                      reviewText,
                    );

                    setReviewText("");
                    setReviewRating(5);
                  }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <h3 className="font-bold text-lg mb-4">Оставить отзыв</h3>
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setReviewRating(s)}
                      >
                        <Star
                          className={`w-6 h-6 ${s <= reviewRating ? "fill-primary text-primary" : "text-muted"}`}
                        />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Поделитесь впечатлением..."
                    required
                    rows={4}
                    className="w-full p-3 rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="submit"
                    className="mt-3 px-6 py-2.5 rounded-xl gradient-amber text-primary-foreground font-bold"
                  >
                    Отправить
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      {[
        { title: "Похожие игры", items: similar },
        { title: "Часто покупают вместе", items: bundle },
        { title: "Рекомендуем", items: recommend },
      ].map(
        (sec) =>
          sec.items.length > 0 && (
            <section key={sec.title} className="mt-16">
              <h2 className="text-2xl font-bold mb-6">{sec.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {sec.items.map((g) => (
                  <GameCard key={g.id} game={g} />
                ))}
              </div>
            </section>
          ),
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(false)}
        >
          <button className="absolute top-6 right-6 text-white p-2">
            <X className="w-6 h-6" />
          </button>
          <img
            src={game.images[imgIdx]}
            alt=""
            className="max-w-full max-h-full rounded-2xl"
          />
        </div>
      )}
    </div>
  );
}
