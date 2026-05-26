import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/warranty")({
  component: WarrantyPage,
  head: () => ({
    meta: [
      { title: "Каталог настольных игр — МирИгр" },
      {
        name: "description",
        content: "Гарантии",
      },
    ],
  }),
});

function WarrantyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Гарантия</h1>

      <div className="space-y-6 text-muted-foreground leading-8">
        <p>
          Интернет-магазин «МирИгр» предоставляет гарантию на реализуемые настольные игры в
          соответствии с законодательством Республики Беларусь.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            На что распространяется гарантия
          </h2>

          <p>
            Гарантия распространяется на производственные дефекты товара: повреждённые игровые
            компоненты, отсутствие деталей, брак печати, дефекты игровых элементов и иные
            недостатки, возникшие не по вине покупателя.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Что не является гарантийным случаем
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>естественный износ компонентов;</li>
            <li>механические повреждения после передачи товара;</li>
            <li>повреждения вследствие неправильного хранения;</li>
            <li>утрата отдельных компонентов по вине покупателя.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Порядок обращения</h2>

          <p>
            Для рассмотрения гарантийного обращения необходимо предоставить фотографию дефекта,
            описание проблемы и подтверждение покупки.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Защита прав потребителей</h2>

          <p>
            Все спорные ситуации рассматриваются в соответствии с Законом Республики Беларусь «О
            защите прав потребителей».
          </p>
        </section>
      </div>
    </div>
  );
}
