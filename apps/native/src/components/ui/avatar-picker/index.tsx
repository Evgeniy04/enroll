import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SheetOption } from "@/components/ui/avatar-picker/SheetOption";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import {
  ImagePickerOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { Camera, Image, Pencil, Trash2, User } from "lucide-react-native";
import { FC, useRef } from "react";
import { Platform, View } from "react-native";
import Toast from "react-native-toast-message";

interface AvatarPickerProps {
  image: string;
  setImage: (value: string) => void;
}

export const AvatarPicker: FC<AvatarPickerProps> = ({ image, setImage }) => {
  const { colors } = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const sheet = useRef<TrueSheet>(null);

  const present = async () => await sheet.current?.present();
  const dismiss = async () => await sheet.current?.dismiss();

  const handleAction = (variant: "camera" | "gallery" | "delete") => {
    dismiss();
    if (variant === "delete") {
      setImage("");
    } else {
      pickImage(variant);
    }
  };

  const pickImage = async (variant: "gallery" | "camera") => {
    const requestPermission =
      variant === "gallery"
        ? requestMediaLibraryPermissionsAsync
        : requestCameraPermissionsAsync;
    const permissionResult = await requestPermission();

    if (!permissionResult.granted) {
      Toast.show({
        type: "error",
        props: {
          title: "Требуется разрешение",
          description: `Для доступа к ${variant === "gallery" ? "галерее" : "камере"} необходимо предоставить разрешение.`,
        },
        bottomOffset: bottomTabBarHeight,
      });
      return;
    }

    const options: ImagePickerOptions = {
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      shape: "oval",
    };

    const result =
      variant === "gallery"
        ? await launchImageLibraryAsync(options)
        : await launchCameraAsync(options);

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  return (
    <View className="relative m-5 self-center">
      <Avatar className="size-32" alt="Фото профиля">
        <AvatarImage source={{ uri: image.length ? image : undefined }} />
        <AvatarFallback>
          <Icon
            as={User}
            size={64}
            strokeWidth={1}
            className="text-muted-foreground"
          />
        </AvatarFallback>
      </Avatar>

      <Button
        onPress={present}
        variant="secondary"
        size="icon"
        className="absolute bottom-1 right-1 size-7 rounded-full border border-neutral-200 dark:border-neutral-700"
      >
        <Icon as={Pencil} />
      </Button>

      <TrueSheet
        ref={sheet}
        detents={["auto"]}
        backgroundColor={colors.border}
        style={{
          padding: 20,
          paddingTop: Platform.select({ ios: 15, android: 36 }),
          gap: 8,
        }}
      >
        <SheetOption
          label="Сделать фото"
          icon={Camera}
          onPress={() => handleAction("camera")}
        />

        <SheetOption
          label="Выбрать из галереи"
          icon={Image}
          onPress={() => handleAction("gallery")}
        />

        {image.length > 0 && (
          <SheetOption
            label="Удалить фото"
            icon={Trash2}
            isDestructive
            onPress={() => handleAction("delete")}
          />
        )}

        <SheetOption label="Закрыть меню" isDestructive onPress={dismiss} />
      </TrueSheet>
    </View>
  );
};
