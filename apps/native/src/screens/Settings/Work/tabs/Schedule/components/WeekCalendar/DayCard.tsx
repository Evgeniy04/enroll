import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Option } from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { useContentInsets } from "@/hooks/useContentInsets";
import { cn } from "@/lib/utils";
import { TemplateSelect } from "@/screens/Settings/Work/tabs/Schedule/components/fields/TempleteSelect";
import dayjs, { Dayjs } from "dayjs";
import { FC, useState } from "react";
import { View } from "react-native";

interface DayCardProps {
  date: Dayjs;
  templates: {
    label: string;
    value: string;
  }[];
  onTemplateChange?: (template: Option | undefined) => void;
}

export const DayCard: FC<DayCardProps> = ({
  date,
  templates,
  onTemplateChange,
}) => {
  const contentInsets = useContentInsets();
  const [template, setTemplate] = useState<Option>();

  const handleTemplateChange = (value: Option | undefined) => {
    setTemplate(value);
    onTemplateChange?.(value);
  };

  const disabled = date.isBefore(dayjs(), "day");

  return (
    <Card
      className={cn(
        "gap-0 overflow-hidden p-0",
        template && "border-green-400 dark:border-green-600",
        disabled && "bg-neutral-300 dark:bg-neutral-900",
      )}
    >
      <CardHeader
        className={cn(
          "flex-row items-center justify-between bg-neutral-300 p-2 dark:bg-neutral-900",
        )}
      >
        <View className="flex-row items-center gap-3">
          <Text variant="h4">{date.format("ddd")}</Text>
          <Text variant="muted">{date.format("DD MMM")}</Text>
        </View>

        {date.isToday() && (
          <Text
            variant="code"
            className="border border-primary/30 bg-primary-foreground"
          >
            Сегодня
          </Text>
        )}
      </CardHeader>

      <CardContent className="p-2">
        <TemplateSelect
          value={template}
          onChange={handleTemplateChange}
          options={templates}
          disabled={disabled}
          contentInsets={contentInsets}
        />
      </CardContent>
    </Card>
  );
};
