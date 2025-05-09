import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import TabNavigator from './TabNavigator';

// Placeholder screens for drawer items
const CartScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Cart Screen</Text>
    </View>
  );
};

const SettingsScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Settings Screen</Text>
    </View>
  );
};

const HelpScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Help & Support Screen</Text>
    </View>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { colors } = useTheme();
  
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontFamily: 'Inter_700Bold',
          color: colors.text,
        },
        headerTintColor: colors.navigation, // Use the navigation color for hamburger menu
        drawerStyle: {
          backgroundColor: colors.card,
        },
        drawerLabelStyle: {
          color: colors.text,
          fontFamily: 'Inter_500Medium',
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
      }}
    >
      <Drawer.Screen 
        name="HomeTab" 
        component={TabNavigator} 
        options={{
          headerShown: false,
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{
          title: 'Cart',
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🛒</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>⚙️</Text>
          ),
        }}
      />
      <Drawer.Screen 
        name="Help" 
        component={HelpScreen} 
        options={{
          title: 'Help & Support',
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>❓</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DrawerNavigator;