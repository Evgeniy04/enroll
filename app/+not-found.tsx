import { buttonTextVariants, buttonVariants } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Link, Stack } from 'expo-router';
import { cssInterop } from "nativewind";
import { View } from 'react-native';

cssInterop(EvilIcons, {
  className: {
    target: "style",
  },
});

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Ой! Не найдено' }} />

      <View className='flex-1 items-center'>
        <View className='h-2/3 justify-center items-center'>
          <EvilIcons name="search" size={256} className="text-black dark:text-white" />
          <Text variant='h3'>Ошибка 404!</Text>
          <Text variant='blockquote'>Кажется, вы&nbsp;заблудились.</Text>
        </View>
        
        <View className='flex-1 justify-start'>
          <Link href="/" className={buttonVariants({ variant: 'default' })}>
            <Text className={buttonTextVariants({ variant: 'default' })}>Вернуться на&nbsp;главную страницу</Text>
          </Link>
        </View>
      </View>
    </>
  );
}
