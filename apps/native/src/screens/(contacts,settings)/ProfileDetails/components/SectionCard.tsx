import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import React, { FC } from "react";
import { FlatList } from "react-native";
import { Section } from "../types";

export const SectionCard: FC<Section> = ({ title, icon, fields, photoUri }) => {
  return (
    <Card className="m-5">
      <CardHeader className="flex-row gap-5">
        <Icon as={icon} size={22} className="text-muted-foreground" />
        <CardTitle className="align-middle">{title}</CardTitle>
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
      </CardContent>
    </Card>
  );
};
