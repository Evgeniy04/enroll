import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useConfirm } from '@/hooks/useConfirm';
import { EntityCard, EntityCardProps } from '@/screens/Settings/Work/tabs/components/EntityList/EntityCard';
import { FormDialog } from '@/screens/Settings/Work/tabs/components/FormDialog';
import { Plus } from 'lucide-react-native';
import { FC, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

export interface EntityManagerProps<T> {
  entities: T[];
  onCreate: (item: T) => void;
  onUpdate: (item: T) => void;
  onDelete: (id: string) => void;
  entityForm: FC<{ initialData: T | null; onSubmit: (item: T) => void }>;
  entityTitle: string;
  entityDescription?: string;
  entityToCardProps: (entity: T) => Omit<EntityCardProps, 'entityId' | 'onEdit' | 'onDelete'>;
  deleteConfirmTitle: string,
}

export const EntityList = <T extends { id: string }>({
  entities,
  onCreate,
  onUpdate,
  onDelete,
  entityForm: EntityForm,
  entityTitle,
  entityDescription,
  entityToCardProps,
  deleteConfirmTitle,
}: EntityManagerProps<T>) => {
  const { confirm, ConfirmDialogElement } = useConfirm();
  const [ activeEntity, setActiveEntity ] = useState<T | null>(null);
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);

  const handleCreate = useCallback((item: T) => {
    const newItem = { ...item, id: Date.now().toString() };
    onCreate(newItem);
  }, [onCreate]);

  const handleEdit = useCallback((id: string) => {
    const entity = entities.find(e => e.id === id);
    if (!entity) {
      console.error(`Entity with id ${id} not found`);
      return;
    }
    setActiveEntity(entity);
    setIsDialogOpen(true);
  }, [entities]);

  const handleUpdate = useCallback((item: T) => {
    onUpdate(item);
  }, [onUpdate]);

  const handleDelete = useCallback((id: string) => {
    confirm({
      title: deleteConfirmTitle,
      cancelText: 'Отменить',
      confirmText: 'Подтвердить',
      onConfirm: () => onDelete(id),
    });
  }, [confirm, deleteConfirmTitle, onDelete]);

  const handleDialogOpenChange = useCallback((open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setActiveEntity(null);
    }
  }, []);

  const handleFormSubmit = useCallback((data: T) => {
    if (activeEntity) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
    handleDialogOpenChange(false);
  }, [activeEntity, handleUpdate, handleCreate, handleDialogOpenChange]);

  const emptyState = useMemo(() => (
    <Card className="border-dashed gap-0">
      <Text className="text-center text-muted-foreground">
        Пока ничего нет
      </Text>
      <View className="flex-row justify-center items-center mt-2">
        <Text variant="muted">Нажмите</Text>
        <Text variant="code" className="px-2 ml-2">
          +
        </Text>
        <Text variant="muted">, чтобы создать</Text>
      </View>
    </Card>
  ), []);

  return (
    <>
      <Card>
        <CardHeader className="flex-row justify-between">
          <View className="flex-1">
            <CardTitle>{entityTitle}</CardTitle>
            {entityDescription && <CardDescription>{entityDescription}</CardDescription>}
          </View>

          <Button size="icon" onPress={() => setIsDialogOpen(true)}>
            <Icon as={Plus} className="text-primary-foreground" />
          </Button>
        </CardHeader>

        <CardContent className="gap-5">
          {entities.length === 0 ? emptyState : (
            entities.map(entity => 
              <EntityCard
                {...entityToCardProps(entity)}
                key={entity.id}
                entityId={entity.id}
                onEdit={() => handleEdit(entity.id)}
                onDelete={() => handleDelete(entity.id)}
              />
            )
          )}
        </CardContent>
      </Card>

      {<FormDialog<T>
        FormComponent={EntityForm}
        editingItem={activeEntity}
        open={isDialogOpen}
        onOpenChange={handleDialogOpenChange}
        onSubmit={handleFormSubmit}
      />}

      {ConfirmDialogElement}
    </>
  );
};