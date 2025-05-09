import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import Animated, {
  FadeIn,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import CartBadge from '../../components/CartBadge';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const { addToCart } = useCart();
  
  // Find the product based on the ID parameter
  const product = products.find(p => p.id === id);
  
  // Animation values
  const scrollY = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  
  // Animated styles for header
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 100],
        [1, 0.9],
        Extrapolation.CLAMP
      ),
      transform: [
        { 
          translateY: interpolate(
            scrollY.value,
            [0, 100],
            [0, -20],
            Extrapolation.CLAMP
          ) 
        }
      ],
    };
  });
  
  // Animated styles for button
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }]
    };
  });

  // Handle add to cart with animation
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      buttonScale.value = withSpring(1.2, {}, () => {
        buttonScale.value = withSpring(1);
      });
    }
  };

  if (!product) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFound, { color: colors.text }]}>
          Product not found
        </Text>
        <Pressable
          style={[styles.backButton, { backgroundColor: colors.primary }]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <Pressable
          style={[styles.backBtn, { backgroundColor: colors.card }]}
          onPress={() => router.back()}
        >
          <Text style={{ color: colors.text }}>&lt;</Text>
        </Pressable>
        <Text 
          style={[styles.headerTitle, { color: colors.text }]}
          numberOfLines={1}
        >
          {product.name}
        </Text>
        <CartBadge />
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={(event) => {
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="cover"
          entering={FadeIn.duration(800)}
        />
        
        <Animated.View 
          style={[styles.productInfo, { backgroundColor: colors.card }]}
          entering={FadeInDown.delay(300).duration(700).springify()}
        >
          <Text style={[styles.productName, { color: colors.text }]}>
            {product.name}
          </Text>
          <Text style={[styles.productPrice, { color: colors.primary }]}>
            ${product.price.toFixed(2)}
          </Text>
          
          <View style={styles.categoryContainer}>
            <Text style={[styles.categoryTag, { backgroundColor: colors.secondary }]}>
              {product.category}
            </Text>
          </View>
          
          <Text style={[styles.description, { color: colors.text }]}>
            {product.description}
          </Text>
          
          <Animated.View 
            style={[
              styles.addToCartButtonContainer,
              buttonAnimatedStyle
            ]}
            entering={FadeInDown.delay(600).duration(500)}
          >
            <Pressable
              style={[styles.addToCartButton, { backgroundColor: colors.primary }]}
              onPress={handleAddToCart}
            >
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginLeft: 12,
    marginRight: 12,
  },
  scrollContent: {
    paddingTop: 44,
  },
  productImage: {
    width: '100%',
    height: 350,
  },
  productInfo: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  productName: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontFamily: 'Roboto_700Bold',
    marginBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryTag: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    color: 'white',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
  },
  addToCartButtonContainer: {
    marginTop: 32,
  },
  addToCartButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  notFound: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 100,
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});