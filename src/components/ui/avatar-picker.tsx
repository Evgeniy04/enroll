import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import {
  ImagePickerOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { Pencil } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';

interface AvatarPickerProps {
  image?: string;
  setImage: (value?: string) => void
}

export const AvatarPicker: FC<AvatarPickerProps> = ({image, setImage}) => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const { bottom: bottomSafeAreaInsets } = useSafeAreaInsets();
  const { colors } = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = () => {
    showActionSheetWithOptions(
      {
        options: [
          'Сделать фото',
          'Выбрать из галереи',
          image ? 'Удалить фото' : undefined,
          'Отмена',
        ].filter(Boolean) as string[],
        cancelButtonIndex: image ? 3 : 2,
        destructiveButtonIndex: image ? 2 : undefined,
        textStyle: { color: colors.text },
        containerStyle: {
          backgroundColor: colors.card,
          marginBottom: bottomSafeAreaInsets,
        },
      },
      (index) => {
        if (index === 0) pickImage('camera');
        if (index === 1) pickImage('gallery');
        if (image && index === 2) setImage(undefined);
      }
    );
  };

  const pickImage = async (variant: 'gallery' | 'camera') => {
    const requestPermission =
      variant === 'gallery'
        ? requestMediaLibraryPermissionsAsync
        : requestCameraPermissionsAsync;
    const permissionResult = await requestPermission();

    if (!permissionResult.granted) {
      Toast.show({
        type: 'error',
        props: {
          title: 'Требуется разрешение',
          description: `Для доступа к ${variant === 'gallery' ? 'галерее' : 'камере'} необходимо предоставить разрешение.`,
        },
        bottomOffset: bottomTabBarHeight,
      });
      return;
    }

    const options: ImagePickerOptions = {
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      shape: 'oval',
    };

    const result =
      variant === 'gallery'
        ? await launchImageLibraryAsync(options)
        : await launchCameraAsync(options);

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  return (
    <View className="relative self-center m-5">
      <Avatar className='size-32' alt="Фото профиля">
        <AvatarImage source={{ uri: image }} />
        <AvatarFallback>
          <Text>Фото профиля</Text>
        </AvatarFallback>
      </Avatar>
      <Button
        onPress={openActionSheet}
        variant='outline'
        size="icon"
        className="
          absolute
          bottom-1
          right-1
          size-7
          rounded-full
          shadow-md
        "
      >
        <Icon as={Pencil} />
      </Button>
    </View>
  )
}