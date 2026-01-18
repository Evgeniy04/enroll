import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { TextField } from '@/components/ui/text-field';
import { Check, X } from 'lucide-react-native';
import { FC, RefObject, useState } from "react";
import { TextInput } from 'react-native';

interface TemplateFormProps {
  ref: RefObject<TextInput | null>;
  onCancel: () => void;
  onSubmit: (templateName: string) => void;
}

export const TemplateForm: FC<TemplateFormProps> = ({
  ref,
  onCancel,
  onSubmit,
}) => {
  const [ templateName, setTemplateName ] = useState('');

  const handleSubmit = () => {
    if (templateName.trim()) {
      onSubmit(templateName.trim());
      setTemplateName('');
    }
  };

  return (
    <Card className='dark:bg-black bg-gray-100'>
      <CardContent>
        <TextField
          nativeID="template-name"
          label="Название шаблона"
          placeholder="Например: Вождение"
          required
          value={templateName}
          onChangeText={setTemplateName}
          inputRef={ref}
        />
      </CardContent>

      <CardFooter className="flex-row-reverse gap-2">
        <Button className="flex-1" variant="outline" onPress={onCancel}>
          <Icon as={X} />
          <Text>Отмена</Text>
        </Button>

        <Button 
          className="flex-1" 
          onPress={handleSubmit}
          disabled={!templateName.trim()}
        >
          <Icon as={Check} className="text-primary-foreground" />
          <Text>Создать</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};