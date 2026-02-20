import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { User } from "@/screens/test-store";
import { getInitials } from "@/utils/initials";
import { FC } from "react";
import { Linking, View } from "react-native";

interface HeaderCardProps {
  user: User;
}

export const HeaderCard: FC<HeaderCardProps> = ({ user }) => {
  const handleCall = () => {
    if (user?.phoneNumber) Linking.openURL(`tel:${user.phoneNumber}`);
  };

  return user ? (
    <Card className="m-5">
      <CardContent className="gap-4">
        <View className="flex-row gap-4">
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            className="size-24 border border-border"
          >
            <AvatarImage source={{ uri: user.image ?? undefined }} />
            <AvatarFallback>
              <Text>{getInitials(user.firstName, user.lastName)}</Text>
            </AvatarFallback>
          </Avatar>

          <View className="flex-1 justify-center gap-2">
            <Text variant="h3" numberOfLines={1}>
              {`${user.firstName} ${user.lastName}`}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-1.5">
          <Text className="flex-1 text-sm text-muted-foreground">
            {user.about}
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
