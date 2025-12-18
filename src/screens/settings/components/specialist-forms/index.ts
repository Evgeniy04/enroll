import {
  DrivingInstructorForm,
} from '@/screens/settings/components/specialist-forms/components/driving-instructor-form';
import {
  OtherSpecialistForm,
} from '@/screens/settings/components/specialist-forms/components/other-specialist-form';
import { ComponentType } from 'react';

const SPECIALIST_FORMS_MAP: Record<string, ComponentType> = {
  driving_instructor: DrivingInstructorForm,
};

export const getSpecialistForm = (value: string) =>
  SPECIALIST_FORMS_MAP[value as keyof typeof SPECIALIST_FORMS_MAP]
  ?? OtherSpecialistForm;

export {
  DrivingInstructorForm
} from '@/screens/settings/components/specialist-forms/components/driving-instructor-form';
export {
  OtherSpecialistForm
} from '@/screens/settings/components/specialist-forms/components/other-specialist-form';
