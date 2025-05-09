import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function FontExamplesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Font Examples</Text>
          <Text style={styles.subtitle}>
            This page demonstrates different fonts loaded with expo-font and Google Fonts
          </Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Inter Font Family</Text>
          
          <View style={styles.fontExample}>
            <Text style={styles.fontName}>Inter Regular</Text>
            <Text style={styles.interRegular}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text style={styles.interRegular}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </Text>
            <Text style={styles.interRegular}>
              abcdefghijklmnopqrstuvwxyz
            </Text>
            <Text style={styles.interRegular}>
              0123456789 !@#$%^&*()
            </Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.fontExample}>
            <Text style={styles.fontName}>Inter Bold</Text>
            <Text style={styles.interBold}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text style={styles.interBold}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </Text>
            <Text style={styles.interBold}>
              abcdefghijklmnopqrstuvwxyz
            </Text>
            <Text style={styles.interBold}>
              0123456789 !@#$%^&*()
            </Text>
          </View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Roboto Font Family</Text>
          
          <View style={styles.fontExample}>
            <Text style={styles.fontName}>Roboto Regular</Text>
            <Text style={styles.robotoRegular}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text style={styles.robotoRegular}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </Text>
            <Text style={styles.robotoRegular}>
              abcdefghijklmnopqrstuvwxyz
            </Text>
            <Text style={styles.robotoRegular}>
              0123456789 !@#$%^&*()
            </Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.fontExample}>
            <Text style={styles.fontName}>Roboto Bold</Text>
            <Text style={styles.robotoBold}>
              The quick brown fox jumps over the lazy dog
            </Text>
            <Text style={styles.robotoBold}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </Text>
            <Text style={styles.robotoBold}>
              abcdefghijklmnopqrstuvwxyz
            </Text>
            <Text style={styles.robotoBold}>
              0123456789 !@#$%^&*()
            </Text>
          </View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Using Fonts in React Native</Text>
          
          <Text style={styles.codeTitle}>Installation</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.code}>
              npm install expo-font @expo-google-fonts/inter @expo-google-fonts/roboto
            </Text>
          </View>
          
          <Text style={styles.codeTitle}>Loading Fonts</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.code}>
              {`import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';\nimport { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';\n\nexport default function App() {\n  const [fontsLoaded] = useFonts({\n    Inter_400Regular,\n    Inter_700Bold,\n    Roboto_400Regular,\n    Roboto_700Bold\n  });\n\n  if (!fontsLoaded) {\n    return null;\n  }`}
            </Text>
          </View>
        </View>
        
        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: '#3498db',
    marginBottom: 16,
  },
  fontExample: {
    marginBottom: 16,
  },
  fontName: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
  },
  interRegular: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    marginBottom: 4,
    color: '#2c3e50',
  },
  interBold: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#2c3e50',
  },
  robotoRegular: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    marginBottom: 4,
    color: '#2c3e50',
  },
  robotoBold: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#2c3e50',
  },
  divider: {
    height: 1,
    backgroundColor: '#ecf0f1',
    marginVertical: 16,
  },
  codeTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: '#34495e',
    marginTop: 16,
    marginBottom: 8,
  },
  codeBlock: {
    backgroundColor: '#2c3e50',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  code: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#ecf0f1',
    lineHeight: 20,
  },
  backButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  backButtonText: {
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    fontSize: 16,
  },
});