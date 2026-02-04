import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { formatTime } from "@/components/ui/time-picker-field/utils/formatTime";
import { TIME_FORMAT_CONFIG } from "@/screens/settings/Work/tabs/constants/time";
import { calculateEndTime } from "@/screens/settings/Work/tabs/utils/schedule";
import { Trash2 } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";
import { Service } from "../../../Services/Services.types";
import { ScheduleSlot } from "../../Templates.types";

interface TemplateSlotCardProps {
  slot: ScheduleSlot;
  service: Service;
  onRemove: (id: string) => void;
}

export const TemplateSlotCard: FC<TemplateSlotCardProps> = ({
  slot,
  service,
  onRemove,
}) => (
  <Card className="flex-row items-center gap-3 p-3">
    <View className="flex-1 gap-1">
      <Text>
        {formatTime(slot.startTime, TIME_FORMAT_CONFIG)} –{" "}
        {formatTime(calculateEndTime(slot, service), TIME_FORMAT_CONFIG)}
      </Text>
      <Text variant="muted" className="text-muted-foreground">
        {service.name} · {slot.count} × ({service.duration} мин
        {service.breakAfter > 0 && ` + ${service.breakAfter} мин`})
      </Text>
    </View>

    <Button size="icon" variant="ghost" onPress={() => onRemove(slot.id)}>
      <Icon as={Trash2} />
    </Button>
  </Card>
);
