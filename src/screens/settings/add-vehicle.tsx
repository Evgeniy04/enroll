import { KeyboardAvoidingScreen } from "@/components/layout/keyboard-avoiding-screen";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { Button } from "@/components/ui/button";
import { DatePickerField } from "@/components/ui/date-picker-field";
import { Option } from "@/components/ui/select";
import { SelectField } from "@/components/ui/select-field";
import { Text } from "@/components/ui/text";
import { TextField } from "@/components/ui/text-field";
import { useContentInsets } from "@/hooks/useContentInsets";
import { useTabsHeader } from "@/hooks/useTabsHeader";
import { useState } from "react";
import { View } from "react-native";

const TRANSMISSION_TYPE_OPTIONS = [
  { label: 'Механическая', value: 'manual' },
  { label: 'Автоматическая', value: 'automatic' },
];

export const AddVehicle = () => {
  useTabsHeader('Ваш транспорт', true);
  
  const contentInsets = useContentInsets();
  const [ image, setImage ] = useState<string | undefined>('https://hips.hearstapps.com/hmg-prod/images/2023-range-rover-se-p400-lwb-105-1650304551.jpg?crop=0.960xw:0.810xh;0,0.115xh&resize=2048:*');
  const [ transmissionType, setTransmissionType ] = useState<Option>(undefined);
  const [ manufactureDate, setManufactureDate ] = useState<Date>();
  
  return (
    <KeyboardAvoidingScreen>
      <AvatarPicker image={image} setImage={setImage}/>

      <View className='m-5 gap-6'>
        <TextField
          nativeID="brand_model"
          label="Марка и модель транспортного средства"
          placeholder='Например, Toyota Camry'
          helperText='Укажите данные точно так, как они указаны в СТС'
          required
        />
        <SelectField
          nativeID='transmission_type'
          label='Тип трансмиссии'
          value={transmissionType}
          onValueChange={setTransmissionType}
          placeholder='Выберите тип трансмиссии'
          options={TRANSMISSION_TYPE_OPTIONS}
          groupLabel='Трансмиссия'
          contentInsets={contentInsets}
          required
        />
        <TextField
          nativeID="registration_number"
          label="Регистрационный номер"
          placeholder='Введите регистрационный номер'
          helperText="Например: A123BC70"
          required
        />
        <TextField
          nativeID="additional_info"
          label="Дополнительная информация"
          placeholder="Введите дополнительную информацию"
          helperText='Например: цвет авто, модель двигателя и&nbsp;т.д.'
          multiline
        />
        <DatePickerField
          nativeID="manufacture-date"
          label="Дата выпуска"
          helperText="Укажите дату, когда транспортное средство было выпущено"
          currentDate={manufactureDate}
          setCurrentDate={setManufactureDate}
          startYear={1990}
        />
      </View>

      <View className='m-5'>
        <Button>
          <Text>Сохранить изменения</Text>
        </Button>
      </View>
    </KeyboardAvoidingScreen>
  );
}