import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { VerticalIconButton } from '@/components/ui/vertical-icon-button';
import { CalendarDays, CalendarRange, CalendarSync, LucideIcon, Trash2 } from 'lucide-react-native';
import { FC, Fragment } from 'react';
import { View } from 'react-native';

interface ToolConfig {
  key: string;
  label: string;
  icon: LucideIcon;
  variant?: 'default' | 'destructive';
  onPress: () => void;
  separated?: boolean;
}

interface FillToolsProps {
  onPeriods: () => void;
  onWeeks: () => void;
  onShifts: () => void;
  onReset: () => void;
}

export const FillTools: FC<FillToolsProps> = ({
  onPeriods,
  onWeeks,
  onShifts,
  onReset,
}) => {
  const tools: ToolConfig[] = [
    {
      key: 'periods',
      label: 'Периоды',
      icon: CalendarRange,
      onPress: onPeriods,
    },
    {
      key: 'weeks',
      label: 'Недели',
      icon: CalendarDays,
      onPress: onWeeks,
    },
    {
      key: 'shifts',
      label: 'Смены',
      icon: CalendarSync,
      onPress: onShifts,
    },
    {
      key: 'reset',
      label: 'Сброс',
      icon: Trash2,
      variant: 'destructive',
      separated: true,
      onPress: onReset,
    },
  ];

  return (
    <View className="gap-1">
      <Text variant="h4">Инструменты заполнения</Text>

      <View className="flex-row justify-between items-center">
        {tools.map(tool => {
          const { key, ...props } = tool;
          return (
            <Fragment key={key}>
              {tool.separated && <Separator orientation="vertical" />}
              <VerticalIconButton {...props} />
            </Fragment>
          );
        })}
      </View>
    </View>
  );
};
