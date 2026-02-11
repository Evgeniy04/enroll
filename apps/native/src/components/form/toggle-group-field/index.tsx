import { Multiple } from "@/components/form/toggle-group-field//multiple";
import { Single } from "@/components/form/toggle-group-field//single";

const ToggleGroupField = Single as typeof Single & {
  Single: typeof Single;
  Multiple: typeof Multiple;
};

ToggleGroupField.Single = Single;
ToggleGroupField.Multiple = Multiple;

export { ToggleGroupField };

export default ToggleGroupField;
