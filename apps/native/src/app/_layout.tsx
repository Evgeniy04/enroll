import { Loading } from "@/components/ui/loading";
import { initializeApp, toastConfig } from "@/config";
import { authClient } from "@/lib/auth-client";
import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import * as NavigationBar from "expo-navigation-bar";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";
import "../../global.css";

export {
  // Перехватывает любые ошибки, выбрасываемые компонентом Layout.
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

initializeApp();

const Routes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <Stack>
      {/* Экраны, которые показываются только когда пользователь авторизован. */}
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Экраны, которые показываются только когда пользователь НЕ авторизован. */}
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Экраны вне защитных блоков доступны всем (например, страница "не найдено"). */}
    </Stack>
  );
};

const Layout = () => {
  const { colorScheme } = useColorScheme();
  const { data: session, isPending } = authClient.useSession();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (!isPending && isInitialLoading) {
      setIsInitialLoading(false);
      SplashScreen.hide();
    }
  }, [isPending, isInitialLoading]);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync(
        colorScheme === "dark" ? "light" : "dark",
      );
    }
  }, [colorScheme]);

  if (isInitialLoading) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
        <KeyboardProvider>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          <Routes isAuthenticated={!!session} />
          <Toast config={toastConfig} position="bottom" />
          <PortalHost />
        </KeyboardProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
