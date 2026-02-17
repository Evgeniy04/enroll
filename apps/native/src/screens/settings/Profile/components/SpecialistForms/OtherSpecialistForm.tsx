import { useAppForm } from "@/hooks/forms/form";

export const OtherSpecialistForm = () => {
  const form = useAppForm({});

  return (
    <>
      <form.AppField name="firstName">
        {({ InputField }) => (
          <InputField
            label="Специализация"
            placeholder="Графический дизайнер"
            maxLength={101}
            required
          />
        )}
      </form.AppField>
      <form.AppField name="lastName">
        {({ InputField }) => (
          <InputField
            label="Ниша или направление"
            placeholder="Логотипы и фирменный стиль"
            maxLength={101}
          />
        )}
      </form.AppField>
      <form.AppField name="about">
        {({ TextareaField }) => (
          <TextareaField
            label="Информация о себе"
            placeholder="Расскажите подробнее о вашем опыте в рамках специализации..."
            maxLength={501}
          />
        )}
      </form.AppField>
    </>
  );
};
