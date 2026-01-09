import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import * as Linking from 'expo-linking';
import { Clock, MapPin } from "lucide-react-native";
import React, { FC, useMemo } from "react";
import { View } from "react-native";
import { CONTACTS } from "../../test-store";

interface ProfileCardProps {
  id: string;
}

export const ProfileCard: FC<ProfileCardProps> = ({ id }) => {
  const contact = useMemo(() => {
    const index = Number(id) - 1;
    return CONTACTS[index];
  }, [id]);

  const initials = useMemo(() => {
    return contact.name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase();
  }, [contact.name]);

  const handleCallPress = () => {
    Linking.openURL(`tel:${contact.phone}`);
  };

  const getExperienceText = (years: number) => {
    if (years === 0) return 'Нет опыта';

    const lastDigit = years % 10;
    const lastTwoDigits = years % 100;
    let yearsText: string;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      yearsText = `${years} лет опыта`;
    } else if (lastDigit === 1) {
      yearsText = `${years} год опыта`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      yearsText = `${years} года опыта`;
    } else {
      yearsText = `${years} лет опыта`;
    }

    return yearsText;
  };

  return (
    <Card className="m-5 items-center">
      <CardHeader>
        <Avatar alt={contact.name} className="size-32 border border-border">
          <AvatarImage source={{ uri: contact.avatar }} />
          <AvatarFallback>
            <Text>{initials}</Text>
          </AvatarFallback>
        </Avatar>
      </CardHeader>

      <CardContent className="gap-3 items-center">
        <Text variant="h3" className="text-center">
          {contact.name}
        </Text>

        <View className="items-center">
          <Text className="text-center text-sm">
            {contact.activity}
          </Text>
          <Text
            variant="code"
            className="text-center bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <Icon
              as={Clock}
              className="text-blue-700 dark:text-blue-300"
              style={{ transform: [{ translateY: 1 }] }}
            />{' '}
            {getExperienceText(contact.experienceYears)}
          </Text>
        </View>

        <Text className="text-center text-sm text-muted-foreground">
          <Icon
            as={MapPin}
            className="text-muted-foreground"
            style={{ transform: [{ translateY: 1 }] }}
          />{' '}
          {contact.address}
        </Text>
      </CardContent>

      <CardFooter>
        <Button className="w-full" onPress={handleCallPress}>
          <Text>Позвонить</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};
