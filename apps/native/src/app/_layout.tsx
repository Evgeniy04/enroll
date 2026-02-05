import { initializeApp, toastConfig } from "@/config";
import { NAV_THEME } from "@/lib/theme";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import "../../global.css";

export {
  // Перехватывает любые ошибки, выбрасываемые компонентом Layout.
  ErrorBoundary,
} from "expo-router";

initializeApp();

const Routes = () => {
  const [isLoaded] = useState(true);
  const [isSignedIn] = useState(false);

  if (!isLoaded) {
    return null;
  }

  return (
    <Stack>
      {/* Экраны, которые показываются только когда пользователь НЕ авторизован. */}
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Экраны, которые показываются только когда пользователь авторизован. */}
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Экраны вне защитных блоков доступны всем (например, страница "не найдено"). */}
    </Stack>
  );
};

const Layout = () => {
  const { colorScheme } = useColorScheme();

  if (Platform.OS === "android") {
    NavigationBar.setButtonStyleAsync(
      colorScheme === "dark" ? "light" : "dark",
    );
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
        <ActionSheetProvider>
          <>
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
            <Routes />
            <Toast config={toastConfig} position="bottom" />
            <PortalHost />
          </>
        </ActionSheetProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
