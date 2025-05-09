import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  FlatList,
  ListRenderItemInfo
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard';
import CartBadge from '../../components/CartBadge';
import { Product } from '../../context/CartContext';
import Animated, {
  FadeIn,
  FadeInRight,
  SlideInLeft,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolateColor
} from 'react-native-reanimated';

// Get unique categories from products data
const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

export default function MenuScreen() {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Animation values
  const categoryIndicatorPosition = useSharedValue(0);
  const categoryIndicatorWidth = useSharedValue(0);
  
  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory]);
  
  // Animated style for category indicator
  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(categoryIndicatorPosition.value, {
        duration: 300,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      width: withTiming(categoryIndicatorWidth.value, {
        duration: 300,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  // Update category indicator position on layout
  const updateCategoryIndicator = (index: number, width: number) => {
    // Calculate position based on previous items
    let position = 16; // initial padding
    for (let i = 0; i < index; i++) {
      // This is an approximation; in a real app, you'd store and use actual measurements
      const itemText = categories[i];
      const estimatedWidth = itemText.length * 10 + 32; // rough estimate of text width + padding
      position += estimatedWidth + 8; // add item width + margin
    }
    
    categoryIndicatorPosition.value = position;
    categoryIndicatorWidth.value = width;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Animated.Text 
          style={[styles.title, { color: colors.text }]}
          entering={FadeInRight.duration(500)}
        >
          Categories
        </Animated.Text>
        <CartBadge />
      </View>

      {/* Category horizontal selector */}
      <Animated.View 
        style={styles.categoriesContainer}
        entering={SlideInLeft.duration(500)}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          <Animated.View 
            style={[
              styles.categoryIndicator, 
              { backgroundColor: colors.primary },
              animatedIndicatorStyle
            ]}
          />
          
          {categories.map((category, index) => (
            <Pressable
              key={category}
              style={[
                styles.categoryItem,
                selectedCategory === category && styles.categoryItemActive
              ]}
              onLayout={(event) => {
                if (category === selectedCategory) {
                  const { width } = event.nativeEvent.layout;
                  updateCategoryIndicator(index, width);
                }
              }}
              onPress={() => {
                setSelectedCategory(category);
                const width = category.length * 10 + 32; // Rough estimate
                updateCategoryIndicator(index, width);
              }}
            >
              <Text 
                style={[
                  styles.categoryText,
                  { color: selectedCategory === category ? colors.primary : colors.text }
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Products grid with filtered data */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item, index }: ListRenderItemInfo<Product>) => (
          <Animated.View entering={FadeIn.delay(index * 100).duration(500)}>
            <ProductCard product={item} />
          </Animated.View>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </View>
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
  categoriesContainer: {
    marginVertical: 8,
  },
  categoriesScrollContent: {
    paddingHorizontal: 16,
  },
  categoryIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    borderRadius: 1.5,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  categoryItemActive: {
    // Visual indicator handled by the animated indicator
  },
  categoryText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  productList: {
    padding: 8,
    paddingBottom: 24,
  },
});