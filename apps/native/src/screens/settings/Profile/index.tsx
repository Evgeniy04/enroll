import { Card, CardContent } from "@/components/ui/card";
import { SettingsHeaderAction } from "@/components/ui/header/settings-header-action";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useConfirm } from "@/hooks/dialogs/useConfirm";
import { authClient } from "@/lib/auth-client";
import { PersonalInfoForm } from "@/screens/settings/Profile/components/PersonalInfoForm";
import { Stack, useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export const Profile = () => {
  const router = useRouter();
  const { confirm, ConfirmDialogElement } = useConfirm();

  const handlePressOpenWorkSettings = () => {
    router.push("/(tabs)/(settings)/Work");
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
      </KeyboardAwareScrollView>

      {ConfirmDialogElement}
    </>
  );
};
