import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { CONTACTS } from "@/screens/test-store";
import { getPluralWord } from "@/utils/plural";
import { Clock, MapPin } from "lucide-react-native";
import React, { FC } from "react";
import { Linking, View } from "react-native";

interface HeaderCardProps {
  id: string;
}

export const HeaderCard: FC<HeaderCardProps> = ({ id }) => {
  const contact = CONTACTS.find((c) => c.id === id);

  const initials =
    contact?.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "";

  const getExperienceText = () => {
    if (!contact) return "";
    const { experienceYears } = contact;
    return experienceYears === 0
      ? "Нет опыта"
      : `${experienceYears} ${getPluralWord(experienceYears, ["год", "года", "лет"])} опыта`;
  };

  const handleCall = () => {
    if (contact?.phone) Linking.openURL(`tel:${contact.phone}`);
  };

  return contact ? (
    <Card className="m-5">
      <CardContent className="gap-4">
        <View className="flex-row gap-4">
          <Avatar alt={contact.name} className="size-24 border border-border">
            <AvatarImage source={{ uri: contact.avatar }} />
            <AvatarFallback>
              <Text>{initials}</Text>
            </AvatarFallback>
          </Avatar>

          <View className="flex-1 gap-2">
            <Text variant="h3" numberOfLines={1}>
              {contact.name}
            </Text>
            <View className="gap-1">
              <Text variant="large" className="text-sm">
                {contact.activity}
              </Text>
              <Badge
                variant="info"
                icon={Clock}
                text={getExperienceText()}
                className="mr-auto"
              />
            </View>
          </View>
        </View>

        <View className="flex-row items-center gap-1.5">
          <Icon as={MapPin} size={16} className="text-muted-foreground" />
          <Text
            className="flex-1 text-sm text-muted-foreground"
            numberOfLines={2}
          >
            {contact.address}
          </Text>
        </View>
      </CardContent>

      <CardFooter>
        <Button variant="secondary" className="w-full" onPress={handleCall}>
          <Text>Позвонить</Text>
        </Button>
      </CardFooter>
    </Card>
  ) : null;
};
