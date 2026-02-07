import { Loading } from "@/components/ui/loading";
import { initializeApp, toastConfig } from "@/config";
import { authClient } from "@/lib/auth-client";
import { NAV_THEME } from "@/lib/theme";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import "../../global.css";

export {
  // Перехватывает любые ошибки, выбрасываемые компонентом Layout.
  ErrorBoundary,
} from "expo-router";

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

initializeApp();

const Routes = () => {
  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated = !!session;

  useEffect(() => {
    if (isPending) {
      SplashScreen.hide();
    }
  }, [isPending]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <Stack>
      {/* Экраны, которые показываются только когда пользователь НЕ авторизован. */}
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Экраны, которые показываются только когда пользователь авторизован. */}
      <Stack.Protected guard={isAuthenticated}>
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
