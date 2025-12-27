import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { TextField } from '@/components/ui/text-field';
import { useRestoreTabsHeader } from '@/hooks/useRestoreTabsHeader';
import useScreenHeight from '@/hooks/useScreenHeight';
import { ContactListItem } from '@/screens/contacts/components/contact-list-item';
import { ContactsSearch } from '@/screens/contacts/components/contacts-search';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { UserRoundPlus } from 'lucide-react-native';
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
    <>
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
        contentContainerStyle={{ paddingBottom: 86 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
      />
      <View className='absolute right-5 bottom-5'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='default' className='h-14 w-14 rounded-full'>
              <Icon as={UserRoundPlus} size={20} className='text-primary-foreground'/>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Добавить контакт</DialogTitle>
              <DialogDescription>
                Как только вашу заявку одобрят, пользователь появится у Вас в контактах и с ним можно будет взаимодействовать.
              </DialogDescription>
            </DialogHeader>
            <View className='my-8'>
              <TextField
                nativeID="username"
                label="Публичное имя пользователя"
                placeholder='Например: avradev'
                helperText='Введите публичное имя пользователя, которое Вам предоставил специалист или клиент.'
                required
              />
            </View>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  <Text>Закрыть</Text>
                </Button>
              </DialogClose>
              <Button>
                <Text>Отправить зявку</Text>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    </>
  );
}