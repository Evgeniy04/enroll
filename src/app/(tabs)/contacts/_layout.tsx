import { Stack } from 'expo-router';

const ContactsStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="index" />
      <Stack.Screen name="contact-details" />
    </Stack>
  );
}

export default ContactsStack;
