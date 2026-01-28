import React, { FC, useMemo, useCallback } from "react";
import { Linking } from "react-native";
import { getPluralWord } from "@/utils/plural";
import { ProfileCardView } from "@/screens/ContactDetails/components/ProfileCard/ProfileCardView";
import { CONTACTS } from "../../../test-store";

interface ProfileCardProps {
  id: string;
}

export const ProfileCard: FC<ProfileCardProps> = ({ id }) => {
  const contact = useMemo(() => CONTACTS.find((c) => c.id === id), [id]);

  const initials = useMemo(
    () =>
      contact?.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() ?? "",
    [contact?.name],
  );

  const experienceText = useMemo(() => {
    if (!contact) return "";
    const { experienceYears } = contact;
    return experienceYears === 0
      ? "Нет опыта"
      : `${experienceYears} ${getPluralWord(experienceYears, ["год", "года", "лет"])} опыта`;
  }, [contact]);

  const handleCall = useCallback(() => {
    if (contact?.phone) Linking.openURL(`tel:${contact.phone}`);
  }, [contact?.phone]);

  return contact ? (
    <ProfileCardView
      contact={contact}
      initials={initials}
      experienceText={experienceText}
      onCall={handleCall}
    />
  ) : null;
};
