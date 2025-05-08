import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  ScrollView, 
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [inputText, setInputText] = useState<string>('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Core Components Demo</Text>
        </View>
        
        {/* Text Component */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text Component</Text>
          <Text style={styles.regularText}>This is a regular text</Text>
          <Text style={styles.boldText}>This is a bold text</Text>
        </View>
        
        {/* Image Component */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Image Component</Text>
          <View style={styles.imageContainer}>
            <Image 
              source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} 
              style={styles.image}
            />
            <Image 
              source={require('./assets/icon.png')} 
              style={styles.imageLocal}
            />
          </View>
        </View>
        
        {/* TextInput Component */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TextInput Component</Text>
          <TextInput
            style={styles.input}
            onChangeText={setInputText}
            value={inputText}
            placeholder="Type something here..."
            placeholderTextColor="#888"
          />
          <Text style={styles.inputResult}>You typed: {inputText}</Text>
        </View>
        
        {/* View Component for Layout */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>View Component for Layout</Text>
          <View style={styles.boxContainer}>
            <View style={[styles.box, { backgroundColor: '#FF6347' }]} />
            <View style={[styles.box, { backgroundColor: '#4682B4' }]} />
            <View style={[styles.box, { backgroundColor: '#32CD32' }]} />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  scrollViewContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  regularText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  imageLocal: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  inputResult: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
