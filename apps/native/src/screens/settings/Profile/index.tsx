import { KeyboardAvoidingScreen } from "@/components/layout/KeyboardAvoidingScreen";
import { Button } from "@/components/ui/button";
import { SettingsHeaderAction } from "@/components/ui/header/settings-header-action";
import { Option } from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useConfirm } from "@/hooks/useConfirm";
import { authClient } from "@/lib/auth-client";
import { PersonalInfoForm } from "@/screens/settings/Profile/components/PersonalInfoForm";
import { SpecialistProfileCard } from "@/screens/settings/Profile/components/SpecialistProfileCard";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export const Profile = () => {
  const router = useRouter();
  const [activityType, setActivityType] = useState<Option>(undefined);
  const { confirm, ConfirmDialogElement } = useConfirm();

  const handlePressOpenWorkSettings = () => {
    router.push("/settings/Work");
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
      <KeyboardAvoidingScreen>
        <PersonalInfoForm />

        <SpecialistProfileCard
          value={activityType}
          onValueChange={setActivityType}
        />

        <View className="m-5">
          <Button>
            <Text>Сохранить изменения</Text>
          </Button>
        </View>
      </KeyboardAvoidingScreen>
      {ConfirmDialogElement}
    </>
  );
};
