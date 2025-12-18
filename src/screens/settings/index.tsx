import { PersonalInfoForm } from '@/screens/settings/components/personal-info-form';
import { SpecialistProfileCard } from '@/screens/settings/components/specialist-profile-card';
import { Option } from '@rn-primitives/select';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}