import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Switch,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Define types for our component items
type ComponentItem = {
  id: string;
  title: string;
  type: 'section' | 'component';
};

const BasicComponentsScreen = () => {
  // State variables
  const [text, setText] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  
  // Basic components data
  const BASIC_COMPONENTS: ComponentItem[] = [
    { id: 'basic', title: 'Basic Components', type: 'section' },
    { id: 'view_text', title: 'View & Text', type: 'component' },
    { id: 'image', title: 'Image', type: 'component' },
    { id: 'textinput', title: 'TextInput', type: 'component' },
    { id: 'button', title: 'Button', type: 'component' },
    { id: 'switch', title: 'Switch', type: 'component' },
  ];

  // Render different types of items
  const renderItem = ({ item }: { item: ComponentItem }) => {
    switch (item.type) {
      case 'section':
        return (
          <View>
            <Text style={styles.sectionTitle}>{item.title}</Text>
          </View>
        );
        
      case 'component':
        // Render different components based on their ID
        return (
          <View style={styles.box}>
            <Text style={styles.title}>{item.title}</Text>
            {item.id === 'view_text' && (
              <Text style={styles.description}>The most fundamental components for building UI</Text>
            )}
            
            {item.id === 'image' && (
              <Image 
                source={require('../../assets/icon.png')} 
                style={styles.image}
                resizeMode="contain"
              />
            )}
            
            {item.id === 'textinput' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Type something here..."
                  value={text}
                  onChangeText={setText}
                />
                <Text>You typed: {text}</Text>
              </>
            )}
            
            {item.id === 'button' && (
              <Button
                title="Press me"
                onPress={() => alert('Button Pressed: You pressed the button!')}
              />
            )}
            
            {item.id === 'switch' && (
              <View style={styles.switchContainer}>
                <Text>Off</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  onValueChange={() => setIsEnabled(previousState => !previousState)}
                  value={isEnabled}
                />
                <Text>On</Text>
              </View>
            )}
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <FlatList
        data={BASIC_COMPONENTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  box: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  }
});

export default BasicComponentsScreen;