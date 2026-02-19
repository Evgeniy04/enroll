import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Eye, EyeOff, Plus } from "lucide-react-native";
import React, { FC } from "react";
import { FlatList, Pressable, View } from "react-native";
import { Section } from "../types";

export const SectionCard: FC<Section> = ({ title, icon, fields, photoUri }) => {
  return (
    <Card className="m-5">
      <CardHeader className="flex-row items-center justify-between gap-8">
        <View className="flex-1 flex-row items-center gap-5">
          <Icon as={icon} size={22} className="text-muted-foreground" />
          <CardTitle className="flex-1" numberOfLines={1}>
            {title}
          </CardTitle>
        </View>
        <Pressable hitSlop={20} className="active:opacity-10">
          <Icon as={true ? EyeOff : Eye} size={22} />
        </Pressable>
      </CardHeader>

      <CardContent className="gap-5">
        {photoUri && (
          <Avatar
            alt="Фотография"
            className="mx-auto size-32 border border-border"
          >
            <AvatarImage source={{ uri: photoUri }} />
          </Avatar>
        )}

        <FlatList
          data={fields}
          renderItem={({ item }) => (
            <>
              <Text variant="muted" className="text-muted-foreground">
                {item.label}
              </Text>
              <Text variant="default" className="text-foreground">
                {item.value}
              </Text>
            </>
          )}
          keyExtractor={(item) => item.id}
          className="gap-5"
        />

        <Button variant="secondary">
          <Icon as={Plus} />
          <Text>Добавить поле</Text>
        </Button>
      </CardContent>
    </Card>
  );
};
