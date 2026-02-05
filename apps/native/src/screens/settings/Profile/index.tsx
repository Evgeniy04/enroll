import { KeyboardAvoidingScreen } from "@/components/layout/KeyboardAvoidingScreen";
import { Button } from "@/components/ui/button";
import { SettingsHeaderAction } from "@/components/ui/header";
import { Option } from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { PersonalInfoForm } from "@/screens/settings/Profile/components/PersonalInfoForm";
import { SpecialistProfileCard } from "@/screens/settings/Profile/components/SpecialistProfileCard";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export const Profile = () => {
  const router = useRouter();
  const [activityType, setActivityType] = useState<Option>(undefined);

  const handleSettingsPress = () => {
    router.push("/settings/Work");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Мой профиль",
          headerTitleAlign: "center",
          headerLeft: () => <ThemeToggle enableIosSpecials />,
          headerRight: () => (
            <SettingsHeaderAction onPress={handleSettingsPress} />
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
    </>
  );
};
