import { KeyboardAvoidingScreen } from '@/components/layout/keyboard-avoiding-screen';
import { Button } from '@/components/ui/button';
import { Option } from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { useRestoreTabsHeader } from '@/hooks/useRestoreTabsHeader';
import { PersonalInfoForm } from '@/screens/settings/components/personal-info-form';
import { SpecialistProfileCard } from '@/screens/settings/components/specialist-profile-card';
import { useState } from 'react';
import { View } from 'react-native';

export const Settings = () => {
  useRestoreTabsHeader('Настройки');
  
  const [ activityType, setActivityType ] = useState<Option>(undefined);

  return (
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
  );
}