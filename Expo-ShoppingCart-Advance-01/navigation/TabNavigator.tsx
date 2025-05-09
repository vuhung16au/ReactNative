import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Text, View } from 'react-native';

// Import the real HomeScreen from app/tabs/index
import HomeScreen from '../app/tabs/index';

// These will be placeholder components for now
const AboutScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>About Screen</Text>
    </View>
  );
};

const MenuScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Categories Screen</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

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

const TabNavigator = () => {
  const { colors, isDark } = useTheme();
  
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="info" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="list" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;