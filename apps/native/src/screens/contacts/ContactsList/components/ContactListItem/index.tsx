import { useConfirm } from "@/hooks/dialogs/useConfirm";
import { ContactCard } from "@/screens/contacts/ContactsList/components/ContactListItem/ContactCard";
import { ContactContextMenu } from "@/screens/contacts/ContactsList/components/ContactListItem/ContactContextMenu";
import { User } from "@/screens/test-store";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { FC } from "react";

interface ContactListItemProps {
  item: User;
  onDelete: (id: string) => void;
}

export const ContactListItem: FC<ContactListItemProps> = ({
  item: contact,
  onDelete,
}) => {
  const router = useRouter();
  const { confirm, ConfirmDialogElement } = useConfirm();

  const handlePress = () => {
    router.push({
      pathname: "/ProfileDetails",
      params: { id: contact.id },
    });
  };

  const handleCallPress = () => {
    Linking.openURL(`tel:${contact.phoneNumber}`);
  };

  const handleLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleDeleteMenuPress = () => {
    confirm({
      title: "Удалить контакт?",
      cancelText: "Отменить",
      confirmText: "Подтвердить",
      onConfirm: () => onDelete(contact.id),
    });
  };

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
