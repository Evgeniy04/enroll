import { Template } from '@/screens/Settings/Work/tabs/Templates/Templates.types';
import { TemplateForm } from '@/screens/Settings/Work/tabs/Templates/components/TemplateForm';
import { EntityList } from '@/screens/Settings/Work/tabs/components/EntityList';
import { createEntityOperations } from '@/screens/Settings/Work/tabs/utils/createEntityOperations';
import { templates as mockTemplates } from '@/screens/test-store';
import { FC, useMemo, useState } from "react";

export const TemplateList: FC = () => {
  const [ templates, setTemplates ] = useState<Template[]>(mockTemplates);

  const operations = useMemo(() => createEntityOperations(setTemplates), []);

  return (
    <EntityList<Template>
      entities={templates}
      onCreate={operations.create}
      onUpdate={operations.update}
      onDelete={operations.remove}
      entityForm={TemplateForm}
      entityTitle="Управление шаблонами дня"
      entityDescription="Создавайте и настраивайте шаблоны рабочего расписания."
      entityToCardProps={t => ({
        title: t.name,
        descriptionItems: [
          { label: 'Слоты', value: `${t.slots.length} шт.` },
          { label: 'Длительность', value: '2 ч 40 мин' },
        ],
      })}
      deleteConfirmTitle="Удалить шаблон?"
    />
  );
};