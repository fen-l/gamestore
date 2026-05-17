import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star, Users, Clock } from "lucide-react";
import type { BoardGame } from "@/types";
import { useFavorites } from "@/store/useStore";
import { useProfile } from "../store/useProfile";
import { useCart } from "@/store/useCart";

export function GameCard({ game }: { game: BoardGame }) {
  const addCart = useCart((s) => s.add);
  const cartItems = useCart((s) => s.items);

  const fav = useFavorites();
  const isFav = fav.ids.includes(game.id);

  const navigate = useNavigate();
  const isAuth = useProfile((s) => s.isAuth);

  const inCartQty = cartItems.find((i) => i.gameId === game.id)?.quantity ?? 0;

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden card-hover border border-border animate-fade-in">
      <Link to="/product/$id" params={{ id: game.id }} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={game.images[0]}
            alt={game.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {game.isBestseller && (
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full gradient-amber text-primary-foreground shadow-soft">
                ХИТ
              </span>
            )}
            {game.isNew && (
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-foreground text-background shadow-soft">
                NEW
              </span>
            )}
            {game.oldPrice && (
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-destructive text-destructive-foreground shadow-soft">
                -
                {Math.round(
                  ((game.oldPrice - game.price) / game.oldPrice) * 100,
                )}
                %
              </span>
            )}
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();

          if (!isAuth) {
            navigate({ to: "/login" });
            return;
          }

          fav.toggle(game.id);
        }}
        className="absolute top-3 right-3 p-2.5 rounded-full bg-background/90 backdrop-blur-sm shadow-soft hover:scale-110 transition-transform"
        aria-label="В избранное"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${isFav ? "fill-destructive text-destructive" : "text-foreground"}`}
        />
      </button>

      <div className="p-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
          <span className="font-semibold text-foreground">{game.rating}</span>
          <span>({game.reviewCount})</span>
          <span className="ml-auto">{game.publisher}</span>
        </div>
        <Link to="/product/$id" params={{ id: game.id }}>
          <h3 className="font-bold text-base line-clamp-1 group-hover:text-primary transition-colors">
            {game.title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-1 min-h-8">
          {game.shortDescription}
        </p>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {game.playersMin}–{game.playersMax}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {game.playTimeMin}–{game.playTimeMax} мин
          </span>
          <span>{game.ageMin}+</span>
        </div>

        <div className="flex items-end justify-between mt-4">
          <div>
            <div className="text-lg font-bold">
              {game.price.toLocaleString("ru-RU")} руб
            </div>
            {game.oldPrice && (
              <div className="text-xs text-muted-foreground line-through">
                {game.oldPrice.toLocaleString("ru-RU")} руб
              </div>
            )}
          </div>
          <button
            onClick={() => {
              if (!isAuth) {
                navigate({ to: "/login" });
                return;
              }

              addCart(game.id);
            }}
            disabled={!game.inStock}
            className="p-2.5 rounded-xl gradient-amber text-primary-foreground hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="В корзину"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
