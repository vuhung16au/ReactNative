import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { router } from 'expo-router';
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInRight, 
  SlideOutRight 
} from 'react-native-reanimated';

export default function CartScreen() {
  const { colors } = useTheme();
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  
  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Cart Empty', 'Add some products to your cart first.');
      return;
    }
    
    Alert.alert(
      'Checkout',
      'Would you like to proceed to checkout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Proceed',
          onPress: () => {
            Alert.alert('Order Placed', 'Thank you for your order!');
            clearCart();
            router.replace('/tabs');
          },
        },
      ]
    );
  };
  
  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };
  
  if (items.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Animated.View entering={FadeIn.duration(500)}>
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              Your cart is empty
            </Text>
            <Pressable
              style={[styles.button, { backgroundColor: colors.primary, marginTop: 20 }]}
              onPress={() => router.navigate('/tabs')}
            >
              <Text style={styles.buttonText}>Continue Shopping</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.Text 
        style={[styles.title, { color: colors.text }]}
        entering={SlideInRight.duration(500)}
      >
        Your Cart
      </Animated.Text>
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => {
          return (
            <Animated.View
              entering={FadeIn.delay(index * 100)}
              exiting={SlideOutRight.duration(300)}
            >
              <View
                style={[
                  styles.cartItem, 
                  { backgroundColor: colors.card, borderColor: colors.border }
                ]}
              >
                <Image 
                  source={{ uri: item.product.image }} 
                  style={styles.itemImage}
                />
                
                <View style={styles.itemDetails}>
                  <Text style={[styles.itemName, { color: colors.text }]}>
                    {item.product.name}
                  </Text>
                  <Text style={[styles.itemPrice, { color: colors.primary }]}>
                    ${item.product.price.toFixed(2)}
                  </Text>
                  
                  <View style={styles.quantityContainer}>
                    <Pressable
                      onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                      style={[styles.quantityButton, { backgroundColor: colors.border }]}
                    >
                      <Text style={{ color: colors.text }}>-</Text>
                    </Pressable>
                    
                    <Text style={[styles.quantity, { color: colors.text }]}>
                      {item.quantity}
                    </Text>
                    
                    <Pressable
                      onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                      style={[styles.quantityButton, { backgroundColor: colors.border }]}
                    >
                      <Text style={{ color: colors.text }}>+</Text>
                    </Pressable>
                  </View>
                </View>
                
                <Pressable
                  onPress={() => handleRemove(item.product.id)}
                  style={[styles.removeButton, { backgroundColor: colors.accent }]}
                >
                  <Text style={styles.removeButtonText}>X</Text>
                </Pressable>
              </View>
            </Animated.View>
          );
        }}
      />
      
      <Animated.View
        entering={FadeIn.delay(300)}
      >
        <View style={[styles.cartFooter, { backgroundColor: colors.card }]}>
          <View style={styles.totalContainer}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>Total:</Text>
            <Text style={[styles.totalAmount, { color: colors.primary }]}>
              ${getCartTotal().toFixed(2)}
            </Text>
          </View>
          
          <Pressable
            style={[styles.checkoutButton, { backgroundColor: colors.secondary }]}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 100,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    fontFamily: 'Roboto_700Bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
  totalAmount: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  checkoutButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
});