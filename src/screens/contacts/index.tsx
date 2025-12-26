import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useRestoreTabsHeader } from '@/hooks/useRestoreTabsHeader';
import { useRouter } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import { FlatList, Pressable, View } from 'react-native';
import { CONTACTS } from './test-store';

export const Contacts = () => {
  useRestoreTabsHeader('Контакты');

  const router = useRouter();

  const renderItem = ({ item }: { item: typeof CONTACTS[0] }) => (
      <Card className="mx-5 my-2.5 p-0 gap-0">
        <Pressable
          className='flex-row items-center p-6 active:opacity-70'
          onPress={() => router.push({
            pathname: '/contacts/contact-details',
            params: { id: item.id } 
          })}
        >
          <View className='flex-1 flex-row'>
            <Avatar alt={item.name} className="h-12 w-12 border border-border">
              <AvatarImage source={{ uri: item.avatar }} />
              <AvatarFallback>
                <Text>{item.name.substring(0, 2).toUpperCase()}</Text>
              </AvatarFallback>
            </Avatar>
            <View className='ml-4'>
              <Text className="text-lg font-semibold leading-tight">{item.name}</Text>
              <Text className="text-sm text-muted-foreground">{item.phone}</Text>
            </View>
          </View>

          <Button
            variant="ghost"
            size="icon"
            onPress={(event) => {
              event.stopPropagation();
              console.log('Удалить', item.id);
            }}
          >
            <Icon as={Trash2} size={20} className="text-destructive" />
          </Button>
        </Pressable>
      </Card>
  );
  
  return (
    <FlatList
      data={CONTACTS}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}