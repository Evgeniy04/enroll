import { AvatarPicker } from "@/components/ui/avatar-picker";
import { TextField } from "@/components/ui/text-field";
import { useState } from "react";
import { View } from "react-native";

export const PersonalInfoForm = () => {
  const [image, setImage] = useState<string | undefined>(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSweN5K2yaBwZpz5W9CxY9S41DI-2LawmjzYw&s",
  );

  return (
    <>
      <AvatarPicker image={image} setImage={setImage} />

      <View className="m-5 gap-6">
        <TextField
          nativeID="surname"
          label="Фамилия"
          placeholder="Введите вашу фамилию"
          autoComplete="family-name"
          required
        />
        <TextField
          nativeID="name"
          label="Имя"
          placeholder="Введите ваше имя"
          autoComplete="given-name"
          required
        />
        <TextField
          nativeID="patronymic"
          label="Отчество"
          placeholder="Введите ваше отчество"
          autoComplete="additional-name"
          required
        />
        <TextField
          nativeID="email"
          label="Электронная почта"
          placeholder="Введите адрес электронной почты"
          autoComplete="email"
          required
        />
        <TextField
          nativeID="phone-number"
          label="Номер телефона"
          placeholder="Введите свой номер телефона"
          autoComplete="tel"
          required
        />
        <TextField
          nativeID="username"
          label="Имя, по которому Вас смогут найти"
          placeholder="Введите публичное имя пользователя"
          autoComplete="username"
          required
        />
      </View>
    </>
  );
};
