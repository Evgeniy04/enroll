import { KeyboardAvoidingScreen } from '@/components/layout/KeyboardAvoidingScreen';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { WeeklyCalendar } from '@/screens/Settings/Work/tabs/Schedule';
import { ServiceManager } from '@/screens/Settings/Work/tabs/Services';
import { ScheduleBuilder } from '@/screens/Settings/Work/tabs/Templates';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export const WorkSettings = () => {
  const [value, setValue] = useState('services');

  return (
    <>
      <Stack.Screen
        options={{
          title: "Параметры работы",
        }}
      />
      <KeyboardAvoidingScreen>
        <View className='m-5'>
          <Text variant='h3'>Управление записью</Text>
          <Text>Настройте услуги, создайте шаблоны дня и примените их к расписанию</Text>
        </View>

        <Tabs value={value} onValueChange={setValue} className='m-5'>
          <TabsList className="w-full justify-between h-12">
            <TabsTrigger value="services" className='h-full'>
              <Text>Услуги</Text>
            </TabsTrigger>
            <TabsTrigger value="day-templates" className='h-full'>
              <Text>Шаблоны дня</Text>
            </TabsTrigger>
            <TabsTrigger value="schedule" className='h-full'>
              <Text>Расписание</Text>
            </TabsTrigger>
          </TabsList>
  
          <TabsContent value="services">
            <ServiceManager />
          </TabsContent>
  
          <TabsContent value="day-templates">
            <ScheduleBuilder />
          </TabsContent>

          <TabsContent value="schedule">
            <WeeklyCalendar />
          </TabsContent>
        </Tabs>
      </KeyboardAvoidingScreen>
    </>
  );
};