import { Template } from "@/screens/settings/Work/tabs/Templates/Templates.types";
import { TemplateForm } from "@/screens/settings/Work/tabs/Templates/components/TemplateForm";
import { TemplateSlotsEditor } from "@/screens/settings/Work/tabs/Templates/components/TemplateSlotsEditor";
import { EntityList } from "@/screens/settings/Work/tabs/components/EntityList";
import { createEntityOperations } from "@/screens/settings/Work/tabs/utils/createEntityOperations";
import { calculateTotalDuration } from "@/screens/settings/Work/tabs/utils/schedule";
import { templates as mockTemplates, services } from "@/screens/test-store";
import { FC, useState } from "react";

export const TemplateList: FC = () => {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);

  const operations = createEntityOperations(setTemplates, (data) => ({
    ...data,
    id: Date.now().toString(),
  }));

  return (
    <EntityList<Template>
      entities={templates}
      onCreate={operations.create}
      onUpdate={operations.update}
      onDelete={operations.remove}
      entityForm={TemplateForm}
      entityTitle="Управление шаблонами дня"
      entityDescription="Создайте и настройте шаблоны рабочего расписания."
      entityToCardProps={(t) => {
        const totalDuration = calculateTotalDuration(t.slots, services);

        return {
          title: t.name,
          descriptionItems: [
            { label: "Слоты", value: `${t.slots.length} шт.` },
            {
              label: "Длительность",
              value: `${Math.floor(totalDuration / 60)} ч ${totalDuration % 60} мин`,
            },
          ],
        };
      }}
      renderDetails={(template) => (
        <TemplateSlotsEditor
          template={template}
          services={services}
          onChange={operations.update}
        />
      )}
      deleteConfirmTitle="Удалить шаблон?"
    />
  );
};
