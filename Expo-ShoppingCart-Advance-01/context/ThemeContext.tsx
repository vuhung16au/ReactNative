import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define theme colors
type ThemeType = 'light' | 'dark' | 'system';

interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  card: string;
  border: string;
  navigation: string; // Add navigation color for better menu visibility
}

interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  isDark: boolean;
  setTheme: (theme: ThemeType) => void;
}

// Define theme colors
const lightTheme: ThemeColors = {
  background: '#FFFFFF',
  text: '#121212',
  primary: '#3498db',
  secondary: '#2ecc71',
  accent: '#e74c3c',
  card: '#F5F5F5',
  border: '#E0E0E0',
  navigation: '#121212', // Dark hamburger menu for light mode
};

const darkTheme: ThemeColors = {
  background: '#121212',
  text: '#FFFFFF',
  primary: '#2980b9',
  secondary: '#27ae60',
  accent: '#c0392b',
  card: '#1E1E1E',
  border: '#333333',
  navigation: '#E0E0E0', // Light hamburger menu for dark mode
};

// Create context
const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  colors: lightTheme,
  isDark: false,
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>('system');
  const systemColorScheme = useColorScheme();
  
  // Load saved theme preference
  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@theme_preference');
        if (savedTheme) {
          setThemeState(savedTheme as ThemeType);
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    })();
  }, []);

  // Save theme preference
  const setTheme = async (newTheme: ThemeType) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem('@theme_preference', newTheme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  // Determine if dark mode is active
  const isDark = theme === 'system' 
    ? systemColorScheme === 'dark'
    : theme === 'dark';

  // Select appropriate colors based on the theme
  const colors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, isDark, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);