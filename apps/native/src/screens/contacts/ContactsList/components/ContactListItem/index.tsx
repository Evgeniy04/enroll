import { useConfirm } from "@/hooks/useConfirm";
import { ContactCard } from "@/screens/contacts/ContactsList/components/ContactListItem/ContactCard";
import { ContactContextMenu } from "@/screens/contacts/ContactsList/components/ContactListItem/ContactContextMenu";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { FC, useCallback } from "react";
import { Contact } from "../../../../test-store";

interface ContactListItemProps {
  item: Contact;
  onDelete: (id: string) => void;
}

export const ContactListItem: FC<ContactListItemProps> = ({
  item: contact,
  onDelete,
}) => {
  const router = useRouter();
  const { confirm, ConfirmDialogElement } = useConfirm();

  const handlePress = useCallback(() => {
    router.push({
      pathname: "/contacts/ContactDetails",
      params: { id: contact.id, displayName: contact.name },
    });
  }, [router, contact.id, contact.name]);

  const handleCallPress = useCallback(() => {
    Linking.openURL(`tel:${contact.phone}`);
  }, [contact.phone]);

  const handleLongPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const handleDeleteMenuPress = useCallback(() => {
    confirm({
      title: "Удалить контакт?",
      cancelText: "Отменить",
      confirmText: "Подтвердить",
      onConfirm: () => onDelete(contact.id),
    });
  }, [confirm, onDelete, contact.id]);

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

      {ConfirmDialogElement}
    </>
  );
};
