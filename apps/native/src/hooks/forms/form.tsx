import { AvatarPickerField } from "@/components/form/avatar-picker-field";
import { DatePickerField } from "@/components/form/date-picker-field";
import { InputField } from "@/components/form/input-field";
import { NumberPickerField } from "@/components/form/number-picker-field";
import { SelectField } from "@/components/form/select-field";
import { TextareaField } from "@/components/form/textarea-field";
import { TimePickerField } from "@/components/form/time-picker-field";
import { ToggleGroupField } from "@/components/form/toggle-group-field";
import { fieldContext, formContext } from "@/hooks/forms/formContext";
import { createFormHook } from "@tanstack/react-form";

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
