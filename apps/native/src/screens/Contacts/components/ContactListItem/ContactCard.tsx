import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Phone } from "lucide-react-native";
import { FC, useMemo } from "react";
import { Pressable, View } from "react-native";
import { Contact } from "../../../test-store";

interface ContactCardProps {
  contact: Contact;
  onPress: () => void;
  onLongPress: () => void;
  onCallPress: () => void;
}

export const ContactCard: FC<ContactCardProps> = ({
  contact,
  onPress,
  onLongPress,
  onCallPress,
}) => {
  const initials = useMemo(
    () =>
      contact.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase(),
    [contact.name],
  );

  return (
    <Pressable
      className="mx-5 my-2.5 active:opacity-70"
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Card className="flex-row items-center p-6">
        <View className="flex-1 flex-row">
          <Avatar alt={contact.name} className="size-12 border border-border">
            <AvatarImage
              source={{ uri: contact.avatar, cache: "force-cache" }}
            />
            <AvatarFallback>
              <Text>{initials}</Text>
            </AvatarFallback>
          </Avatar>

          <View className="ml-4">
            <Text className="text-lg font-semibold leading-tight">
              {contact.name}
            </Text>

            <Text className="text-sm text-muted-foreground">
              {contact.phone}
            </Text>
          </View>
        </View>

        <Button variant="default" size="icon" onPress={onCallPress}>
          <Icon as={Phone} className="text-primary-foreground" />
        </Button>
      </Card>
    </Pressable>
  );
};
