import { KeyboardAvoidingScreen } from "@/components/layout/KeyboardAvoidingScreen";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { Schedule } from "@/screens/Settings/Work/tabs/Schedule";
import { ServiceList } from "@/screens/Settings/Work/tabs/Services";
import { TemplateList } from "@/screens/Settings/Work/tabs/Templates";
import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export const WorkSettings = () => {
  const [value, setValue] = useState("services");

  return (
    <>
      <Stack.Screen
        options={{
          title: "Параметры работы",
        }}
      />
      <KeyboardAvoidingScreen>
        <View className="m-5">
          <Text variant="h3">Управление записью</Text>
          <Text>
            Настройте услуги, создайте шаблоны дня и примените их к расписанию
          </Text>
        </View>

        <Tabs value={value} onValueChange={setValue} className="m-5">
          <TabsList className="h-12 w-full justify-between">
            <TabsTrigger value="services" className="h-full">
              <Text>Услуги</Text>
            </TabsTrigger>
            <TabsTrigger value="day-templates" className="h-full">
              <Text>Шаблоны дня</Text>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="h-full">
              <Text>Расписание</Text>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <ServiceList />
          </TabsContent>

          <TabsContent value="day-templates">
            <TemplateList />
          </TabsContent>

          <TabsContent value="schedule">
            <Schedule />
          </TabsContent>
        </Tabs>
      </KeyboardAvoidingScreen>
    </>
  );
};
