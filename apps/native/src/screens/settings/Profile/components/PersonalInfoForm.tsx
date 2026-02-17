import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useAppForm } from "@/hooks/forms/form";
import { updateUserSchema } from "@enroll/auth/schemas";
import { Check } from "lucide-react-native";

export const PersonalInfoForm = () => {
  const form = useAppForm({
    defaultValues: {
      image: "",
      firstName: "",
      lastName: "",
      username: "",
      about: "",
    },
    validators: {
      onChange: updateUserSchema,
    },
  });

  return (
    <>
      <form.AppField name="image">
        {({ AvatarPickerField }) => <AvatarPickerField />}
      </form.AppField>

      <form.AppField name="firstName">
        {({ InputField }) => (
          <InputField
            label="Имя"
            placeholder="Иван"
            autoComplete="given-name"
            maxLength={51}
            required
          />
        )}
      </form.AppField>
      <form.AppField name="lastName">
        {({ InputField }) => (
          <InputField
            label="Фамилия"
            placeholder="Иванов"
            autoComplete="family-name"
            maxLength={51}
          />
        )}
      </form.AppField>
      <form.AppField name="username">
        {({ InputField }) => (
          <InputField
            label="Имя пользователя (username)"
            placeholder="@username"
            description="По этому имени вас смогут найти другие пользователи"
            autoComplete="username"
            maxLength={31}
          />
        )}
      </form.AppField>
      <form.AppField name="about">
        {({ TextareaField }) => (
          <TextareaField
            label="Коротко о себе"
            placeholder="Расскажите о своих интересах или профессиональных навыках..."
            maxLength={501}
          />
        )}
      </form.AppField>

      <form.Subscribe
        selector={({ isDefaultValue, canSubmit, isSubmitting }) => ({
          isDisabled: isDefaultValue || !canSubmit || isSubmitting,
        })}
      >
        {({ isDisabled }) => (
          <Button disabled={isDisabled} onPress={() => form.handleSubmit()}>
            <Icon as={Check} className="text-primary-foreground" />
            <Text>Сохранить изменения</Text>
          </Button>
        )}
      </form.Subscribe>
    </>
  );
};
