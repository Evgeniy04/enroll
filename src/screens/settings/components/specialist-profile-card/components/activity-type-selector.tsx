import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSelectContentInsets } from '@/hooks/useSelectContentInsets';
import {
  ActivityTypeSelectorProps,
} from '@/screens/settings/components/specialist-profile-card/specialist-profile-card.types';
import { View } from 'react-native';

const ACTIVITY_OPTIONS = [
  { label: 'Мастер производственного обучения', value: 'driving_instructor' },
  { label: 'Другое', value: 'other' },
];

export const ActivityTypeSelector = ({ activityType, onActivityTypeChange }: ActivityTypeSelectorProps) => {
  const selectContentInsets = useSelectContentInsets();

  return (
    <View className='gap-1.5'>
      <Label nativeID='activity'>Вид деятельности</Label>
      <Select value={activityType} onValueChange={onActivityTypeChange} aria-labelledby='activity'>
        <SelectTrigger>
          <SelectValue placeholder='Выберите вид деятельности' />
        </SelectTrigger>
        <SelectContent insets={selectContentInsets} className='max-h-80'>
          <SelectGroup>
            <SelectLabel>Деятельность</SelectLabel>
            {ACTIVITY_OPTIONS.map((option) => (
              <SelectItem key={option.value} label={option.label} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </View>
  )
}