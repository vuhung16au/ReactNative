import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import ThemeToggle from '../../components/ThemeToggle';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { colors } = useTheme();
  const { getItemsCount, getCartTotal } = useCart();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={[styles.drawerContainer, { backgroundColor: colors.background }]}>
      {/* Header */}
      <Animated.View 
        style={[styles.drawerHeader, { borderBottomColor: colors.border }]}
        entering={FadeInDown.duration(500)}
      >
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=300' }}
          style={styles.logo}
          resizeMode="cover"
        />
        <Text style={[styles.drawerTitle, { color: colors.text }]}>
          My Shop
        </Text>
        <Text style={[styles.drawerSubtitle, { color: colors.text }]}>
          Premium Shopping
        </Text>
      </Animated.View>

      {/* Cart Summary */}
      <Animated.View 
        style={[styles.cartSummary, { backgroundColor: colors.card }]}
        entering={FadeIn.delay(300).duration(500)}
      >
        <Text style={[styles.cartSummaryTitle, { color: colors.text }]}>
          Cart Summary
        </Text>
        <View style={styles.cartSummaryDetails}>
          <View style={styles.cartSummaryRow}>
            <Text style={[styles.cartSummaryLabel, { color: colors.text }]}>
              Items:
            </Text>
            <Text style={[styles.cartSummaryValue, { color: colors.text }]}>
              {getItemsCount()}
            </Text>
          </View>
          <View style={styles.cartSummaryRow}>
            <Text style={[styles.cartSummaryLabel, { color: colors.text }]}>
              Total:
            </Text>
            <Text style={[styles.cartSummaryValue, { color: colors.primary }]}>
              ${getCartTotal().toFixed(2)}
            </Text>
          </View>
        </View>
        <Pressable
          style={[styles.viewCartButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            props.navigation.closeDrawer();
            router.navigate('/drawer');
          }}
        >
          <Text style={styles.viewCartButtonText}>View Cart</Text>
        </Pressable>
      </Animated.View>

      {/* Standard drawer navigation items */}
      <View style={styles.drawerItems}>
        <Animated.View entering={FadeIn.delay(400).duration(500)}>
          <Pressable
            style={({ pressed }) => [
              styles.drawerItem,
              { backgroundColor: pressed ? colors.border : 'transparent' }
            ]}
            onPress={() => {
              props.navigation.closeDrawer();
              router.navigate('/tabs');
            }}
          >
            <Text style={[styles.drawerItemText, { color: colors.text }]}>
              Home
            </Text>
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(500).duration(500)}>
          <Pressable
            style={({ pressed }) => [
              styles.drawerItem,
              { backgroundColor: pressed ? colors.border : 'transparent' }
            ]}
            onPress={() => {
              props.navigation.closeDrawer();
              router.navigate('/drawer/settings');
            }}
          >
            <Text style={[styles.drawerItemText, { color: colors.text }]}>
              Settings
            </Text>
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(600).duration(500)}>
          <Pressable
            style={({ pressed }) => [
              styles.drawerItem,
              { backgroundColor: pressed ? colors.border : 'transparent' }
            ]}
            onPress={() => {
              props.navigation.closeDrawer();
              router.navigate('/drawer/help');
            }}
          >
            <Text style={[styles.drawerItemText, { color: colors.text }]}>
              Help & Support
            </Text>
          </Pressable>
        </Animated.View>
      </View>

      {/* Theme toggle in drawer */}
      <Animated.View 
        style={styles.drawerFooter}
        entering={FadeIn.delay(700).duration(500)}
      >
        <ThemeToggle style={styles.themeToggle} />
      </Animated.View>
    </DrawerContentScrollView>
  );
};

export default function DrawerLayout() {
  const { colors, isDark } = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: colors.background,
          width: 280,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontFamily: 'Inter_700Bold',
        },
        drawerLabelStyle: {
          fontFamily: 'Inter_400Regular',
        },
        sceneContainerStyle: {
          backgroundColor: colors.background,
        },
        drawerItemStyle: {
          borderRadius: 8,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Cart",
          title: "Shopping Cart"
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings"
        }}
      />
      <Drawer.Screen
        name="help"
        options={{
          drawerLabel: "Help & Support",
          title: "Help & Support"
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 20,
  },
  drawerHeader: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  drawerTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 4,
  },
  drawerSubtitle: {
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    opacity: 0.7,
  },
  cartSummary: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  cartSummaryTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    marginBottom: 12,
  },
  cartSummaryDetails: {
    marginBottom: 16,
  },
  cartSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cartSummaryLabel: {
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
  cartSummaryValue: {
    fontSize: 14,
    fontFamily: 'Roboto_700Bold',
  },
  viewCartButton: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewCartButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  drawerItems: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  drawerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  drawerItemText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  drawerFooter: {
    padding: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  themeToggle: {
    marginBottom: 8,
  },
});