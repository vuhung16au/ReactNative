import { Redirect } from 'expo-router';

export default function RootLayout() {
  // Redirect to the tabs navigation when opening the app
  return <Redirect href="/tabs" />;
}