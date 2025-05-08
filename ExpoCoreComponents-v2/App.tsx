import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

// Import our screen components
import BasicComponentsScreen from './src/screens/BasicComponentsScreen';
import ListComponentsScreen from './src/screens/ListComponentsScreen';
import OtherComponentsScreen from './src/screens/OtherComponentsScreen';

// Create tab navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              // You can add custom icons here if desired
              let iconName;

              if (route.name === 'Basic') {
                return (
                  <View style={[styles.tabIcon, focused ? styles.focusedIcon : null]}>
                    <Text style={styles.tabIconText}>B</Text>
                  </View>
                );
              } else if (route.name === 'Lists') {
                return (
                  <View style={[styles.tabIcon, focused ? styles.focusedIcon : null]}>
                    <Text style={styles.tabIconText}>L</Text>
                  </View>
                );
              } else if (route.name === 'Other') {
                return (
                  <View style={[styles.tabIcon, focused ? styles.focusedIcon : null]}>
                    <Text style={styles.tabIconText}>O</Text>
                  </View>
                );
              }
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="Basic" 
            component={BasicComponentsScreen} 
            options={{ title: 'Basic Components' }}
          />
          <Tab.Screen 
            name="Lists" 
            component={ListComponentsScreen} 
            options={{ title: 'List Components' }}
          />
          <Tab.Screen 
            name="Other" 
            component={OtherComponentsScreen} 
            options={{ title: 'Other Components' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedIcon: {
    backgroundColor: '#007AFF',
  },
  tabIconText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});
