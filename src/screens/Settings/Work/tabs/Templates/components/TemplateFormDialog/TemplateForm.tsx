import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { TextField } from '@/components/ui/text-field';
import { Check, X } from 'lucide-react-native';
import { FC, useEffect, useState } from "react";
import { View } from 'react-native';
import { Template } from '../../Templates.types';

interface TemplateFormProps {
  initialData: Template | null;
  onSubmit: (template: Template) => void;
}

export const TemplateForm: FC<TemplateFormProps> = ({ onSubmit, initialData }) => {
  const [ name, setName ] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    } else {
      setName('');
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit({ id: initialData ? initialData.id : '', name, slots: [] });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{initialData ? 'Редактировать услугу' : 'Новая услуга'}</DialogTitle>
      </DialogHeader>

      <View className="gap-6">
        <TextField
          nativeID="template-name"
          label="Название шаблона"
          placeholder="Например: Вождение"
          required
          value={name}
          onChangeText={setName}
        />
      </View>

      <DialogFooter className="flex-row-reverse">
        <DialogClose asChild>
          <Button className="flex-1" variant="outline">
            <Icon as={X} />
            <Text>Отмена</Text>
          </Button>
        </DialogClose>

        <DialogClose asChild>
          <Button className="flex-1" onPress={handleSubmit} disabled={!name.trim()}>
            <Icon as={Check} className="text-primary-foreground" />
            <Text>{initialData ? 'Сохранить' : 'Создать'}</Text>
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};