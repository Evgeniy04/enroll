import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { NumberPickerField } from "@/components/ui/number-picker-field";
import { Option } from "@/components/ui/select";
import { SelectField } from "@/components/ui/select-field";
import { Text } from "@/components/ui/text";
import { TimePickerField } from "@/components/ui/time-picker-field";
import { TimeProps } from "@/components/ui/time-picker-field/time-picker-field.types";
import { useContentInsets } from "@/hooks/useContentInsets";
import { TIME_FORMAT_CONFIG } from "@/screens/Settings/Work/tabs/constants/time";
import { Plus } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";
import { Service } from "../../../Services/Services.types";

export interface PendingSlot {
  startTime: TimeProps;
  serviceId?: Option;
  count: number;
}

interface TemplateSlotFormProps {
  pendingSlot: PendingSlot;
  services: Service[];
  onChange: (slot: PendingSlot) => void;
  onAdd: () => void;
}

export const TemplateSlotForm: FC<TemplateSlotFormProps> = ({
  pendingSlot,
  services,
  onChange,
  onAdd,
}) => (
  <Card className="gap-3 p-3">
    <View className="gap-2">
      <SelectField
        nativeID="service-id"
        label="Услуга"
        groupLabel="Услуга"
        placeholder="Выберите услугу"
        value={pendingSlot.serviceId}
        onValueChange={(value) =>
          onChange({ ...pendingSlot, serviceId: value })
        }
        options={services.map((s) => ({
          label: `${s.name} (${s.duration} мин)`,
          value: s.id,
        }))}
        helperText="Услуга, которая будет оказана"
        contentInsets={useContentInsets()}
        required
      />

      <TimePickerField
        nativeID="start-time"
        label="Время начала"
        defaultValue={pendingSlot.startTime}
        onChange={(time) => onChange({ ...pendingSlot, startTime: time })}
        modalTitle="Время начала"
        formatOptions={TIME_FORMAT_CONFIG}
        hideDays
        hideSeconds
        helperText="С какого времени вы начнёте предоставлять выбранную услугу"
      />

      <NumberPickerField
        nativeID="service-count"
        label="Количество"
        value={pendingSlot.count}
        onChange={(value) => onChange({ ...pendingSlot, count: value })}
        step={1}
        min={1}
        max={288}
        helperText="Сколько слотов на услугу будет доступно со времени начала"
      />

      <Button onPress={onAdd} disabled={!pendingSlot.serviceId}>
        <Icon as={Plus} />
        <Text>Добавить</Text>
      </Button>
    </View>
  </Card>
);
