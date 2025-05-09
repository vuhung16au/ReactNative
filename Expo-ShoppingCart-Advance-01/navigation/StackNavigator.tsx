import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import { Text, View } from 'react-native';

// Define types for route parameters
type StackParamList = {
  ProductsList: undefined;
  ProductDetail: { title?: string; id: string };
};

const Stack = createStackNavigator<StackParamList>();

// Placeholder screens - in a real implementation, you would import your actual screens
const ProductsListScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Products List Screen</Text>
    </View>
  );
};

const ProductDetailScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Product Detail Screen</Text>
    </View>
  );
};

const StackNavigator = () => {
  const { colors } = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
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
        cardStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen 
        name="ProductsList" 
        component={ProductsListScreen} 
        options={{ title: "Products" }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={({ route }) => ({ 
          title: route.params?.title || "Product Detail" 
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;