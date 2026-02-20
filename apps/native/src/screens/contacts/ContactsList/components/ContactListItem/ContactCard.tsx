import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { User } from "@/screens/test-store";
import { getInitials } from "@/utils/initials";
import { Phone } from "lucide-react-native";
import { FC } from "react";
import { Pressable, View } from "react-native";

interface ContactCardProps {
  contact: User;
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
  return (
    <Pressable
      className="mx-5 my-2.5 active:opacity-70"
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Card className="flex-row items-center p-6">
        <View className="flex-1 flex-row">
          <Avatar
            alt={`${contact.firstName} ${contact.lastName}`}
            className="size-12 border border-border"
          >
            <AvatarImage
              source={{ uri: contact.image ?? undefined, cache: "force-cache" }}
            />
            <AvatarFallback>
              <Text>{getInitials(contact.firstName, contact.lastName)}</Text>
            </AvatarFallback>
          </Avatar>

          <View className="ml-4">
            <Text className="text-lg font-semibold leading-tight">
              {`${contact.firstName} ${contact.lastName}`}
            </Text>

            <Text className="text-sm text-muted-foreground">
              {contact.phoneNumber}
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
