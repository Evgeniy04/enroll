import { KeyboardAvoidingScreen } from '@/components/layout/KeyboardAvoidingScreen';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Template } from '@/screens/Settings/Work/tabs/Templates/Templates.types';
import { TemplateForm } from '@/screens/Settings/Work/tabs/Templates/components/TemplateForm';
import { Plus } from 'lucide-react-native';
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { TextInput, View } from 'react-native';

export const ScheduleBuilder: FC = () => {
  const [ visibleForm, setIsVisibleForm ] = useState(false);
  const [ templates, setTemplates ] = useState<Template[]>([]);
  const templateNameRef = useRef<TextInput>(null);

  const handleOpenFormPress = useCallback(() => {
    setIsVisibleForm(true);
  }, []);

  const handleCancelFormPress = useCallback(() => {
    setIsVisibleForm(false);
  }, []);

  const handleCreateFormPress = useCallback((templateName: string) => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: templateName,
      slots: [],
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    handleCancelFormPress();
  }, [handleCancelFormPress]);

  useEffect(() => {
    if (visibleForm) {
      requestIdleCallback(() => {
        setTimeout(() => templateNameRef.current?.focus(), 50);
      });
    }
  }, [visibleForm]);

  return (
    <KeyboardAvoidingScreen>
      <Card>
        <CardHeader className="flex-row justify-between">
          <View className="flex-1">
            <CardTitle>Шаблоны дня</CardTitle>
          </View>

          {!visibleForm && (
            <Button size="icon" onPress={handleOpenFormPress}>
              <Icon as={Plus} className="text-primary-foreground" />
            </Button>
          )}
        </CardHeader>

        <CardContent className="gap-5">
          {visibleForm && (
            <TemplateForm
              ref={templateNameRef}
              onCancel={handleCancelFormPress}
              onSubmit={handleCreateFormPress}
            />
          )}
          
          {templates.length === 0 ? (
            <Card className="flex-row justify-center items-center border-dashed gap-0">
              <Text variant="muted" className="text-center text-muted-foreground">
                Создайте первый шаблон, нажав
              </Text>
              <Text variant="code" className="px-2 ml-2">+</Text>
            </Card>
          ) : (null)}
        </CardContent>
      </Card>
    </KeyboardAvoidingScreen>
  );
};