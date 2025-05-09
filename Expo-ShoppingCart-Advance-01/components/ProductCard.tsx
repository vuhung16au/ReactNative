import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Pressable, 
  useWindowDimensions 
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCart, Product } from '../context/CartContext';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  Easing 
} from 'react-native-reanimated';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { colors } = useTheme();
  const { addToCart } = useCart();
  const { width } = useWindowDimensions();
  
  // Animation values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  
  // Run entry animation when component mounts
  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, []);

  // Animated styles
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  // Handle press animations
  const handlePressIn = () => {
    scale.value = withSpring(0.97);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  // Handle navigation to product details
  const handlePress = () => {
    router.push(`/stack/${product.id}`);
  };

  // Handle add to cart with animation
  const handleAddToCart = () => {
    // Add to cart
    addToCart(product);
    
    // Feedback animation
    scale.value = withSpring(1.05, {}, () => {
      scale.value = withSpring(1);
    });
  };

  return (
    <Animated.View style={[
      styles.container, 
      {
        backgroundColor: colors.card,
        borderColor: colors.border,
        width: width / 2 - 24,
      },
      animatedCardStyle
    ]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={styles.pressable}
      >
        <Image 
          source={{ uri: product.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={[styles.price, { color: colors.primary }]}>
            ${product.price.toFixed(2)}
          </Text>
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleAddToCart}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    margin: 8,
    borderWidth: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  pressable: {
    flex: 1,
  },
  image: {
    height: 150,
    width: '100%',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
});