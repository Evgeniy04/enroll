import { TextField } from '@/components/forms/text-field';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import {
  DrivingDatePicker,
} from '@/screens/settings/components/specialist-forms/components/driving-instructor-form/driving-date-picker';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useState } from 'react';

export const DrivingInstructorForm = () => {
  const [ workStartDate, setWorkStartDate ] = useState<Date>();
  const [ drivingStartDate, setDrivingStartDate ] = useState<Date>();

  return (
    <>
      <Separator />
      <DrivingDatePicker
        nativeID="work-start-date"
        label="Дата начала работы"
        helperText="Дата, с&nbsp;которой вы&nbsp;начали работать в&nbsp;профессии"
        currentDate={workStartDate}
        setCurrentDate={setWorkStartDate}
      />
      <DrivingDatePicker
        nativeID="driving-start-date"
        label="Дата начала водительского стажа"
        helperText="Дата, с&nbsp;которой вы&nbsp;начали водить транспорт"
        currentDate={drivingStartDate}
        setCurrentDate={setDrivingStartDate}
      />
      <TextField
        nativeID="license_categories"
        label="Категории водительских прав"
        placeholder="Введите категории"
        helperText="Перечислите категории через запятую без пробелов (A,B,C)"
        required
      />
      <TextField
        nativeID="service_address"
        label="Адрес оказания услуги"
        placeholder="Введите адрес"
        autoComplete="street-address"
        required
      />
      <TextField
        nativeID="service_address_details"
        label="Дополнительная информация по&nbsp;месту оказания услуги"
        placeholder="Введите доп. информацию"
        helperText="Например: место встречи у&nbsp;метро, машина с&nbsp;белыми полосами"
      />
      <Button onPress={() => router.push('/settings/add-vehicle')} variant="secondary">
        <Icon as={Plus} className="text-foreground" />
        <Text>Добавить транспорт</Text>
      </Button>
    </>
  );
};