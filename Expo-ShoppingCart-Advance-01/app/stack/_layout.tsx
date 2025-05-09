import { Stack } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function StackLayout() {
  const { colors, isDark } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
        presentation: 'card',
      }}
    />
  );
}