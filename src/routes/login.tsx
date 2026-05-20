import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useProfile } from "../store/useProfile";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const auth = useProfile.getState();

    if (auth.user) {
      throw redirect({
        to: "/profile",
      });
    }
  },

  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const login = useProfile((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Вход</h1>

      <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-soft">
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();

            const success = login(email, password);

            if (!success) {
              setError("Неверный email или пароль");
              return;
            }

            navigate({ to: "/profile" });
          }}
        >
          <div>
            <label className="text-sm font-semibold mb-1.5 block">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-4 py-2.5 rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-1.5 block">Пароль</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-4 py-2.5 rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="text-sm text-destructive font-medium">{error}</div>
          )}

          <button className="w-full px-6 py-3 rounded-xl gradient-amber text-primary-foreground font-bold">
            Войти
          </button>
        </form>

        <p className="text-sm text-muted-foreground mt-5 text-center">
          Нет аккаунта?{" "}
          <a
            href="/register"
            className="text-primary font-semibold hover:underline"
          >
            Зарегистрироваться
          </a>
        </p>
      </div>
    </div>
  );
}
