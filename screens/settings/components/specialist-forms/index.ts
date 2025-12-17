import { ComponentType } from 'react';
import { DrivingInstructorForm } from './components/driving-instructor-form';
import { OtherSpecialistForm } from './components/other-specialist-form';

const SPECIALIST_FORMS_MAP: Record<string, ComponentType> = {
  driving_instructor: DrivingInstructorForm,
};

export const getSpecialistForm = (value: string) =>
  SPECIALIST_FORMS_MAP[value as keyof typeof SPECIALIST_FORMS_MAP]
  ?? OtherSpecialistForm;

export { DrivingInstructorForm } from './components/driving-instructor-form';
export { OtherSpecialistForm } from './components/other-specialist-form';
