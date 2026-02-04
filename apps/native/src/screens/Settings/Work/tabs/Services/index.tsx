import { EntityList } from "@/screens/settings/Work/tabs/components/EntityList";
import { ServiceForm } from "@/screens/settings/Work/tabs/Services/components/ServiceForm";
import { Service } from "@/screens/settings/Work/tabs/Services/Services.types";
import { createEntityOperations } from "@/screens/settings/Work/tabs/utils/createEntityOperations";
import { services as mockServices } from "@/screens/test-store";
import { FC, useMemo, useState } from "react";

export const ServiceList: FC = () => {
  const [services, setServices] = useState<Service[]>(mockServices);

  const operations = useMemo(
    () =>
      createEntityOperations(setServices, (data) => ({
        ...data,
        id: Date.now().toString(),
      })),
    [setServices],
  );

  return (
    <EntityList<Service>
      entities={services}
      onCreate={operations.create}
      onUpdate={operations.update}
      onDelete={operations.remove}
      entityForm={ServiceForm}
      entityTitle="Управление услугами"
      entityDescription="Создайте услуги, которые будут доступны для записи."
      entityToCardProps={(s) => ({
        title: s.name,
        descriptionItems: [
          { label: "Длительность", value: `${s.duration} мин` },
          {
            label: "Перерыв",
            value: s.breakAfter ? `${s.breakAfter} мин` : "отсутствует",
          },
        ],
      })}
      deleteConfirmTitle="Удалить услугу?"
    />
  );
};
