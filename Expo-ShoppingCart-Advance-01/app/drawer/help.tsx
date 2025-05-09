import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  TextInput,
  Alert
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Animated, { 
  FadeIn, 
  FadeInDown,
  SlideInLeft,
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';

// Helper to convert hex color to RGB
function hexToRgb(hex: string) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert 3-digit hex to 6-digits
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  
  // Parse the hex values
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  return { r, g, b };
}

// Helper function to check if theme is dark based on background color
function isDark(colors: any) {
  // Simple check - if background is closer to black than white
  const { r, g, b } = hexToRgb(colors.background);
  return (r + g + b) / 3 < 128;
}

// FAQ data
const faqs = [
  {
    question: "How do I track my order?",
    answer: "You can track your order by navigating to the 'My Orders' section in your profile and selecting the order you want to track."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, PayPal, Apple Pay, and Google Pay. All payments are securely processed."
  },
  {
    question: "How do I return an item?",
    answer: "To return an item, go to 'My Orders', select the order containing the item, and click 'Return Item'. Follow the prompts to complete your return."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery."
  }
];

export default function HelpScreen() {
  const { colors } = useTheme();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Animation values
  const submitButtonScale = useSharedValue(1);
  
  // Animated styles
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: submitButtonScale.value }]
    };
  });
  
  // Handle FAQ expansion
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  // Handle form submission with animation
  const handleSubmit = () => {
    const { name, email, message } = contactForm;
    
    if (!name || !email || !message) {
      Alert.alert('Incomplete Form', 'Please fill out all fields.');
      return;
    }
    
    // Submit animation
    submitButtonScale.value = withSpring(0.95, {}, () => {
      submitButtonScale.value = withSpring(1);
    });
    
    // In a real app, you would send this data to a server
    Alert.alert(
      'Message Sent',
      'Thank you for contacting us! We will get back to you soon.',
      [
        { 
          text: 'OK', 
          onPress: () => {
            setContactForm({ name: '', email: '', message: '' });
          }
        }
      ]
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Animated.View entering={FadeInDown.duration(500)}>
        <Text style={[styles.title, { color: colors.text }]}>
          Help & Support
        </Text>
      </Animated.View>

      {/* FAQs Section */}
      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Frequently Asked Questions
        </Text>
      </Animated.View>
      
      {faqs.map((faq, index) => (
        <Animated.View 
          key={index}
          entering={SlideInLeft.delay(300 + index * 100).duration(500)}
        >
          <View
            style={[
              styles.faqItem,
              { backgroundColor: colors.card, borderColor: colors.border }
            ]}
          >
            <Pressable
              style={styles.faqQuestion}
              onPress={() => toggleFaq(index)}
            >
              <Text style={[styles.faqQuestionText, { color: colors.text }]}>
                {faq.question}
              </Text>
              <Text style={{ color: colors.text }}>
                {expandedFaq === index ? '−' : '+'}
              </Text>
            </Pressable>
            
            {expandedFaq === index && (
              <Animated.View 
                style={styles.faqAnswer}
                entering={FadeIn.duration(300)}
              >
                <Text style={[styles.faqAnswerText, { color: colors.text }]}>
                  {faq.answer}
                </Text>
              </Animated.View>
            )}
          </View>
        </Animated.View>
      ))}

      {/* Contact Form */}
      <Animated.View entering={FadeInDown.delay(700).duration(500)}>
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>
          Contact Us
        </Text>
      </Animated.View>
      
      <Animated.View entering={FadeInDown.delay(800).duration(500)}>
        <View style={[styles.formContainer, { backgroundColor: colors.card }]}>
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>Name</Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }
              ]}
              placeholderTextColor={isDark(colors) ? '#777' : '#999'}
              placeholder="Your name"
              value={contactForm.name}
              onChangeText={(text) => setContactForm({ ...contactForm, name: text })}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }
              ]}
              placeholderTextColor={isDark(colors) ? '#777' : '#999'}
              placeholder="your.email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={contactForm.email}
              onChangeText={(text) => setContactForm({ ...contactForm, email: text })}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>Message</Text>
            <TextInput
              style={[
                styles.textArea,
                { 
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border
                }
              ]}
              placeholderTextColor={isDark(colors) ? '#777' : '#999'}
              placeholder="How can we help you?"
              multiline
              numberOfLines={4}
              value={contactForm.message}
              onChangeText={(text) => setContactForm({ ...contactForm, message: text })}
            />
          </View>
          
          <Animated.View style={[buttonAnimatedStyle]}>
            <Pressable
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
          </Animated.View>
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
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestionText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    flex: 1,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
  },
  faqAnswerText: {
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    lineHeight: 22,
  },
  formContainer: {
    padding: 16,
    borderRadius: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    marginBottom: 6,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontFamily: 'Roboto_400Regular',
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    textAlignVertical: 'top',
    fontFamily: 'Roboto_400Regular',
  },
  submitButton: {
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
});