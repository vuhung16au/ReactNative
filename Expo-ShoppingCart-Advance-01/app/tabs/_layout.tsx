import { Tabs } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../../components/ThemeToggle';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Pressable, Text } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function TabsLayout() {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  
  const openDrawer = () => {
    // This will now work since tabs are nested inside the drawer
    navigation.dispatch(DrawerActions.openDrawer());
  };
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: isDark ? '#888' : '#888',
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter_400Regular',
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontFamily: 'Inter_700Bold',
          color: colors.text,
        },
        headerLeft: () => (
          <Pressable 
            onPress={openDrawer}
            style={({ pressed }) => ({ 
              opacity: pressed ? 0.7 : 1,
              padding: 10,
              marginLeft: 10
            })}
          >
            <Text style={{ fontSize: 24, color: colors.navigation }}>☰</Text>
          </Pressable>
        ),
        headerRight: () => (
          <Animated.View 
            style={{ paddingRight: 16 }}
            entering={FadeIn.duration(500)}
          >
            <ThemeToggle />
          </Animated.View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <TabBarIcon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <TabBarIcon name="info" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: "Categories",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <TabBarIcon name="list" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

// Simple icon component using text for simplicity (would use actual icons in a real app)
function TabBarIcon({ name, color, size }: { name: string; color: string; size: number }) {
  const getIconText = () => {
    switch (name) {
      case 'home': return '🏠';
      case 'info': return 'ℹ️';
      case 'list': return '📋';
      default: return '•';
    }
  };
  
  return (
    <Animated.Text 
      style={{ fontSize: size, color }}
      entering={FadeIn.duration(500)}
    >
      {getIconText()}
    </Animated.Text>
  );
}