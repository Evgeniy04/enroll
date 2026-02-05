import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthStack = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" />
        <Stack.Screen name="SignIn" />
      </Stack>
    </SafeAreaView>
  );
};

export default AuthStack;
