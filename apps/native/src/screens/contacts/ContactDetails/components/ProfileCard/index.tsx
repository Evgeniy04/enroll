import { ProfileCardView } from "@/screens/contacts/ContactDetails/components/ProfileCard/ProfileCardView";
import { CONTACTS } from "@/screens/test-store";
import { getPluralWord } from "@/utils/plural";
import React, { FC } from "react";
import { Linking } from "react-native";

interface ProfileCardProps {
  id: string;
}

export const ProfileCard: FC<ProfileCardProps> = ({ id }) => {
  const contact = CONTACTS.find((c) => c.id === id);

  const initials =
    contact?.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "";

  const getExperienceText = () => {
    if (!contact) return "";
    const { experienceYears } = contact;
    return experienceYears === 0
      ? "Нет опыта"
      : `${experienceYears} ${getPluralWord(experienceYears, ["год", "года", "лет"])} опыта`;
  };

  const handleCall = () => {
    if (contact?.phone) Linking.openURL(`tel:${contact.phone}`);
  };

  return contact ? (
    <ProfileCardView
      contact={contact}
      initials={initials}
      experienceText={getExperienceText()}
      onCall={handleCall}
    />
  ) : null;
};
