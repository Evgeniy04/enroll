import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { useActionSheet } from '@expo/react-native-action-sheet';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import {
  ImagePickerOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { Pencil } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function Tab() {
  const colorScheme = useColorScheme() ?? 'light';
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const { colors } = useTheme();
  const bottomOffset = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const { showActionSheetWithOptions } = useActionSheet();
  const [ image, setImage ] = useState<string | undefined>('https://cdn4.telesco.pe/file/QNoXYjrUmnO0lP7gfdta7_fZCwxcI98l3IHGbng_Uqx9TDReF1WvOmioiNedXplibbo061k9ZjpHHIsrXEICRkiKUTFDtIcNTUZbRhKtrT0DjbAf8BU9IFHWAjpVxKjOaZj_cH_XOZ6DVAFALuS5csUi-FyGswFQ2ckiBClIbVnAJNuqOD5CZFjz-Wjd9NVTKBGUo1r-NL7MjMywHeEPHEOsS70rI6IOs2AbBs2XvvErpznCAymFCM2tc81Pdr6dzNA1lru14YpkRydVFCWOXmNHvnX43TyMHG2TAHYF1fi-OWvPnoLAzhygQ9YhKNbD_w9rp7cVeEf3bY_f8ahR5Q.jpg');

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
        bottomOffset,
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

    console.log(result);

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const openActionSheet = () => {
    showActionSheetWithOptions(
      {
        options: ['Сделать фото', 'Выбрать из галереи', 'Отмена'],
        cancelButtonIndex: 2,
        textStyle: { color: colors.text },
        containerStyle: { backgroundColor: colors.card, marginBottom: insets.bottom },
      },
      (index) => {
        if (index === 0) pickImage('camera');
        if (index === 1) pickImage('gallery');
      }
    );
  };

  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
    left: 12,
    right: 12,
  };

  const handleChangeDateTimePicker = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios'); // iOS оставляет picker открытым
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className='flex-1'>
      <ScrollView>
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
        <View className='m-5 gap-6'>
          <View className='gap-1.5'>
            <Label nativeID='surname'>Фамилия</Label>
            <Input
              textContentType='familyName'
              aria-labelledby='surname'
              placeholder='Введите вашу фамилию'
            />
          </View>
          <View className='gap-1.5'>
            <Label nativeID='name'>Имя</Label>
            <Input
              textContentType='givenName'
              aria-labelledby='name'
              placeholder='Введите ваше имя'
            />
          </View>
          <View className='gap-1.5'>
            <Label nativeID='patronymic'>Отчество</Label>
            <Input
              textContentType='middleName'
              aria-labelledby='patronymic'
              placeholder='Введите ваше отчество'
            />
          </View>
          <View className='gap-1.5'>
            <Label nativeID='email'>Электронная почта</Label>
            <Input
              textContentType='emailAddress'
              aria-labelledby='email'
              placeholder='Введите адрес электронной почты'
            />
          </View>
          <View className='gap-1.5'>
            <Label nativeID='phone-number'>Номер телефона</Label>
            <Input
              textContentType='telephoneNumber'
              aria-labelledby='phone-number'
              placeholder='Введите свой номер телефона'
            />
          </View>
          <View className='gap-1.5'>
            <Label nativeID='username'>Имя, по которому Вас смогут найти</Label>
            <Input
              textContentType='username'
              aria-labelledby='username'
              placeholder='Введите публичное имя пользователя'
            />
          </View>
        </View>
        <Card className='m-5'>
          <CardHeader>
            <CardTitle>Настройки профиля специалиста</CardTitle>
            <CardDescription>Выберите вид деятельности и заполните необходимые поля.</CardDescription>
          </CardHeader>
          <CardContent className='gap-6'>
            <View className='gap-1.5'>
              <Label nativeID='activity'>Вид деятельности</Label>
              <Select aria-labelledby='activity'>
                <SelectTrigger>
                  <SelectValue placeholder='Выберите вид деятельности' />
                </SelectTrigger>
                <SelectContent insets={contentInsets}>
                  <SelectGroup>
                    <SelectLabel>Деятельность</SelectLabel>
                    <SelectItem label='Мастер производственного обучения' value='driving_instructor'>
                      Мастер производственного обучения
                    </SelectItem>
                    <SelectItem label='Другое' value='other'>
                      Другое
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </View>
            <View className='gap-1.5'>
              <Label nativeID='license_categories'>Категории водительских прав</Label>
              <Input
                aria-labelledby='license_categories'
                placeholder='Введите название кат. водительских прав через запятую'
              />
            </View>
            <View className='gap-1.5'>
              <Label nativeID='driving-start-year'>Дата выдачи водительского удостоверения</Label>
              <Input
                aria-labelledby='license_categories'
                value={date.toLocaleDateString()}
                editable={false}
              />
              <Button
                aria-labelledby='driving-start-year'
                variant='outline'
                onPress={() => setShowPicker(true)}
              >
                <Text>Выбрать дату</Text>
              </Button>
              {showPicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display='spinner'
                  onChange={handleChangeDateTimePicker}
                  maximumDate={new Date()}
                />
              )}
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
