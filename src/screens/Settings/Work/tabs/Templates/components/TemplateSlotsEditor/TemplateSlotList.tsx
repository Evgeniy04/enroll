import { EmptyState } from "@/components/ui/empty-state";
import { TemplateSlotCard } from "@/screens/Settings/Work/tabs/Templates/components/TemplateSlotsEditor/TemplateSlotCard";
import { Clock } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";
import { Service } from "../../../Services/Services.types";
import { ScheduleSlot } from "../../Templates.types";

interface TemplateSlotListProps {
  slots: ScheduleSlot[];
  services: Service[];
  onRemove: (id: string) => void;
}

export const TemplateSlotList: FC<TemplateSlotListProps> = ({ slots, services, onRemove }) => {
  if (slots.length === 0) {
    return <EmptyState icon={Clock} message="Добавьте услуги в шаблон" />;
  }

  return (
    <View className="gap-2">
      {slots.map(slot => {
        const service = services.find(s => s.id === slot.serviceId);
        if (!service) return null;
        return <TemplateSlotCard key={slot.id} slot={slot} service={service} onRemove={onRemove} />;
      })}
    </View>
  );
};
