import { fieldContext, formContext } from "@/hooks/forms/formContext";
import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";

const InputField = lazy(() => import("@/components/form/input-field"));
const TextareaField = lazy(() => import("@/components/form/textarea-field"));
const SelectField = lazy(() => import("@/components/form/select-field"));
const NumberPickerField = lazy(
  () => import("@/components/form/number-picker-field"),
);
const AvatarPickerField = lazy(
  () => import("@/components/form/avatar-picker-field"),
);
const DatePickerField = lazy(
  () => import("@/components/form/date-picker-field"),
);
const TimePickerField = lazy(
  () => import("@/components/form/time-picker-field"),
);
const ToggleGroupField = lazy(
  () => import("@/components/form/toggle-group-field"),
);

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    InputField,
    TextareaField,
    SelectField,
    NumberPickerField,
    AvatarPickerField,
    DatePickerField,
    TimePickerField,
    ToggleGroupField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
