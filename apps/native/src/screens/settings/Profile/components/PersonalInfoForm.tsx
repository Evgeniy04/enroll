import { withForm } from "@/hooks/forms/form";
import { View } from "react-native";
import { formOpts } from "../sharedForm";

export const PersonalInfoForm = withForm({
  ...formOpts,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField name="image">
          {({ AvatarPickerField }) => <AvatarPickerField />}
        </form.AppField>

        <View className="m-5 gap-6">
          <form.AppField name="firstName">
            {({ InputField }) => (
              <InputField
                label="Имя"
                placeholder="Введите имя"
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
                placeholder="Введите фамилию"
                autoComplete="family-name"
                maxLength={51}
              />
            )}
          </form.AppField>
          <form.AppField name="username">
            {({ InputField }) => (
              <InputField
                label="Имя пользователя"
                placeholder="username"
                autoComplete="username"
                maxLength={31}
              />
            )}
          </form.AppField>
          <form.AppField name="about">
            {({ TextareaField }) => (
              <TextareaField
                label="О себе"
                placeholder="Расскажите немного о себе..."
                maxLength={501}
              />
            )}
          </form.AppField>
        </View>
      </>
    );
  },
});
