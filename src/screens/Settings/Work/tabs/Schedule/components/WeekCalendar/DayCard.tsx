import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Option } from "@/components/ui/select";
import { SelectField } from "@/components/ui/select-field";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import dayjs, { Dayjs } from 'dayjs';
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
  onTemplateChange
}) => {
  const [ template, setTemplate ] = useState<Option>();

  const handleTemplateChange = (value: Option | undefined) => {
    setTemplate(value);
    onTemplateChange?.(value);
  };

  const disabled = date.isBefore(dayjs(), 'day');

  return (
    <Card
      className={cn(
        "p-0 gap-0 overflow-hidden",
        template && "border-green-400 dark:border-green-600",
        disabled && "bg-neutral-300 dark:bg-neutral-900"
      )}>
      <CardHeader
        className={cn(
          "flex-row items-center justify-between p-2 bg-neutral-300 dark:bg-neutral-900",
        )}
      >
        <View className="flex-row items-center gap-3">
          <Text variant="h4">{date.format('ddd')}</Text>
          <Text variant="muted">{date.format('DD MMM')}</Text>
        </View>
        
        {date.isToday() && (
          <Text variant="code" className="bg-primary-foreground border border-primary/30">Сегодня</Text>
        )}
      </CardHeader>

      <CardContent className="p-2">
        <SelectField
          nativeID={`template-${date.unix()}`}
          label="Применённый шаблон"
          groupLabel="Шаблон"
          placeholder="Выходной"
          value={template}
          onValueChange={handleTemplateChange}
          options={templates}
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
};