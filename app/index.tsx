import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable>
        <Text>Записаться</Text>
      </Pressable>
      <Pressable>
        <Text>Продолжить как специалист</Text>
      </Pressable>
      <Pressable>
        <Text>У меня уже есть аккаунт</Text>
      </Pressable>
    </View>
  );
}
