import { AvatarPicker } from "@/components/ui/avatar-picker";
import { useFieldContext } from "@/hooks/forms/formContext";
import { FC } from "react";

export const AvatarPickerField: FC = () => {
  const field = useFieldContext<string>();

  return (
    <AvatarPicker image={field.state.value} setImage={field.handleChange} />
  );
};
