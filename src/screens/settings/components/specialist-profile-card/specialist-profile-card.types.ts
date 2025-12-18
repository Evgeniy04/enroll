import { Option } from "@rn-primitives/select";

export interface ActivityTypeSelectorProps {
  activityType?: Option;
  onActivityTypeChange?: (option: Option) => void;
}