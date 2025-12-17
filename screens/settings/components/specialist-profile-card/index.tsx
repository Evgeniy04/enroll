import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSpecialistForm } from '../specialist-forms';
import { ActivityTypeSelector } from './components/activity-type-selector';
import { ActivityTypeSelectorProps } from './specialist-profile-card.types';

type SpecialistProfileCardProps = ActivityTypeSelectorProps;

export function SpecialistProfileCard({ activityType, onActivityTypeChange }: SpecialistProfileCardProps) {
  const SpecialistForm = activityType
    ? getSpecialistForm(activityType.value)
    : null;

  return (
    <Card className='m-5'>
      <CardHeader>
        <CardTitle>Настройки профиля специалиста</CardTitle>
        <CardDescription>Выберите вид деятельности и заполните необходимые поля.</CardDescription>
      </CardHeader>
      <CardContent className='gap-6'>
        <ActivityTypeSelector
          activityType={activityType}
          onActivityTypeChange={onActivityTypeChange}
        />

        {SpecialistForm && <SpecialistForm />}
      </CardContent>
    </Card>
  )
}