import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { LucideIcon } from "lucide-react-native";
import React, { FC } from "react";
import { View } from "react-native";

interface InfoCardProps {
  title: string;
  icon: LucideIcon;
  items: { label: string; value: string }[];
  photoUri?: string;
}

export const InfoCard: FC<InfoCardProps> = ({
  title,
  icon,
  items,
  photoUri,
}) => {
  return (
    <Card className="m-5">
      <CardHeader className="flex-row gap-5">
        <Icon
          as={icon}
          size={22}
          className="text-muted-foreground"
        />
        <CardTitle className="align-middle">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="gap-5">
        {photoUri && (
          <Avatar alt="Фотография" className="size-32 border border-border mx-auto">
            <AvatarImage source={{ uri: photoUri }} />
          </Avatar>
        )}

        {items.map((item, idx) => (
          <View key={idx}>
            <Text variant='muted' className="text-muted-foreground">{item.label}</Text>
            <Text variant='default' className="text-foreground">{item.value}</Text>
          </View>
        ))}
      </CardContent>
    </Card>
  );
};
