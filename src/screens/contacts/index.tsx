import { Text } from '@/components/ui/text';
import { useRestoreTabsHeader } from '@/hooks/useRestoreTabsHeader';
import useScreenHeight from '@/hooks/useScreenHeight';
import { ContactListItem } from '@/screens/contacts/components/contact-list-item';
import { ContactsSearch } from '@/screens/contacts/components/contacts-search';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { Contact, CONTACTS } from './test-store';

export const Contacts = () => {
  useRestoreTabsHeader('Контакты');

  const screenHeight = useScreenHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();
  
  const sceneHeight = screenHeight - tabBarHeight - headerHeight;

  const hasContacts = CONTACTS.length > 0;

  const handleDelete = useCallback((id: string) => {
    console.log('Удалить контакт:', id);
  }, []);
  
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Contact>) => (
      <ContactListItem item={item} onDelete={handleDelete} />
    ),
    [handleDelete]
  );

  return (
    <FlatList
      data={CONTACTS}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={
        hasContacts ? <ContactsSearch /> : null
      }
      ListEmptyComponent={
        <View
          style={{ height: sceneHeight }}
          className="justify-center gap-4 m-5"
        >
          <Text variant="h4" className="text-muted-foreground text-center">
            У вас пока нет контактов
          </Text>
          <Text className="text-muted-foreground text-center">
            Добавьте специалиста или клиента по&nbsp;публичному имени пользователя
          </Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
    />
  );
}