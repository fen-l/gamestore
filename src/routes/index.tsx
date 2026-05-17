import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Truck,
  Shield,
  Gift,
  Headphones,
  Star,
  ChevronLeft,
  ChevronRight,
  Dice5,
  Users,
  Trophy,
  Sparkles,
} from "lucide-react";
import { GAMES } from "@/data/games";
import { GameCard } from "@/components/GameCard";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const HERO_SLIDES = [
  {
    title: "Откройте мир приключений",
    subtitle: "Тысячи настольных игр для незабываемых вечеров",
    cta: "В каталог",
    bg: "from-amber-300 via-yellow-400 to-orange-400",
  },
  {
    title: "Скидки до -40%",
    subtitle: "Лучшие игры по специальным ценам",
    cta: "Смотреть акции",
    bg: "from-yellow-200 via-amber-300 to-yellow-500",
  },
  {
    title: "Новинки сезона",
    subtitle: "Свежие хиты, которые покорят вашу компанию",
    cta: "Открыть",
    bg: "from-orange-300 via-amber-400 to-yellow-300",
  },
];

const GENRE_CARDS = [
  {
    name: "Стратегии",
    icon: Trophy,
    count: 124,
    color: "from-amber-400 to-orange-500",
  },
  {
    name: "Семейные",
    icon: Users,
    count: 287,
    color: "from-yellow-300 to-amber-400",
  },
  {
    name: "Вечериночные",
    icon: Sparkles,
    count: 96,
    color: "from-orange-300 to-yellow-400",
  },
  {
    name: "Кооперативные",
    icon: Dice5,
    count: 73,
    color: "from-amber-300 to-yellow-500",
  },
];

const TESTIMONIALS = [
  {
    name: "Елена С.",
    text: "Заказывала уже 3 раза — всё приходит быстро и в идеальной упаковке. Рекомендую!",
    rating: 5,
  },
  {
    name: "Алексей П.",
    text: "Огромный выбор и адекватные цены. Консультанты помогли подобрать игру для компании.",
    rating: 5,
  },
  {
    name: "Дарья К.",
    text: "Лучший магазин настолок! Отзывы помогают определиться с выбором.",
    rating: 5,
  },
  {
    name: "Михаил В.",
    text: "Привезли за день, всё отлично. Будем брать еще.",
    rating: 5,
  },
];

function HomePage() {
  const [slide, setSlide] = useState(0);
  const [testIdx, setTestIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setSlide((s) => (s + 1) % HERO_SLIDES.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  const bestsellers = GAMES.filter((g) => g.isBestseller).slice(0, 8);
  const newGames = GAMES.filter((g) => g.isNew).slice(0, 4);

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative h-110 sm:h-130 rounded-3xl overflow-hidden shadow-glow">
          {HERO_SLIDES.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-linear-to-br ${s.bg} transition-opacity duration-1000 ${
                i === slide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent)]" />
              <div className="relative h-full flex flex-col justify-center px-8 sm:px-16 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-sm text-white text-sm font-medium w-fit mb-6 animate-slide-up">
                  <Sparkles className="w-4 h-4" /> Доставка по всей России
                </div>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-lg mb-4 animate-slide-up">
                  {s.title}
                </h1>
                <p className="text-lg sm:text-xl text-white/95 mb-8 animate-slide-up">
                  {s.subtitle}
                </p>
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-amber-700 font-bold shadow-soft hover:scale-105 transition-transform w-fit"
                >
                  {s.cta} <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}

          <button
            onClick={() =>
              setSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/30 backdrop-blur text-white hover:bg-white/50 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSlide((s) => (s + 1) % HERO_SLIDES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/30 backdrop-blur text-white hover:bg-white/50 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all ${i === slide ? "w-8 bg-white" : "w-2 bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Genres */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Популярные жанры</h2>
            <p className="text-muted-foreground mt-2">Найдите игры по душе</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {GENRE_CARDS.map((g, i) => (
            <Link
              key={g.name}
              to="/catalog"
              className={`group relative overflow-hidden rounded-2xl p-6 h-44 bg-linear-to-br ${g.color} card-hover animate-slide-up`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition">
                <g.icon className="w-32 h-32 text-white" />
              </div>
              <div className="relative">
                <g.icon className="w-8 h-8 text-white mb-3" />
                <h3 className="text-xl font-bold text-white">{g.name}</h3>
                <p className="text-white/80 text-sm mt-1">{g.count} игр</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Хиты продаж</h2>
            <p className="text-muted-foreground mt-2">
              Самые любимые игры наших покупателей
            </p>
          </div>
          <Link
            to="/catalog"
            className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
          >
            Все игры <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {bestsellers.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      </section>

      {/* New */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold">Новинки</h2>
          <Link
            to="/catalog"
            className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
          >
            Смотреть все <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {newGames.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-amber-soft rounded-3xl p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Почему выбирают нас
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Truck,
                title: "Быстрая доставка",
                desc: "По Москве в день заказа",
              },
              {
                icon: Shield,
                title: "Гарантия качества",
                desc: "Только оригинальные игры",
              },
              {
                icon: Gift,
                title: "Подарок к заказу",
                desc: "От 115 руб — приятный бонус",
              },
              {
                icon: Headphones,
                title: "Поддержка 24/7",
                desc: "Поможем с выбором",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl p-6 text-center card-hover animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto rounded-2xl gradient-amber flex items-center justify-center mb-4 shadow-soft">
                  <b.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Отзывы клиентов
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-card rounded-3xl p-8 sm:p-12 shadow-soft border border-border min-h-55">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: TESTIMONIALS[testIdx].rating }).map(
                (_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ),
              )}
            </div>
            <p className="text-lg italic text-foreground/90 mb-6">
              «{TESTIMONIALS[testIdx].text}»
            </p>
            <div className="font-bold">{TESTIMONIALS[testIdx].name}</div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestIdx(i)}
                className={`h-2 rounded-full transition-all ${i === testIdx ? "w-8 bg-primary" : "w-2 bg-border"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SEO text */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-muted-foreground leading-relaxed space-y-3">
        <h2 className="text-xl font-bold text-foreground">
          Магазин настольных игр МирИгр
        </h2>
        <p>
          Добро пожаловать в МирИгр — крупнейший онлайн-магазин настольных игр в
          России. У нас вы найдёте более 5000 наименований для любого возраста и
          компании: классические семейные игры, глубокие стратегии, динамичные
          вечериночные и захватывающие кооперативные приключения.
        </p>
        <p>
          Мы тщательно подбираем ассортимент и работаем напрямую с издателями,
          поэтому гарантируем оригинальность и качество каждой игры. Удобная
          навигация, честные отзывы и подробные карточки помогут выбрать именно
          ту настолку, которая подарит часы радости.
        </p>
      </section>
    </div>
  );
}
