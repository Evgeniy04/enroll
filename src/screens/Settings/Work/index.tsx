import { KeyboardAvoidingScreen } from '@/components/layout/KeyboardAvoidingScreen';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
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
      <KeyboardAvoidingScreen className='p-5'>
        <View className='mb-5'>
          <Text variant='h3'>Управление записью</Text>
          <Text>Настройте услуги, создайте шаблоны дня и примените их к расписанию</Text>
        </View>

        <Tabs value={value} onValueChange={setValue}>
          <TabsList className="w-full justify-between">
            <TabsTrigger value="services">
              <Text>Услуги</Text>
            </TabsTrigger>
            <TabsTrigger value="day-templates">
              <Text>Шаблоны дня</Text>
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Text>Расписание</Text>
            </TabsTrigger>
          </TabsList>
  
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Управление услугами</CardTitle>
                <CardDescription>
                  Создайте услуги, которые будут доступны для записи.
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-6">
                <View className="gap-3">
                  <Label htmlFor="tabs-demo-name">Name</Label>
                  <Input id="tabs-demo-name" defaultValue="Michael Scott" />
                </View>
                <View className="gap-3">
                  <Label htmlFor="tabs-demo-message">Message</Label>
                  <Input id="tabs-demo-message" defaultValue="Where are the turtles?!" />
                </View>
              </CardContent>
              <CardFooter>
                <Button>
                  <Text>Submit feedback</Text>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
  
          <TabsContent value="day-templates">
            <Card>
              <CardHeader>
                <CardTitle>Шаблоны дня</CardTitle>
                <CardDescription>
                  Answer a few quick questions to help improve the demo.
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-6">
                <View className="gap-3">
                  <Label htmlFor="tabs-demo-job-title">Job Title</Label>
                  <Input id="tabs-demo-job-title" defaultValue="Regional Manager" />
                </View>
                <View className="gap-3">
                  <Label htmlFor="tabs-demo-favorite">Favorite feature</Label>
                  <Input id="tabs-demo-favorite" defaultValue="CLI" />
                </View>
              </CardContent>
              <CardFooter>
                <Button>
                  <Text>Submit survey</Text>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Расписание</CardTitle>
                <CardDescription>
                  Управляй недельным расписанием и исключениями
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-6">
                <View className="gap-3">
                  <Label htmlFor="tabs-demo-job-title">Job Title</Label>
                  <Input id="tabs-demo-job-title" defaultValue="Regional Manager" />
                </View>
                <View className="gap-3">
                  <Label htmlFor="tabs-demo-favorite">Favorite feature</Label>
                  <Input id="tabs-demo-favorite" defaultValue="CLI" />
                </View>
              </CardContent>
              <CardFooter>
                <Button>
                  <Text>Submit survey</Text>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </KeyboardAvoidingScreen>
    </>
  );
}