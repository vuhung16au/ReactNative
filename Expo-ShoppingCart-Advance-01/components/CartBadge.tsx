import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useCart } from '../context/CartContext';
import { router } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface CartBadgeProps {
  size?: number;
}

export default function CartBadge({ size = 24 }: CartBadgeProps) {
  const { getItemsCount } = useCart();
  const { colors } = useTheme();
  const itemCount = getItemsCount();
  
  // Animation values
  const scale = useSharedValue(1);
  
  // Update animation when item count changes
  useEffect(() => {
    if (itemCount > 0) {
      scale.value = withSpring(1.3, {}, () => {
        scale.value = withSpring(1);
      });
    }
  }, [itemCount]);
  
  // Animated styles
  const animatedBadgeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleCartPress = () => {
    router.push('/drawer');
  };
  
  return (
    <Pressable onPress={handleCartPress} style={styles.container}>
      <View style={[styles.iconContainer, { width: size, height: size }]}>
        {/* Cart Icon (simplified) */}
        <View style={[styles.cartIcon, { borderColor: colors.text }]} />
      </View>
      
      {itemCount > 0 && (
        <Animated.View 
          style={[
            styles.badge, 
            { backgroundColor: colors.accent },
            animatedBadgeStyle
          ]}
        >
          <Text style={styles.badgeText}>
            {itemCount > 99 ? '99+' : itemCount}
          </Text>
        </Animated.View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginRight: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    width: 18,
    height: 14,
    borderWidth: 2,
    borderRadius: 2,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});