import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import ProductCard from '../../components/ProductCard';
import CartBadge from '../../components/CartBadge';
import { products } from '../../data/products';
import Animated, { 
  FadeIn,
  FadeInDown
} from 'react-native-reanimated';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with animated title */}
      <Animated.View 
        style={[styles.header]}
        entering={FadeInDown.duration(800)}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Featured Products
        </Text>
        <CartBadge />
      </Animated.View>

      <FlatList
        data={products}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn.delay(index * 100).duration(500)}>
            <ProductCard product={item} />
          </Animated.View>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  productList: {
    padding: 8,
  },
});