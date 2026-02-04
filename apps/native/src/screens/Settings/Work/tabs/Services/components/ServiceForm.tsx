import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { NumberPickerField } from "@/components/ui/number-picker-field";
import { Text } from "@/components/ui/text";
import { TextField } from "@/components/ui/text-field";
import { FormProps } from "@/screens/settings/Work/tabs/components/FormDialog";
import { Check, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Service } from "../Services.types";

export const ServiceForm = ({
  initialData,
  onCreate,
  onUpdate,
}: FormProps<Service>) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(30);
  const [breakAfter, setBreakAfter] = useState(0);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDuration(initialData.duration);
      setBreakAfter(initialData.breakAfter);
    } else {
      setName("");
      setDuration(30);
      setBreakAfter(0);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (initialData) {
      onUpdate({
        id: initialData.id,
        name,
        duration,
        breakAfter,
      });
    } else {
      onCreate({
        name,
        duration,
        breakAfter,
      });
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {initialData ? "Редактировать услугу" : "Новая услуга"}
        </DialogTitle>
      </DialogHeader>

      <View className="gap-6">
        <TextField
          nativeID="service-name"
          label="Название услуги"
          placeholder="Например: Стрижка, Массаж"
          required
          value={name}
          onChangeText={setName}
        />

        <NumberPickerField
          nativeID="service-duration"
          label="Длительность услуги"
          value={duration}
          onChange={setDuration}
          step={5}
          min={5}
          max={1440}
          helperText="Время оказания услуги"
          unit="мин"
          presets={[30, 60, 90]}
        />

        <NumberPickerField
          nativeID="service-break-after"
          label="Перерыв после услуги"
          value={breakAfter}
          onChange={setBreakAfter}
          step={5}
          min={0}
          max={1440}
          helperText="Подготовка перед следующим клиентом"
          presets={[15, 30, 45]}
          unit="мин"
        />
      </View>

      <DialogFooter className="flex-row-reverse">
        <DialogClose asChild>
          <Button className="flex-1" variant="outline">
            <Icon as={X} />
            <Text>Отмена</Text>
          </Button>
        </DialogClose>

        <DialogClose asChild>
          <Button
            className="flex-1"
            onPress={handleSubmit}
            disabled={!name.trim()}
          >
            <Icon as={Check} className="text-primary-foreground" />
            <Text>{initialData ? "Сохранить" : "Создать"}</Text>
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
