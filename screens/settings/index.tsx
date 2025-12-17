import { Option } from '@rn-primitives/select';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { PersonalInfoForm } from './components/personal-info-form';
import { SpecialistProfileCard } from './components/specialist-profile-card';

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