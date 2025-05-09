import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing,
  interpolateColor
} from 'react-native-reanimated';

type ThemeToggleProps = {
  style?: any;
};

export default function ThemeToggle({ style }: ThemeToggleProps) {
  const { theme, setTheme, isDark, colors } = useTheme();
  
  // Animation value for the toggle
  const togglePosition = useSharedValue(isDark ? 1 : 0);
  
  // Animated styles for the toggle
  const animatedTrackStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        togglePosition.value,
        [0, 1],
        ['#D1D1D1', '#555555']
      ),
    };
  });
  
  const animatedThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { 
          translateX: withTiming(
            togglePosition.value * 28, 
            { duration: 250, easing: Easing.bezier(0.4, 0.0, 0.2, 1) }
          ) 
        }
      ],
      backgroundColor: interpolateColor(
        togglePosition.value,
        [0, 1],
        ['#FFFFFF', '#FFCC66']
      ),
    };
  });
  
  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    togglePosition.value = isDark ? 0 : 1;
    setTheme(newTheme);
  };
  
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, { color: colors.text }]}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Pressable onPress={toggleTheme}>
        <Animated.View style={[styles.track, animatedTrackStyle]}>
          <Animated.View style={[styles.thumb, animatedThumbStyle]}>
            {/* Sun/Moon icon could be added here */}
          </Animated.View>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
    fontFamily: 'Inter_400Regular',
  },
  track: {
    width: 56,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
});