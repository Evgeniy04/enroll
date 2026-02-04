import { Text } from "@/components/ui/text";
import {
  PendingSlot,
  TemplateSlotForm,
} from "@/screens/settings/Work/tabs/Templates/components/TemplateSlotsEditor/TemplateSlotForm";
import { TemplateSlotList } from "@/screens/settings/Work/tabs/Templates/components/TemplateSlotsEditor/TemplateSlotList";
import { FC, useCallback, useState } from "react";
import { View } from "react-native";
import { Service } from "../../../Services/Services.types";
import { ScheduleSlot, Template } from "../../Templates.types";

interface TemplateSlotsEditorProps {
  template: Template;
  services: Service[];
  onChange: (template: Template) => void;
}

export const TemplateSlotsEditor: FC<TemplateSlotsEditorProps> = ({
  template,
  services,
  onChange,
}) => {
  const [pendingSlot, setPendingSlot] = useState<PendingSlot>({
    startTime: { hours: 9, minutes: 0 },
    serviceId: undefined,
    count: 1,
  });

  const setSlots = useCallback(
    (slots: ScheduleSlot[]) => onChange({ ...template, slots }),
    [template, onChange],
  );

  const handleAddSlot = useCallback(() => {
    if (!pendingSlot.serviceId) return;

    const slot: ScheduleSlot = {
      id: Date.now().toString(),
      startTime: pendingSlot.startTime,
      count: pendingSlot.count,
      serviceId: pendingSlot.serviceId.value,
    };

    setSlots(
      [...template.slots, slot].sort(
        (a, b) =>
          (a.startTime.hours ?? 0) * 60 +
          (a.startTime.minutes ?? 0) -
          ((b.startTime.hours ?? 0) * 60 + (b.startTime.minutes ?? 0)),
      ),
    );
    setPendingSlot((prev) => ({ ...prev, count: 1 }));
  }, [pendingSlot, template.slots, setSlots]);

  const handleRemoveSlot = useCallback(
    (id: string) => {
      setSlots(template.slots.filter((s) => s.id !== id));
    },
    [template.slots, setSlots],
  );

  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between">
        <Text variant="h4">Настройка расписания</Text>
      </View>

      <TemplateSlotForm
        pendingSlot={pendingSlot}
        services={services}
        onChange={setPendingSlot}
        onAdd={handleAddSlot}
      />
      <Text>Список услуг в расписании</Text>
      <TemplateSlotList
        slots={template.slots}
        services={services}
        onRemove={handleRemoveSlot}
      />
    </View>
  );
};
