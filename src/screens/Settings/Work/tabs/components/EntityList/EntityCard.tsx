import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Pencil, Trash } from 'lucide-react-native';
import { FC, Fragment, useCallback } from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';

export interface EntityCardProps {
  entityId: string;
  title: string;
  descriptionItems?: { label: string; value: string }[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const EntityCard: FC<EntityCardProps> = ({
  entityId,
  title,
  descriptionItems = [],
  onEdit,
  onDelete,
  open,
  onOpenChange,
  children,
}) => {
  const isExpandable = Boolean(children);
  const Wrapper = isExpandable ? Collapsible : Fragment;
  const wrapperProps = isExpandable
    ? { open, onOpenChange }
    : {};


  const handleEdit = useCallback(
    (e: GestureResponderEvent) => {
      e.stopPropagation();
      onEdit(entityId);
    },
    [onEdit, entityId]
  );

  const handleDelete = useCallback(
    (e: GestureResponderEvent) => {
      e.stopPropagation();
      onDelete(entityId);
    },
    [onDelete, entityId]
  );

  const CardHeaderContent = (
    <>
      <View className="flex-row justify-between items-center mb-5">
        <Text variant="h4" className="flex-1 mr-2" numberOfLines={1}>
          {title}
        </Text>

        {open ? (
          <Text variant="code" className="bg-primary-foreground">
            Настройка
          </Text>
        ) : (
          <View className="flex-row gap-1">
            <Button variant="outline" size="icon" onPress={handleEdit}>
              <Icon as={Pencil} />
            </Button>

            <Button variant="destructive" size="icon" onPress={handleDelete}>
              <Icon as={Trash} />
            </Button>
          </View>
        )}
      </View>

      {descriptionItems.map((item) => (
        <View key={item.label} className="flex-row justify-between items-center">
          <Text variant="muted" className="text-muted-foreground">{item.label}</Text>
          <Text variant="muted" className="text-muted-foreground">{item.value}</Text>
        </View>
      ))}
    </>
  )

  return (
    <Wrapper {...wrapperProps}>
      <Card className={cn('p-0 gap-0 overflow-hidden', open && 'border-primary/30')}>
        {isExpandable ? (
          <CollapsibleTrigger asChild>
            <Pressable className={cn('p-5 active:opacity-70', open && 'bg-accent')}>
              {CardHeaderContent}
            </Pressable>
          </CollapsibleTrigger>
        ) : (
          <View className="p-5">{CardHeaderContent}</View>
        )}

        {isExpandable && (
          <CollapsibleContent>
            <Separator className="bg-primary/30" />
            <View className="p-2">
              {children}
            </View>
          </CollapsibleContent>
        )}
      </Card>
    </Wrapper>
  );
};
