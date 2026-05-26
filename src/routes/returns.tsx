import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/returns")({
  component: ReturnsPage,
  head: () => ({
    meta: [
      { title: "Каталог настольных игр — МирИгр" },
      {
        name: "description",
        content: "Возврат товара",
      },
    ],
  }),
});

function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Возврат товара</h1>

      <div className="space-y-6 text-muted-foreground leading-8">
        <p>
          Возврат и обмен товаров осуществляется в соответствии с Законом Республики Беларусь «О
          защите прав потребителей».
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Возврат товара надлежащего качества
          </h2>

          <p>
            Покупатель вправе вернуть непродовольственный товар надлежащего качества в течение 14
            дней с момента передачи товара, если товар не был в употреблении, сохранены его
            потребительские свойства, фабричные ярлыки и упаковка.
          </p>

          <p>
            Настольные игры с нарушенной плёнкой, повреждённой упаковкой, отсутствующими
            компонентами или следами использования обмену и возврату не подлежат.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Возврат товара ненадлежащего качества
          </h2>

          <p>В случае обнаружения производственного дефекта покупатель вправе потребовать:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>замену товара;</li>
            <li>соразмерное уменьшение стоимости;</li>
            <li>безвозмездное устранение недостатков;</li>
            <li>возврат денежных средств.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Срок рассмотрения обращения
          </h2>

          <p>
            Обращения покупателей рассматриваются в сроки, установленные законодательством
            Республики Беларусь.
          </p>
        </section>
      </div>
    </div>
  );
}
