import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/payment")({
  component: PaymentPage,
  head: () => ({
    meta: [
      { title: "Каталог настольных игр — МирИгр" },
      {
        name: "description",
        content: "Оплата товара",
      },
    ],
  }),
});

function PaymentPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Оплата</h1>

      <div className="space-y-6 text-muted-foreground leading-8">
        <p>
          В интернет-магазине «МирИгр» доступны популярные способы оплаты,
          используемые на территории Республики Беларусь.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Банковские карты
          </h2>

          <p>
            К оплате принимаются карты VISA, MasterCard и Белкарт. Онлайн-оплата
            осуществляется через защищённый платёжный сервис.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">ЕРИП</h2>

          <p>
            Покупатели могут оплатить заказ через систему «Расчёт» (ЕРИП) в
            интернет-банкинге, мобильном приложении банка, инфокиоске или кассе
            банка.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Оплата при получении
          </h2>

          <p>
            Для отдельных способов доставки доступна оплата наличными или картой
            при получении заказа.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Безопасность платежей
          </h2>

          <p>
            Все платёжные операции осуществляются через защищённые соединения с
            использованием современных методов шифрования данных.
          </p>
        </section>
      </div>
    </div>
  );
}
