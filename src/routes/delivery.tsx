import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/delivery")({
  component: DeliveryPage,
  head: () => ({
    meta: [
      { title: "Каталог настольных игр — МирИгр" },
      {
        name: "description",
        content: "Доставка товара",
      },
    ],
  }),
});

function DeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Доставка</h1>

      <div className="space-y-6 text-muted-foreground leading-8">
        <p>
          Интернет-магазин «МирИгр» осуществляет доставку настольных игр по всей
          территории Республики Беларусь.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Способы доставки
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Курьерская доставка по Минску</li>
            <li>Доставка Европочтой</li>
            <li>Доставка Белпочтой</li>
            <li>Самовывоз из пункта выдачи</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Сроки доставки
          </h2>

          <p>
            Доставка по Минску осуществляется в течение 1–2 рабочих дней.
            Доставка по Беларуси занимает от 2 до 5 рабочих дней в зависимости
            от региона и выбранного способа доставки.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Стоимость доставки
          </h2>

          <p>
            Стоимость доставки рассчитывается автоматически при оформлении
            заказа. При заказе от 150 BYN доставка по Минску предоставляется
            бесплатно.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Проверка товара
          </h2>

          <p>
            При получении заказа покупатель обязан проверить комплектность,
            внешний вид упаковки и отсутствие механических повреждений.
          </p>
        </section>
      </div>
    </div>
  );
}
