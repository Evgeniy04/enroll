import { DrivingInstructorForm } from "@/screens/settings/Profile/components/SpecialistForms/DrivingInstructorForm";
import { OtherSpecialistForm } from "@/screens/settings/Profile/components/SpecialistForms/OtherSpecialistForm";

const SPECIALIST_FORMS_MAP = {
  driving_instructor: DrivingInstructorForm,
};

export const getSpecialistForm = (value: string) =>
  SPECIALIST_FORMS_MAP[value as keyof typeof SPECIALIST_FORMS_MAP] ??
  OtherSpecialistForm;
