import 'react-native-gesture-handler';
import { Slot } from 'expo-router';

export default function App() {
  // The app/_layout.tsx file handles all providers and configuration
  // This App.tsx file is just a pass-through for expo-router
  return <Slot />;
}
