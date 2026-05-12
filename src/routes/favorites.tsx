import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useFavorites } from "@/store/useStore";
import { GAMES } from "@/data/games";
import { GameCard } from "@/components/GameCard";

export const Route = createFileRoute("/favorites")({
  component: FavoritesPage,
  head: () => ({ meta: [{ title: "Избранное — МирИгр" }] }),
});

function FavoritesPage() {
  const ids = useFavorites((s) => s.ids);
  const favs = GAMES.filter((g) => ids.includes(g.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Избранное</h1>

      {favs.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto rounded-full gradient-amber-soft flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Здесь пока пусто</h2>
          <p className="text-muted-foreground mb-8">Сохраняйте понравившиеся игры, чтобы вернуться к ним позже</p>
          <Link to="/catalog" className="inline-block px-7 py-3.5 rounded-2xl gradient-amber text-primary-foreground font-bold shadow-soft hover:shadow-glow transition">
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {favs.map((g) => <GameCard key={g.id} game={g} />)}
        </div>
      )}
    </div>
  );
}
