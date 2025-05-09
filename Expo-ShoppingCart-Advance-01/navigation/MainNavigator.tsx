import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import DrawerNavigator from './DrawerNavigator';
import StackNavigator from './StackNavigator';
import { View, Text } from 'react-native';

// Modal screen component
const ModalScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Modal Screen</Text>
    </View>
  );
};

const RootStack = createStackNavigator();

const MainNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal'
      }}
    >
      <RootStack.Screen 
        name="Main"
        component={DrawerNavigator}
      />
      <RootStack.Screen 
        name="Stack"
        component={StackNavigator}
      />
      <RootStack.Screen 
        name="Modal"
        component={ModalScreen}
        options={{
          presentation: 'modal',
        }}
      />
    </RootStack.Navigator>
  );
};

export default MainNavigator;