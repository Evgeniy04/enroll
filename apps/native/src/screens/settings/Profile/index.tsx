import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGradientColors } from "@/components/ui/gradient-icon";
import { SettingsHeaderAction } from "@/components/ui/header/settings-header-action";
import { Text } from "@/components/ui/text";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useConfirm } from "@/hooks/dialogs/useConfirm";
import { authClient } from "@/lib/auth-client";
import { PersonalInfoForm } from "@/screens/settings/Profile/components/PersonalInfoForm";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export const Profile = () => {
  const router = useRouter();
  const { confirm, ConfirmDialogElement } = useConfirm();

  const handlePressOpenWorkSettings = () => {
    router.push("/(tabs)/(settings)/Work");
  };

  const handlePressOpenSpecialistProfile = () => {
    router.push({
      pathname: "/ProfileDetails",
      params: { id: 1 },
    });
  };

  const handlePressLogout = () => {
    confirm({
      title: "Выйти из аккаунта?",
      cancelText: "Отменить",
      confirmText: "Подтвердить",
      onConfirm: () => authClient.signOut(),
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Мой профиль",
          headerTitleAlign: "center",
          headerLeft: () => <ThemeToggle enableIosSpecials />,
          headerRight: () => (
            <SettingsHeaderAction
              onPressOpenWorkSettings={handlePressOpenWorkSettings}
              onPressLogout={handlePressLogout}
            />
          ),
        }}
      />
      <KeyboardAwareScrollView className="flex-1">
        <Card className="m-5">
          <CardContent className="gap-6">
            <PersonalInfoForm />
          </CardContent>
        </Card>

        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ margin: 20, gap: 24, paddingVertical: 24, borderRadius: 12 }}
          colors={getGradientColors("emerald")}
        >
          <CardHeader>
            <CardTitle className="text-white">Профиль специалиста</CardTitle>
            <CardDescription className="text-neutral-200">
              Создайте уникальный профиль за несколько минут.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              variant="secondary"
              onPress={handlePressOpenSpecialistProfile}
            >
              <Text>Начать</Text>
            </Button>
          </CardContent>
        </LinearGradient>
      </KeyboardAwareScrollView>

      {ConfirmDialogElement}
    </>
  );
};
