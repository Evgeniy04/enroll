import { Button } from "@/components/ui/button";
import { DatePickerValue } from "@/components/ui/date-picker";
import { DatePickerField } from "@/components/ui/date-picker-field";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { TextField } from "@/components/ui/text-field";
import { useContentInsets } from "@/hooks/useContentInsets";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { useState } from "react";

export const DrivingInstructorForm = () => {
  const contentInsets = useContentInsets();
  const [workStartDate, setWorkStartDate] = useState<DatePickerValue>();
  const [drivingStartDate, setDrivingStartDate] = useState<DatePickerValue>();

  return (
    <>
      <DatePickerField
        nativeID="work-start-date"
        label="Дата начала работы"
        helperText="Дата, с&nbsp;которой вы&nbsp;начали работать в&nbsp;профессии"
        currentValue={workStartDate}
        setCurrentValue={setWorkStartDate}
        contentInsets={contentInsets}
        required
      />
      <DatePickerField
        nativeID="driving-start-date"
        label="Дата начала водительского стажа"
        helperText="Дата, с&nbsp;которой вы&nbsp;начали водить транспорт"
        currentValue={drivingStartDate}
        setCurrentValue={setDrivingStartDate}
        contentInsets={contentInsets}
        required
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
        multiline
      />
      <Button
        onPress={() => router.push("/settings/Vehicle")}
        variant="secondary"
      >
        <Icon as={Plus} className="text-foreground" />
        <Text>Добавить транспорт</Text>
      </Button>
    </>
  );
};
