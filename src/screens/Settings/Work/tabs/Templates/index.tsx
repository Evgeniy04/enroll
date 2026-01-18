import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useConfirm } from '@/hooks/useConfirm';
import { TemplateCard } from '@/screens/Settings/Work/tabs/Templates/components/TemplateCard';
import { TemplateFormDialog } from '@/screens/Settings/Work/tabs/Templates/components/TemplateFormDialog';
import { templates as mockTemplates } from '@/screens/test-store';
import { FC, useState } from "react";
import { View } from 'react-native';
import { Template } from './Templates.types';

export const ScheduleBuilder: FC = () => {
  const { confirm, ConfirmDialogElement } = useConfirm();
  const [ templates, setTemplates ] = useState<Template[]>(mockTemplates);
  const [ activeTemplate, setActiveTemplate ] = useState<Template | null>(null);
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);

  const createTemplate = (template: Template) => {
    const newTemplate: Template = { ...template, id: Date.now().toString() };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const editTemplate = (id: string) => {
    const templateToEdit = templates.find(s => s.id === id);
    if (!templateToEdit) return;

    setActiveTemplate(templateToEdit);
    setIsDialogOpen(true);
  };

  const updateTemplate = (updatedTemplate: Template) => {
    setTemplates(prev =>
      prev.map(s => (s.id === updatedTemplate.id ? updatedTemplate : s))
    );
    setActiveTemplate(null);
  };

  const removeTemplate = (id: string) => {
    setTemplates(prev => prev.filter(s => s.id !== id));
  };

  const confirmDeleteTemplate = (id: string) => {
    confirm({
      title: 'Удалить шаблон?',
      cancelText: 'Отменить',
      confirmText: 'Подтвердить',
      onConfirm: () => removeTemplate(id),
    });
  };

  const handleDialogToggle = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) setActiveTemplate(null);
  };

  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <View className="flex-1">
          <CardTitle>Управление шаблонами дня</CardTitle>
          <CardDescription>
            Создавайте и настраивайте шаблоны рабочего расписания.
          </CardDescription>
        </View>
        
        <TemplateFormDialog
          open={isDialogOpen}
          editingTemplate={activeTemplate}
          onCreate={createTemplate}
          onUpdate={updateTemplate}
          onOpenChange={handleDialogToggle}
        />
      </CardHeader>

      <CardContent className="gap-5">
        {templates.length === 0 ? (
          <Card className="flex-row justify-center items-center border-dashed gap-0">
            <Text variant="muted" className="text-center text-muted-foreground">
              Создайте первый шаблон, нажав
            </Text>
            <Text variant="code" className="px-2 ml-2">+</Text>
          </Card>
        ) : (
          templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onEdit={() => editTemplate(template.id)}
              onDelete={() => confirmDeleteTemplate(template.id)}
            />
          ))
        )}
      </CardContent>

      {ConfirmDialogElement}
    </Card>
  );
};