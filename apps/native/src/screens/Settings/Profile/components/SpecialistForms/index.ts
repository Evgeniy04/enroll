import { DrivingInstructorForm } from "@/screens/Settings/Profile/components/SpecialistForms/DrivingInstructorForm";
import { OtherSpecialistForm } from "@/screens/Settings/Profile/components/SpecialistForms/OtherSpecialistForm";

import { ComponentType } from "react";

const SPECIALIST_FORMS_MAP: Record<string, ComponentType> = {
  driving_instructor: DrivingInstructorForm,
};

export const getSpecialistForm = (value: string) =>
  SPECIALIST_FORMS_MAP[value as keyof typeof SPECIALIST_FORMS_MAP] ??
  OtherSpecialistForm;
