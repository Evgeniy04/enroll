import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useConfirm } from "@/hooks/useConfirm";
import { EntityCard } from "@/screens/settings/Work/tabs/components/EntityList/EntityCard";
import {
  FormDialog,
  FormProps,
} from "@/screens/settings/Work/tabs/components/FormDialog";
import { Plus } from "lucide-react-native";
import { FC, useState } from "react";
import { View } from "react-native";

type ActiveState<T> =
  | { type: "dialog"; entity: T | null }
  | { type: "card"; entityId: string }
  | { type: null };

interface EntityListProps<T> extends Omit<FormProps<T>, "initialData"> {
  entities: T[];
  onDelete: (id: string) => void;
  entityForm: FC<FormProps<T>>;
  entityTitle: string;
  entityDescription?: string;
  entityToCardProps: (entity: T) => {
    title: string;
    descriptionItems?: { label: string; value: string }[];
  };
  renderDetails?: (entity: T) => React.ReactNode;
  deleteConfirmTitle: string;
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
  renderDetails,
  deleteConfirmTitle,
}: EntityListProps<T>) => {
  const { confirm, ConfirmDialogElement } = useConfirm();
  const [activeState, setActiveState] = useState<ActiveState<T>>({
    type: null,
  });

  /**
   * Обрабатывает нажатие по карточке сущности.
   */
  const handleCardOpenChange = (entityId: string, open: boolean) => {
    setActiveState((prev) => {
      if (!open) return { type: null };
      if (prev.type === "card" && prev.entityId === entityId) {
        return { type: null };
      }
      return { type: "card", entityId };
    });
  };

  /**
   * Обрабатывает нажатие кнопки редактировать в карточке сущности.
   */
  const handleEditEntity = (id: string) => {
    const entity = entities.find((e) => e.id === id) ?? null;
    setActiveState({ type: "dialog", entity });
  };

  /**
   * Обрабатывает нажатие кнопки "создать" сущность.
   */
  const handleCreate = () => {
    setActiveState({ type: "dialog", entity: null });
  };

  /**
   * Обрабатывает закрытие диалога формы редактирования/создания сущности.
   */
  const handleDialogOpenChange = (open: boolean) => {
    if (!open) setActiveState({ type: null });
  };

  /**
   * Обрабатывает нажатие кнопки удалить,
   * выводит диалог подтверждения удаления.
   */
  const handleDelete = (id: string) => {
    confirm({
      title: deleteConfirmTitle,
      cancelText: "Отменить",
      confirmText: "Подтвердить",
      onConfirm: () => onDelete(id),
    });
  };

  return (
    <>
      <View className="gap-6">
        <Card className="bg-accent">
          <CardHeader className="flex-row justify-between">
            <View className="flex-1">
              <CardTitle>{entityTitle}</CardTitle>
              {entityDescription && (
                <CardDescription>{entityDescription}</CardDescription>
              )}
            </View>

            <Button size="icon" onPress={handleCreate}>
              <Icon as={Plus} className="text-primary-foreground" />
            </Button>
          </CardHeader>
        </Card>

        <View className="gap-3">
          {entities.length === 0 ? (
            <EmptyState
              message="Пока ничего нет"
              hint={
                <View className="mt-2 flex-row items-center justify-center">
                  <Text variant="muted" className="text-muted-foreground">
                    Нажмите
                  </Text>
                  <Text variant="code" className="ml-2 px-2">
                    +
                  </Text>
                  <Text variant="muted" className="text-muted-foreground">
                    , чтобы создать
                  </Text>
                </View>
              }
            />
          ) : (
            entities.map((entity) => (
              <EntityCard
                key={entity.id}
                entityId={entity.id}
                {...entityToCardProps(entity)}
                open={
                  activeState.type === "card" &&
                  activeState.entityId === entity.id
                }
                onOpenChange={(open) => handleCardOpenChange(entity.id, open)}
                onEdit={handleEditEntity}
                onDelete={handleDelete}
              >
                {renderDetails?.(entity)}
              </EntityCard>
            ))
          )}
        </View>
      </View>

      <FormDialog<T>
        FormComponent={EntityForm}
        editingItem={activeState.type === "dialog" ? activeState.entity : null}
        open={activeState.type === "dialog"}
        onOpenChange={handleDialogOpenChange}
        onCreate={onCreate}
        onUpdate={onUpdate}
      />

      {ConfirmDialogElement}
    </>
  );
};
