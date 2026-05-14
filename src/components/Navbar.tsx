import { Link, useNavigate } from "@tanstack/react-router";
import {
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  Sun,
  Moon,
  Dice5,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCart, useFavorites, useTheme } from "@/store/useStore";
import { GAMES } from "@/data/games";
import { useProfile } from "@/store/profile";

export function Navbar() {
  const cartItems = useCart((s) => s.items);
  const favIds = useFavorites((s) => s.ids);
  const theme = useTheme((s) => s.theme);
  const toggleTheme = useTheme((s) => s.toggle);
  const initTheme = useTheme((s) => s.init);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const isAuth = useProfile((s) => s.isAuth);
  const user = useProfile((s) => s.user);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  const cartCount = cartItems.reduce((a, i) => a + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => {
    const g = GAMES.find((g) => g.id === i.gameId);
    return sum + (g ? g.price * i.quantity : 0);
  }, 0);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/catalog", search: { q: query } as never });
    setOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Главная" },
    { to: "/catalog", label: "Каталог" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3 gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-amber flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
              <Dice5 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">
              МирИгр
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground transition-colors"
                activeProps={{ className: "bg-accent text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <form
            onSubmit={submitSearch}
            className="hidden md:flex flex-1 max-w-xs relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск игр..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-muted border border-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30 text-sm transition-all"
            />
          </form>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Переключить тему"
              className="p-2.5 rounded-xl hover:bg-accent transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <Link
              to="/favorites"
              className="relative p-2.5 rounded-xl hover:bg-accent transition-colors"
            >
              <Heart className="w-5 h-5" />
              {favIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full gradient-amber text-[11px] font-bold text-primary-foreground flex items-center justify-center animate-scale-in">
                  {favIds.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl hover:bg-accent transition-colors flex items-center gap-2"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full gradient-amber text-[11px] font-bold text-primary-foreground flex items-center justify-center animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </div>
              {cartTotal > 0 && (
                <span className="hidden xl:inline text-sm font-semibold">
                  {cartTotal.toLocaleString("ru-RU")} ₽
                </span>
              )}
            </Link>
            {isAuth ? (
              <>
                <Link
                  to="/profile"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-accent transition"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {user?.name ?? "Профиль"}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-accent transition"
                >
                  <User className="w-5 h-5" />
                  Войти
                </Link>

                <Link
                  to="/register"
                  className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl gradient-amber text-primary-foreground text-sm font-semibold"
                >
                  <UserPlus className="w-4 h-4" />
                  Регистрация
                </Link>
              </>
            )}

            <button
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-accent transition-colors"
              aria-label="Меню"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <form onSubmit={submitSearch} className="md:hidden mb-3 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск игр..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-muted text-sm focus:outline-none"
              />
            </form>
            <nav className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 rounded-lg hover:bg-accent text-sm font-medium"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/favorites"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-lg hover:bg-accent text-sm font-medium"
              >
                Избранное
              </Link>
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-lg hover:bg-accent text-sm font-medium"
              >
                Корзина
              </Link>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-lg hover:bg-accent text-sm font-medium"
              >
                Профиль
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
