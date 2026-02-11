import { AvatarPicker } from "@/components/ui/avatar-picker";
import { useFieldContext } from "@/hooks/forms/formContext";
import { FC } from "react";

const AvatarPickerField: FC = () => {
  const field = useFieldContext<string | undefined>();

  return (
    <AvatarPicker image={field.state.value} setImage={field.handleChange} />
  );
};

export default AvatarPickerField;
