import React, { FC } from "react";
import { View } from "react-native";
import { Clock, MapPin } from "lucide-react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Contact } from "@/screens/test-store";

interface ProfileCardViewProps {
  contact: Contact;
  experienceText: string;
  initials: string;
  onCall: () => void;
}

export const ProfileCardView: FC<ProfileCardViewProps> = ({
  contact,
  experienceText,
  initials,
  onCall,
}) => (
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
              text={experienceText}
              className="mr-auto"
            />
          </View>
        </View>
      </View>

      <View className="flex-row items-center gap-1.5">
        <Icon as={MapPin} size={16} className="text-muted-foreground" />
        <Text className="text-sm text-muted-foreground" numberOfLines={2}>
          {contact.address}
        </Text>
      </View>
    </CardContent>

    <CardFooter>
      <Button variant="secondary" className="w-full" onPress={onCall}>
        <Text>Позвонить</Text>
      </Button>
    </CardFooter>
  </Card>
);
