import { Link } from "@tanstack/react-router";
import { Dice5, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-amber flex items-center justify-center shadow-soft">
                <Dice5 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gradient">МирИгр</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Магазин настольных игр №1. Более 5000 игр для любой компании и возраста.
            </p>
            <div className="flex gap-2 mt-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg bg-background hover:bg-accent transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Магазин</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Каталог</Link></li>
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Новинки</Link></li>
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Хиты продаж</Link></li>
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Акции</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Покупателям</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Доставка</li>
              <li>Оплата</li>
              <li>Возврат</li>
              <li>Гарантия</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +7 (800) 000-00-00</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> hello@mirigr.ru</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Москва, ул. Игровая, 1</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} МирИгр. Все права защищены.</span>
          <span>Сделано с любовью к настолкам</span>
        </div>
      </div>
    </footer>
  );
}
