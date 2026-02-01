import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { BookingLimitValue } from "@/screens/Settings/Work/tabs/Schedule/components/types/booking-limit";
import { getPluralWord } from "@/utils/plural";
import dayjs from "dayjs";
import { Settings } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";

interface BookingLimitActionsProps {
  value: BookingLimitValue;
  onPress: () => void;
}

export const BookingLimitActions: FC<BookingLimitActionsProps> = ({
  value,
  onPress,
}) => {
  const formatValue = (val: BookingLimitValue) => {
    const { mode, daysAhead, endDate } = val;

    switch (mode) {
      case "unlimited":
        return "отсутствует";
      case "days-ahead":
        return `${daysAhead} ${getPluralWord(daysAhead, ["день", "дня", "дней"])}`;
      case "specific-date":
        if (endDate) return `до ${dayjs(endDate).format("DD MMM YYYY")}`;
        break;
    }
  };

  return (
    <Button variant="default" className="justify-between" onPress={onPress}>
      <View className="flex-row items-center gap-1">
        <Icon as={Settings} className="text-primary-foreground" />
        <Text>Ограничение записи</Text>
      </View>
      <Text variant="muted" className="text-muted-foreground">
        —
      </Text>
      <Text variant="muted" className="text-muted-foreground">
        {formatValue(value)}
      </Text>
    </Button>
  );
};
