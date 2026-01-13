import { ContactCard } from '@/screens/Contacts/components/ContactListItem/ContactCard';
import { ContactContextMenu } from '@/screens/Contacts/components/ContactListItem/ContactContextMenu';
import { ContactDeleteDialog } from '@/screens/Contacts/components/ContactListItem/ContactDeleteDialog';
import * as Haptics from 'expo-haptics';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { FC, useCallback, useState } from 'react';
import { Contact } from '../../../test-store';

interface ContactListItemProps {
  item: Contact;
  onDelete: (id: string) => void;
}

export const ContactListItem: FC<ContactListItemProps> = ({ item: contact, onDelete }) => {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handlePress = useCallback(() => {
    router.push({
      pathname: '/contacts/ContactDetails',
      params: { id: contact.id, displayName: contact.name},
    });
  }, [router, contact.id, contact.name]);

  const handleCallPress = useCallback(() => {
    Linking.openURL(`tel:${contact.phone}`);
  }, [contact.phone]);

  const handleLongPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const handleDeletePress = useCallback(() => {
    setIsDeleteDialogOpen(false);
    onDelete(contact.id);
  }, [onDelete, contact.id]);

  const handleDeleteMenuPress = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, []);

  return (
    <>
      <ContactContextMenu onDeletePress={handleDeleteMenuPress}>
        <ContactCard
          contact={contact}
          onPress={handlePress}
          onLongPress={handleLongPress}
          onCallPress={handleCallPress}
        />
      </ContactContextMenu>

      <ContactDeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeletePress}
      />
    </>
  );
};