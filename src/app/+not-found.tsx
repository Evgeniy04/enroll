import { buttonTextVariants, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Link, Stack } from "expo-router";
import { Search } from "lucide-react-native";
import { View } from "react-native";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Ой! Не найдено" }} />

      <View className="flex-1 items-center">
        <View className="h-2/3 items-center justify-center">
          <Icon as={Search} className="size-64 stroke-1" />
          <Text variant="h3">Ошибка 404!</Text>
          <Text variant="blockquote">Кажется, вы&nbsp;заблудились.</Text>
        </View>

        <View className="flex-1 justify-start">
          <Link href="/" className={buttonVariants({ variant: "default" })}>
            <Text className={buttonTextVariants({ variant: "default" })}>
              Вернуться на&nbsp;главную страницу
            </Text>
          </Link>
        </View>
      </View>
    </>
  );
};

export default NotFoundScreen;
