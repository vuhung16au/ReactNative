import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Linking } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import CartBadge from '../../components/CartBadge';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';

export default function AboutScreen() {
  const { colors } = useTheme();

  // Animation values
  const scaleCard1 = useSharedValue(1);
  const scaleCard2 = useSharedValue(1);
  
  // Animated styles for interaction feedback
  const animatedCard1Style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleCard1.value }]
    };
  });
  
  const animatedCard2Style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleCard2.value }]
    };
  });
  
  // Handle card press animations
  const handlePressIn = (card: number) => {
    if (card === 1) {
      scaleCard1.value = withSpring(0.98);
    } else {
      scaleCard2.value = withSpring(0.98);
    }
  };
  
  const handlePressOut = (card: number) => {
    if (card === 1) {
      scaleCard1.value = withSpring(1);
    } else {
      scaleCard2.value = withSpring(1);
    }
  };

  // Handle external links
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Animated.View entering={FadeInDown.duration(800)}>
          <Text style={[styles.title, { color: colors.text }]}>About Us</Text>
        </Animated.View>
        <CartBadge />
      </View>

      <Animated.View entering={FadeInUp.delay(200).duration(800)}>
        <Image
          source={{ 
            uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1770&auto=format&fit=crop' 
          }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </Animated.View>

      <Animated.View entering={FadeIn.delay(400).duration(800)}>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Modern Shopping Experience
        </Text>
      </Animated.View>
      
      <Animated.View entering={FadeIn.delay(600).duration(800)}>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          Our mission is to provide a seamless shopping experience with high-quality products. 
          We believe in sustainability, fair pricing, and excellent customer service.
        </Text>
      </Animated.View>
      
      <Animated.View entering={FadeIn.delay(800).duration(800)}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Why Choose Us?
        </Text>
      </Animated.View>
      
      <Animated.View entering={FadeInDown.delay(1000).duration(800)}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Animated.View style={animatedCard1Style}>
            <Pressable
              style={styles.pressable}
              onPressIn={() => handlePressIn(1)}
              onPressOut={() => handlePressOut(1)}
              onPress={() => openLink('https://reactnative.dev')}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.primary }]}>Quality Products</Text>
              </View>
              <Text style={[styles.cardDescription, { color: colors.text }]}>
                We carefully select each product in our inventory to ensure the highest quality standards.
                Our team tests everything before it becomes available to our customers.
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
      
      <Animated.View entering={FadeInDown.delay(1200).duration(800)}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Animated.View style={animatedCard2Style}>
            <Pressable
              style={styles.pressable}
              onPressIn={() => handlePressIn(2)}
              onPressOut={() => handlePressOut(2)}
              onPress={() => openLink('https://expo.dev')}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: colors.primary }]}>Customer Support</Text>
              </View>
              <Text style={[styles.cardDescription, { color: colors.text }]}>
                Our dedicated customer service team is available 24/7 to handle any questions
                or concerns you might have about your purchase.
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
      
      <Animated.View entering={FadeInUp.delay(1400).duration(800)}>
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.text }]}>
            © {new Date().getFullYear()} My Shop. All rights reserved.
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
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pressable: {
    padding: 16,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    lineHeight: 22,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    opacity: 0.7,
  },
});