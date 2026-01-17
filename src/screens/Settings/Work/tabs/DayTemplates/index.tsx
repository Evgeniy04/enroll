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
import { Text } from '@/components/ui/text';
import { FC } from "react";
import { View } from 'react-native';

export const ScheduleBuilder: FC = () => {
  return (
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
  );
};