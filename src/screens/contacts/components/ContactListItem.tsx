import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import { FC, useCallback } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { Contact } from '../../test-store';

interface ContactListItemProps {
  item: Contact;
  onDelete: (id: string) => void;
}

export const ContactListItem: FC<ContactListItemProps> = ({ item: contact, onDelete }) => {
  const router = useRouter();

  const screenWidth = Dimensions.get('window').width;

  const handlePress = useCallback(() => {
    router.push({
      pathname: '/contacts/ContactDetails',
      params: { id: contact.id, displayName: contact.name},
    });
  }, [router, contact.id, contact.name]);

  const handleDelete = useCallback(() => {
    onDelete(contact.id);
  }, [onDelete, contact.id]);

  const initials = contact.name.split(' ').map(word => word[0]).join('').toUpperCase();

  return (
    <Card className="mx-5 my-2.5 p-0 gap-0">
      <Pressable
        className="flex-row items-center p-6 active:opacity-70"
        onPress={handlePress}
      >
        <View className="flex-1 flex-row">
          <Avatar alt={contact.name} className="size-12 border border-border">
            {contact.avatar && (
              <AvatarImage source={{ uri: contact.avatar }} />
            )}
            <AvatarFallback>
              <Text>{initials}</Text>
            </AvatarFallback>
          </Avatar>

          <View className="ml-4">
            <Text className="text-lg font-semibold leading-tight">
              {contact.name}
            </Text>

            <Text className="text-sm text-muted-foreground">
              {contact.phone}
            </Text>
          </View>
        </View>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
            >
              <Icon as={Trash2} size={20} className="text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent
            style={{ width: screenWidth - 40, alignSelf: 'center' }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Удалить контакт?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>Отменить</Text>
              </AlertDialogCancel>
              <AlertDialogAction onPress={handleDelete}>
                <Text>Удалить</Text>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Pressable>
    </Card>
  );
}
