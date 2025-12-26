import { Stack } from 'expo-router';

const ContactsStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="index" />
      <Stack.Screen name="ContactDetails" />
    </Stack>
  );
}

export default ContactsStack;
