import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { PersonalInfoForm } from '@/screens/settings/components/personal-info-form';
import { SpecialistProfileCard } from '@/screens/settings/components/specialist-profile-card';
import { Option } from '@rn-primitives/select';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const Settings = () => {
  const [ activityType, setActivityType ] = useState<Option>(undefined);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className='flex-1'>
      <ScrollView>
        <PersonalInfoForm />

        <SpecialistProfileCard 
          activityType={activityType}
          onActivityTypeChange={setActivityType}
        />

        <View className='m-5'>
          <Button>
            <Text>Сохранить изменения</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}