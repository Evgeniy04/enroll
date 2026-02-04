import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { TextField } from "@/components/ui/text-field";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { ContactListItem } from "@/screens/contacts/ContactsList/components/ContactListItem";
import { ContactSearch } from "@/screens/contacts/ContactsList/components/ContactSearch";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { UserRoundPlus } from "lucide-react-native";
import { useCallback } from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import { Contact, CONTACTS } from "@/screens/test-store";

export const ContactsList = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();

  const sceneHeight = screenHeight - tabBarHeight - headerHeight;

  const hasContacts = CONTACTS.length > 0;

  const handleDelete = useCallback((id: string) => {
    console.log("Удалить контакт:", id);
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Contact>) => (
      <ContactListItem item={item} onDelete={handleDelete} />
    ),
    [handleDelete],
  );

  return (
    <>
      <Stack.Screen options={{ title: "Контакты" }} />
      <FlatList
        data={CONTACTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={hasContacts ? <ContactSearch /> : null}
        ListEmptyComponent={
          <View
            style={{ height: sceneHeight }}
            className="m-5 justify-center gap-4"
          >
            <Text variant="h4" className="text-center text-muted-foreground">
              У вас пока нет контактов
            </Text>
            <Text className="text-center text-muted-foreground">
              Добавьте специалиста или клиента по&nbsp;публичному имени
              пользователя
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 86 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
      />
      <View className="absolute bottom-5 right-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="h-14 w-14 rounded-full">
              <Icon
                as={UserRoundPlus}
                size={20}
                className="text-primary-foreground"
              />
            </Button>
          </DialogTrigger>
          <DialogContent
            style={{ width: screenWidth - 40, alignSelf: "center" }}
          >
            <DialogHeader>
              <DialogTitle>Добавить контакт</DialogTitle>
              <DialogDescription>
                Как только вашу заявку одобрят, пользователь появится у Вас в
                контактах и с ним можно будет взаимодействовать.
              </DialogDescription>
            </DialogHeader>
            <View className="my-8">
              <TextField
                nativeID="username"
                label="Публичное имя пользователя"
                placeholder="Например: avradev"
                helperText="Введите публичное имя пользователя, которое Вам предоставил специалист или клиент."
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
};
