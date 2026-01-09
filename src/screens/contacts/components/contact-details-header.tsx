import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import * as Linking from 'expo-linking';
import { Clock, MapPin } from "lucide-react-native";
import React, { FC, useMemo } from "react";
import { View } from "react-native";
import { CONTACTS } from "../test-store";

interface ContactDetailsHeaderProps {
  id: string;
}

export const ContactDetailsHeader: FC<ContactDetailsHeaderProps> = ({ id }) => {
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
            Мастер производственного обучения
          </Text>
          <Text variant="code" className="text-center text-blue-700 bg-blue-50">
            <Icon
              as={Clock}
              className="text-blue-700"
              style={{ transform: [{ translateY: 1 }] }}
            />{' '}
            6&nbsp;лет&nbsp;опыта
          </Text>
        </View>

        <Text className="text-center text-sm text-muted-foreground">
          <Icon
            as={MapPin}
            className="text-muted-foreground"
            style={{ transform: [{ translateY: 1 }] }}
          />{' '}
          г. Томск, Октябрьский р-н, ул. Иркутский тракт 118/1
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
