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
  useContentInsets,
} from '@/hooks/useContentInsets';
import {
  getSpecialistForm,
} from '@/screens/settings/components/specialist-forms';

type SpecialistProfileCardProps = SelectValueProps;

const ACTIVITY_OPTIONS = [
  { label: 'Мастер производственного обучения', value: 'driving_instructor' },
  { label: 'Другое', value: 'other' },
];

export function SpecialistProfileCard({ value, onValueChange }: SpecialistProfileCardProps) {
  const contentInsets = useContentInsets();
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
          contentInsets={contentInsets}
        />

        {SpecialistForm && <SpecialistForm />}
      </CardContent>
    </Card>
  )
}