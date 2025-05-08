import React, { useState, useEffect } from 'react';

import 'react-native-reanimated';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  // Removed Button from here
  Pressable,
  Modal,
  StatusBar,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Platform,
  Dimensions,
  Switch,
  FlatList,
  TextInput,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Fix for maps import
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { Provider as PaperProvider, Appbar, Card, Title, Paragraph, Checkbox, BottomNavigation, Button, Chip, useTheme } from 'react-native-paper';

import WeatherScreen from './WeatherScreen';
import MapScreen from './MapScreen';
import NewsListScreen from './NewsListScreen';
import FormScreen from './FormScreen';
import DetailsScreen from './DetailsScreen';
import SettingsScreen from './SettingsScreen';
import WeatherScreenFull from './WeatherScreenFull';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Team Paper color palette
const TeamPaperDarkTheme = {
  ...DarkTheme,
  roundness: 16,
  colors: {
    ...DarkTheme.colors,
    primary: '#a594f9', // purple accent
    accent: '#6247aa',
    background: '#18122B',
    surface: '#393053',
    card: '#393053',
    text: '#fff',
    placeholder: '#b8b8d1',
    disabled: '#6d6d8e',
    notification: '#a594f9',
    border: '#393053',
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '900' },
    labelMedium: { fontFamily: 'System', fontWeight: '500' }, 
    labelLarge: { fontFamily: 'System', fontWeight: '500' }, // Add missing labelLarge
    labelSmall: { fontFamily: 'System', fontWeight: '400' }, // Add extra variants for completeness
    bodySmall: { fontFamily: 'System', fontWeight: '400' },
    bodyMedium: { fontFamily: 'System', fontWeight: '500' },
    bodyLarge: { fontFamily: 'System', fontWeight: '500' },
    titleSmall: { fontFamily: 'System', fontWeight: '500' },
    titleMedium: { fontFamily: 'System', fontWeight: '600' },
    titleLarge: { fontFamily: 'System', fontWeight: '700' },
    headlineSmall: { fontFamily: 'System', fontWeight: '700' },
    headlineMedium: { fontFamily: 'System', fontWeight: '700' },
    headlineLarge: { fontFamily: 'System', fontWeight: '700' },
  },
};

// Paper Appbar for all screens
const PaperHeader = ({ title, navigation, back }) => {
  const theme = useTheme();
  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
      {back ? (
        <Appbar.BackAction onPress={navigation.goBack} color={theme.colors.primary} />
      ) : (
        <Appbar.Action icon="menu" onPress={navigation.toggleDrawer} color={theme.colors.primary} />
      )}
      <Appbar.Content title={title} titleStyle={{ color: theme.colors.text }} />
    </Appbar.Header>
  );
};

// Paper BottomNavigation for tabs
const MainTabNavigator = ({ theme }) => {
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'weather', title: 'Weather', icon: 'cloud' },
    { key: 'map', title: 'Map', icon: 'map' },
    { key: 'news', title: 'News', icon: 'newspaper' },
    { key: 'eoi', title: 'EOI', icon: 'file-document' },
  ];
  
  // Define screen components separately to ensure proper rendering
  const renderWeatherScreen = () => <WeatherScreen />;
  const renderMapScreen = () => <MapScreen />;
  const renderNewsScreen = () => <NewsListScreen />;
  const renderFormScreen = () => <FormScreen />;
  
  const renderScene = BottomNavigation.SceneMap({
    weather: renderWeatherScreen,
    map: renderMapScreen,
    news: renderNewsScreen,
    eoi: renderFormScreen,
  });
  
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: theme.colors.surface, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.placeholder}
      shifting={false}
    />
  );
};

// Stack Navigator (wrapping Tab Navigator)
const MainStackNavigator = ({ navigation, theme }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <PaperHeader {...props} />, // Use Paper Appbar
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        children={() => <MainTabNavigator theme={theme} />} 
        options={{ 
          headerShown: false, // Tab screens will show their own header
        }}
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={({ route }) => ({ title: route.params?.item?.title || 'Details' })} 
      />
      <Stack.Screen
        name="WeatherScreenFull"
        component={WeatherScreenFull}
        options={{ title: 'Full Weather' }}
      />
    </Stack.Navigator>
  );
};

// Main App Component
export default function App() {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(true); // Always dark for Team Paper
  const [isPortrait, setIsPortrait] = useState(
    Dimensions.get('window').height > Dimensions.get('window').width
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setIsPortrait(window.height > window.width);
    });
    return () => subscription?.remove();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = TeamPaperDarkTheme;

  // Drawer Navigator (wrapping Stack Navigator)
  const AppDrawerNavigator = () => (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: isPortrait ? 'front' : 'permanent',
        drawerStyle: {
          width: isPortrait ? '70%' : 280,
          backgroundColor: theme.colors.surface,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.placeholder,
        sceneContainerStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Drawer.Screen 
        name="MainStack" 
        children={() => <MainStackNavigator theme={theme} />} 
        options={{
          title: "Team Paper Demo",
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        options={{ title: "Settings" }}
      >
        {props => <SettingsScreen {...props} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <StatusBar 
          barStyle={'light-content'} 
          backgroundColor={theme.colors.surface}
        />
        <AppDrawerNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  landscapeContainer: {
    flexDirection: 'column',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    paddingTop: Platform.OS === 'ios' ? (Platform.isPad ? 0 : 10) : 0, // Handling notch
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  landscapeScrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  landscapeSection: {
    width: '48%',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  viewBox: {
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 5,
  },
  basicText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },
  imageCaption: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginTop: 5,
  },
  pressableButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  pressableText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityIndicator: {
    marginTop: 10,
  },
  alertInfo: {
    marginTop: 10,
    fontStyle: 'italic',
    color: 'gray',
  },
  
  // Weather component styles
  weatherContainer: {
    padding: 15,
  },
  weatherCard: {
    elevation: 3,
    borderRadius: 10,
  },
  weatherDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  weatherIcon: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  extraWeatherInfo: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  
  // Common container styles
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  
  // Map component styles
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  
  // List component styles
  listContent: {
    padding: 10,
  },
  listItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemPressed: {
    backgroundColor: '#f0f0f0',
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  listItemDescription: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 10,
  },
  
  // Details screen styles
  detailsContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  detailsDescription: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  
  // Form component styles
  formContainer: {
    flex: 1,
  },
  formContent: {
    padding: 20,
  },
  formHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 15,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  submitButtonContainer: {
    marginTop: 20,
  },
  formSpinner: {
    marginTop: 15,
  },
  successMessage: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#d4edda',
    borderRadius: 5,
  },
  successText: {
    color: '#155724',
    textAlign: 'center',
    fontSize: 16,
  },
  
  // Settings screen styles
  settingsContainer: {
    flex: 1,
    padding: 20,
  },
  settingsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  settingDescription: {
    color: '#666',
    marginTop: 10,
    fontSize: 14,
    paddingHorizontal: 15,
  },
});