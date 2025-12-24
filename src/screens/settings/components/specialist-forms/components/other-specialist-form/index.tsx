import { TextField } from '@/components/forms/text-field';

export const OtherSpecialistForm = () => {
  return (
    <>
      <TextField
        nativeID="specialization"
        label="Специализация"
        placeholder="Укажите вашу специализацию"
      />

      <TextField
        nativeID="description"
        label="Описание деятельности"
        placeholder="Кратко опишите вашу деятельность"
        multiline
        numberOfLines={4}
      />

      <TextField
        nativeID="certifications"
        label="Информация о Вас в свободной форме"
        placeholder="Перечислите необходимую информацию"
      />
    </>
  );
};