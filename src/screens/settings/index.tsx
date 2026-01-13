import { KeyboardAvoidingScreen } from '@/components/layout/KeyboardAvoidingScreen';
import { Button } from '@/components/ui/button';
import { Option } from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { PersonalInfoForm } from '@/screens/Settings/components/PersonalInfoForm';
import { SpecialistProfileCard } from '@/screens/Settings/components/SpecialistProfileCard';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export const Settings = () => {
  const [ activityType, setActivityType ] = useState<Option>(undefined);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Настройки",
          headerTitleAlign: "center",
          headerLeft: () => <ThemeToggle enableIosSpecials />
        }}
      />
      <KeyboardAvoidingScreen>
        <PersonalInfoForm />

        <SpecialistProfileCard
          value={activityType}
          onValueChange={setActivityType}
        />

        <View className='m-5'>
          <Button>
            <Text>Сохранить изменения</Text>
          </Button>
        </View>
      </KeyboardAvoidingScreen>
    </>
  );
}