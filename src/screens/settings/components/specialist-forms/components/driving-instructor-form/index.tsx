import { DatePicker } from '@/components/forms/date-picker';
import { TextField } from '@/components/forms/text-field';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { View } from 'react-native';

export const DrivingInstructorForm = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <>
      <TextField
        nativeID="license_categories"
        label="Категории водительских прав"
        placeholder='Введите категории через запятую (A, B, C...)'
      />
      <View className='gap-1.5'>
        <Label nativeID='driving-start-year'>Стаж с</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Text className="text-base text-foreground">
                {date
                  ? format(date, 'dd MMMM yyyy', { locale: ru })
                  : 'Выберите дату'}
              </Text>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-80" side="top">
            <View className="gap-4">
              <View className="gap-2">
                <Text className="font-medium leading-none">Выберите дату</Text>
                <Text className="text-muted-foreground text-sm">По ней мы посчитаем ваш стаж.</Text>
              </View>
              <DatePicker
                currentDate={date}
                setCurrentDate={setDate}
              />
            </View>
          </PopoverContent>
        </Popover>
      </View>
    </>
  );
};