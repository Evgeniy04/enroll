import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  SelectField,
  SelectValueProps,
} from '@/components/ui/select-field';
import {
  Separator,
} from '@/components/ui/separator';
import {
  getSpecialistForm,
} from '@/screens/Settings/Profile/components/SpecialistForms';
import {
  FC,
} from 'react';

const ACTIVITY_OPTIONS = [
  { label: 'Мастер производственного обучения', value: 'driving_instructor' },
  { label: 'Другое', value: 'other' },
];

export const SpecialistProfileCard: FC<SelectValueProps> = ({ value, onValueChange }) => {
  const SpecialistForm = value
    ? getSpecialistForm(value.value)
    : null;

  return (
    <Card className='m-5'>
      <CardHeader>
        <CardTitle>Настройки профиля специалиста</CardTitle>
        <CardDescription>Выберите вид деятельности и заполните необходимые поля.</CardDescription>
      </CardHeader>
      <CardContent className='gap-6'>
        <SelectField
          nativeID='activity'
          label='Вид деятельности'
          value={value}
          onValueChange={onValueChange}
          placeholder='Выберите вид деятельности'
          options={ACTIVITY_OPTIONS}
          groupLabel='Деятельность'
        />

        <Separator />

        {SpecialistForm && <SpecialistForm />}
      </CardContent>
    </Card>
  )
}