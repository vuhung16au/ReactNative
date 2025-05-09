import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ModalScreen() {
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>Modal Navigation Pattern</Text>
          
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://placehold.co/400x300/png?text=Modal+Screen' }}
              style={styles.image}
            />
          </View>
          
          <Text style={styles.description}>
            This is an example of a modal screen that slides up from the bottom. 
            Modal screens are useful for presenting focused content without navigating away from the current context.
          </Text>
          
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxTitle}>Common Modal Use Cases</Text>
            <Text style={styles.infoBoxItem}>• Detailed product information</Text>
            <Text style={styles.infoBoxItem}>• Forms and input dialogs</Text>
            <Text style={styles.infoBoxItem}>• Quick actions and settings</Text>
            <Text style={styles.infoBoxItem}>• Confirmation dialogs</Text>
          </View>
          
          <Text style={styles.tip}>
            Tip: In Expo Router, you can create modal screens by setting the presentation option to 'modal' in your router configuration.
          </Text>
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Dismiss Modal</Text>
          </TouchableOpacity>
          
          <Link href={{pathname: "/tabs"}} asChild>
            <TouchableOpacity style={styles.homeButton}>
              <Text style={styles.homeButtonText}>Go to Home</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  closeButton: {
    color: '#fff',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  description: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#ecf0f1',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
  },
  infoBoxTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#3498db',
    marginBottom: 12,
  },
  infoBoxItem: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 15,
    color: '#ecf0f1',
    marginBottom: 8,
    lineHeight: 22,
  },
  tip: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    fontStyle: 'italic',
    color: '#3498db',
    marginBottom: 24,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#3498db',
    width: '80%',
    alignItems: 'center',
  },
  homeButtonText: {
    fontFamily: 'Inter_700Bold',
    color: '#3498db',
    fontSize: 16,
  },
});