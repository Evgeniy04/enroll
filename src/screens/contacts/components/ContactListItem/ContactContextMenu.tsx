import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Text } from '@/components/ui/text';
import { useContentInsets } from '@/hooks/useContentInsets';
import { FC, ReactNode } from 'react';

interface ContactContextMenuProps {
  children: ReactNode;
  onDeletePress: () => void;
}

export const ContactContextMenu: FC<ContactContextMenuProps> = ({
  children,
  onDeletePress,
}) => {
  const contentInsets = useContentInsets();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent insets={contentInsets}>
        <ContextMenuItem inset variant="destructive" onPress={onDeletePress}>
          <Text>Удалить</Text>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};