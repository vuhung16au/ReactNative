import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.errorCode}>404</Text>
        <Text style={styles.title}>Page Not Found</Text>
        
        <Image 
          source={{ uri: 'https://placehold.co/400x300/png?text=Not+Found' }}
          style={styles.image}
        />
        
        <Text style={styles.message}>
          The page you're looking for doesn't exist or has been moved.
        </Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>What is this?</Text>
          <Text style={styles.infoText}>
            This is a custom not-found screen in Expo Router. When a user navigates to a route that doesn't exist, 
            this screen is displayed instead of crashing the app.
          </Text>
          <Text style={styles.infoText}>
            You can implement this by creating a 'not-found.tsx' file in your app directory.
          </Text>
        </View>
        
        <Link href="/" asChild>
          <TouchableOpacity style={styles.homeButton}>
            <Text style={styles.homeButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorCode: {
    fontFamily: 'Inter_700Bold',
    fontSize: 64,
    color: '#e74c3c',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#2c3e50',
    marginBottom: 32,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  message: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 32,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#3498db',
    marginBottom: 12,
  },
  infoText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#34495e',
    marginBottom: 8,
    lineHeight: 22,
  },
  homeButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  homeButtonText: {
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    fontSize: 16,
  },
});