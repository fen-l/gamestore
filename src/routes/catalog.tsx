import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { GAMES, GENRES, PUBLISHERS } from "@/data/games";
import { GameCard } from "@/components/GameCard";
import { Link } from "@tanstack/react-router";
import { useReviews } from "@/store/useReviews";

type CatalogSearch = {
  q?: string;
  filter?: "new" | "hit" | "sale";
};

export const Route = createFileRoute("/catalog")({
  validateSearch: (s: Record<string, unknown>): CatalogSearch => ({
    q: typeof s.q === "string" ? s.q : undefined,
    filter:
      s.filter === "new" || s.filter === "hit" || s.filter === "sale"
        ? s.filter
        : undefined,
  }),
  component: CatalogPage,
  head: () => ({
    meta: [
      { title: "Каталог настольных игр — МирИгр" },
      {
        name: "description",
        content: "Полный каталог настольных игр с фильтрами и сортировкой",
      },
    ],
  }),
});

function CatalogPage() {
  const { q, filter } = Route.useSearch();
  const [search, setSearch] = useState(q ?? "");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [players, setPlayers] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(500);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedPubs, setSelectedPubs] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("popular");
  const [visible, setVisible] = useState(8);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const getGameStats = useReviews((s) => s.getGameStats);

  const filtered = useMemo(() => {
    let res = GAMES.filter((g) => {
      if (filter === "new" && !g.isNew) return false;
      if (filter === "hit" && !g.isBestseller) return false;
      if (filter === "sale" && !g.oldPrice) return false;
      if (search && !g.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (
        selectedGenres.length &&
        !selectedGenres.some((x) => g.genres.includes(x))
      )
        return false;
      if (players && (g.playersMin > players || g.playersMax < players))
        return false;
      if (age && g.ageMin > age) return false;
      if (g.price > priceMax) return false;
      const stats = getGameStats(g.id);

      if (stats.rating < minRating) return false;
      return !(selectedPubs.length && !selectedPubs.includes(g.publisher));
    });
    if (sort === "price-asc") res = [...res].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") res = [...res].sort((a, b) => b.price - a.price);
    if (sort === "rating") {
      res = [...res].sort((a, b) => {
        const aRating = useReviews.getState().getGameStats(a.id).rating;
        const bRating = useReviews.getState().getGameStats(b.id).rating;

        return bRating - aRating;
      });
    }
    if (sort === "new") res = [...res].sort((a) => (a.isNew ? -1 : 1));
    return res;
  }, [
    filter,
    search,
    selectedGenres,
    players,
    age,
    priceMax,
    minRating,
    selectedPubs,
    sort,
  ]);

  const toggleArr = (arr: string[], v: string, set: (v: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const reset = () => {
    setSearch("");
    setSelectedGenres([]);
    setPlayers(0);
    setAge(0);
    setPriceMax(12000);
    setMinRating(0);
    setSelectedPubs([]);
  };

  const Filters = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-bold mb-2 block">Поиск</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Название игры"
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-bold mb-2 block">Подборки</label>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/catalog"
            search={(prev) => ({
              ...prev,
              filter: undefined,
            })}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
              !filter
                ? "gradient-amber text-primary-foreground"
                : "bg-muted hover:bg-accent"
            }`}
          >
            Все
          </Link>

          <Link
            to="/catalog"
            search={(prev) => ({
              ...prev,
              filter: "new",
            })}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
              filter === "new"
                ? "gradient-amber text-primary-foreground"
                : "bg-muted hover:bg-accent"
            }`}
          >
            Новинки
          </Link>

          <Link
            to="/catalog"
            search={(prev) => ({
              ...prev,
              filter: "hit",
            })}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
              filter === "hit"
                ? "gradient-amber text-primary-foreground"
                : "bg-muted hover:bg-accent"
            }`}
          >
            Хиты
          </Link>

          <Link
            to="/catalog"
            search={(prev) => ({
              ...prev,
              filter: "sale",
            })}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
              filter === "sale"
                ? "gradient-amber text-primary-foreground"
                : "bg-muted hover:bg-accent"
            }`}
          >
            Скидки
          </Link>
        </div>
      </div>
      <div>
        <label className="text-sm font-bold mb-2 block">Жанры</label>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => toggleArr(selectedGenres, g, setSelectedGenres)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                selectedGenres.includes(g)
                  ? "gradient-amber text-primary-foreground"
                  : "bg-muted hover:bg-accent"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-bold mb-2 block">
          Кол-во игроков {players ? `: ${players}` : ""}
        </label>
        <input
          type="range"
          min={0}
          max={10}
          value={players}
          onChange={(e) => setPlayers(+e.target.value)}
          className="w-full accent-primary"
        />
      </div>

      <div>
        <label className="text-sm font-bold mb-2 block">
          Возраст {age ? `: ${age}+` : ""}
        </label>
        <input
          type="range"
          min={0}
          max={18}
          value={age}
          onChange={(e) => setAge(+e.target.value)}
          className="w-full accent-primary"
        />
      </div>

      <div>
        <label className="text-sm font-bold mb-2 block">
          Цена до: {priceMax.toLocaleString("ru-RU")} руб
        </label>
        <input
          type="range"
          min={20}
          max={500}
          step={5}
          value={priceMax}
          onChange={(e) => setPriceMax(+e.target.value)}
          className="w-full accent-primary"
        />
      </div>

      <div>
        <label className="text-sm font-bold mb-2 block">Рейтинг от</label>
        <div className="flex gap-1.5">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium ${minRating === r ? "gradient-amber text-primary-foreground" : "bg-muted hover:bg-accent"}`}
            >
              {r === 0 ? "Все" : `${r}★`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-bold mb-2 block">Издатель</label>
        <div className="space-y-1.5 max-h-40 overflow-y-auto">
          {PUBLISHERS.map((p) => (
            <label
              key={p}
              className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary"
            >
              <input
                type="checkbox"
                checked={selectedPubs.includes(p)}
                onChange={() => toggleArr(selectedPubs, p, setSelectedPubs)}
                className="accent-primary"
              />
              {p}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={reset}
        className="w-full py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-accent transition"
      >
        Сбросить фильтры
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">
          {filter === "new"
            ? "Новинки"
            : filter === "hit"
              ? "Хиты продаж"
              : filter === "sale"
                ? "Акции"
                : "Каталог игр"}
        </h1>
        <p className="text-muted-foreground mt-2">Найдено: {filtered.length}</p>
      </div>

      <div className="lg:grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 bg-card rounded-2xl p-6 border border-border shadow-soft">
            {Filters}
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6 gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border text-sm font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4" /> Фильтры
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="ml-auto px-4 py-2 rounded-xl bg-card border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="popular">По популярности</option>
              <option value="price-asc">Цена ↑</option>
              <option value="price-desc">Цена ↓</option>
              <option value="rating">По рейтингу</option>
              <option value="new">Сначала новинки</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Ничего не найдено
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.slice(0, visible).map((g) => (
                  <GameCard key={g.id} game={g} />
                ))}
              </div>
              {visible < filtered.length && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setVisible((v) => v + 8)}
                    className="px-8 py-3 rounded-2xl gradient-amber text-primary-foreground font-bold shadow-soft hover:shadow-glow transition"
                  >
                    Загрузить ещё
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-background overflow-y-auto p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Фильтры</h3>
              <button onClick={() => setFiltersOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            {Filters}
          </div>
        </div>
      )}
    </div>
  );
}
