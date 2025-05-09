import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import ThemeToggle from '../../components/ThemeToggle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { clearCart } = useCart();

  const clearAllData = async () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear all saved data? This will reset your cart and preferences.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear cart
              clearCart();
              
              // Clear all AsyncStorage data
              await AsyncStorage.clear();
              
              Alert.alert('Success', 'All data has been cleared.');
              
              // Navigate back to home
              router.replace('/tabs');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data.');
              console.error(error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Fix for the title text */}
      <Animated.View entering={FadeInRight.duration(500)}>
        <Text style={[styles.title, { color: colors.text }]}>
          Settings
        </Text>
      </Animated.View>
      
      {/* Fix for the appearance card */}
      <Animated.View entering={FadeIn.delay(200).duration(500)}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Appearance
          </Text>
          <ThemeToggle style={styles.setting} />
        </View>
      </Animated.View>
      
      {/* Fix for the data management card */}
      <Animated.View entering={FadeIn.delay(300).duration(500)}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Data Management
          </Text>
          <Pressable
            style={[styles.button, { backgroundColor: colors.accent }]}
            onPress={clearAllData}
          >
            <Text style={styles.buttonText}>Clear All Data</Text>
          </Pressable>
        </View>
      </Animated.View>
      
      {/* Fix for the footer */}
      <Animated.View entering={FadeIn.delay(400).duration(500)}>
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.text }]}>
            App Version: 1.0.0
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
  },
  setting: {
    marginVertical: 8,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    opacity: 0.7,
  },
});