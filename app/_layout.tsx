import { BaseToast, ToastProps } from '@/components/ui/base-toast';
import { NAV_THEME } from '@/lib/theme';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, useColorScheme } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';
import "../global.css";

export {
  // Перехватывает любые ошибки, выбрасываемые компонентом Layout.
  ErrorBoundary
} from 'expo-router';

const toastConfig: ToastConfig = {
  success: (toastProps: ToastProps) => <BaseToast variant='default' toastProps={toastProps}/>,
  error: (toastProps: ToastProps) => <BaseToast variant='destructive' toastProps={toastProps}/>
};

export default function Layout() {
  const colorScheme = useColorScheme() ?? 'light';

  if (Platform.OS === 'android') {
    NavigationBar.setButtonStyleAsync(colorScheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeProvider value={NAV_THEME[colorScheme]}>
      <ActionSheetProvider>
        <>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Routes />
          <Toast config={toastConfig} position='bottom' />
          <PortalHost />
        </>
      </ActionSheetProvider>
    </ThemeProvider>
  );
}

SplashScreen.preventAutoHideAsync();

function Routes() {
  const [isLoaded] = useState(true);
  const [isSignedIn] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <Stack>
      {/* Экраны, которые показываются только когда пользователь НЕ авторизован. */}
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)/sign-in" options={{ headerShown: false, title: 'Войти' }} />
      </Stack.Protected>

      {/* Экраны, которые показываются только когда пользователь авторизован. */}
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Экраны вне защитных блоков доступны всем (например, страница "не найдено"). */}
    </Stack>
  );
}
