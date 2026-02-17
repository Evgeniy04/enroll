import { useAppForm } from "@/hooks/forms/form";
import { useContentInsets } from "@/hooks/useContentInsets";

export const DrivingInstructorForm = () => {
  const contentInsets = useContentInsets();
  const form = useAppForm({});

  return (
    <>
      <form.AppField name="address">
        {({ InputField }) => (
          <InputField
            label="Где проходят занятия?"
            placeholder="Город, район или адрес"
            autoComplete="street-address"
            maxLength={257}
          />
        )}
      </form.AppField>
      <form.AppField name="addressNote">
        {({ TextareaField }) => (
          <TextareaField
            label="Как вас найти?"
            placeholder="Встреча у выхода №1 из метро или на парковке ТЦ"
            description="Укажите ориентиры, чтобы ученик не потерялся"
            maxLength={501}
          />
        )}
      </form.AppField>
      <form.AppField name="drivingExperienceStart">
        {({ DatePickerField }) => (
          <DatePickerField
            label="Водительский стаж с..."
            description="Когда вы получили своё первое водительское удостоверение?"
            contentInsets={contentInsets}
          />
        )}
      </form.AppField>
      <form.AppField name="workExperienceStart">
        {({ DatePickerField }) => (
          <DatePickerField
            label="Опыт инструктора с..."
            description="Когда вы провели своё первое занятие?"
            contentInsets={contentInsets}
          />
        )}
      </form.AppField>
    </>
  );
};
