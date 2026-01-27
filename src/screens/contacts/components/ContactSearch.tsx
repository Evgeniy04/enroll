import { TextField } from "@/components/ui/text-field";
import { View } from "react-native";

export const ContactSearch = () => {
  return (
    <View className="mx-5 mb-5 mt-2.5">
      <TextField
        nativeID="contacts_search"
        label="Поиск контактов"
        placeholder="Например: Иван Иванов"
      />
    </View>
  );
};
