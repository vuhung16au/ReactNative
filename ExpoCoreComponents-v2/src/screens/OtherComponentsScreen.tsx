import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Linking,
  Modal,
  PixelRatio,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ActionSheetIOS,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Define types for our component items
type ComponentItem = {
  id: string;
  title: string;
  type: 'section' | 'component';
};

const OtherComponentsScreen = () => {
  // State variables
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Animated value
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Other components data
  const OTHER_COMPONENTS: ComponentItem[] = [
    { id: 'other', title: 'Other Components', type: 'section' },
    { id: 'activity', title: 'ActivityIndicator', type: 'component' },
    { id: 'alert', title: 'Alert', type: 'component' },
    { id: 'animated', title: 'Animated', type: 'component' },
    { id: 'dimensions', title: 'Dimensions', type: 'component' },
    { id: 'pixelratio', title: 'PixelRatio', type: 'component' },
    { id: 'modal', title: 'Modal', type: 'component' },
    { id: 'linking', title: 'Linking', type: 'component' },
    ...(Platform.OS === 'ios' ? [{ id: 'actionsheet', title: 'ActionSheetIOS (iOS only)', type: 'component' as const }] : []),
    { id: 'keyboardavoiding', title: 'KeyboardAvoidingView', type: 'component' as const },
  ];
  
  // Handle animation
  const startAnimation = () => {
    // Reset the value
    fadeAnim.setValue(0);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  
  // ActionSheetIOS function (iOS only)
  const showActionSheet = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Option 1', 'Option 2'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            Alert.alert('Selected', 'Option 1');
          } else if (buttonIndex === 2) {
            Alert.alert('Selected', 'Option 2');
          }
        }
      );
    } else {
      Alert.alert('ActionSheetIOS', 'Only available on iOS devices');
    }
  };
  
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
        return (
          <View style={styles.box}>
            <Text style={styles.title}>{item.title}</Text>
            
            {item.id === 'activity' && (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
            
            {item.id === 'alert' && (
              <Button
                title="Show Alert"
                onPress={() => Alert.alert(
                  "Example Alert",
                  "This is a simple alert dialog",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "OK" }
                  ]
                )}
              />
            )}
            
            {item.id === 'animated' && (
              <>
                <Animated.View
                  style={[
                    styles.animatedBox,
                    {
                      opacity: fadeAnim,
                      transform: [{
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [150, 0]
                        })
                      }]
                    }
                  ]}
                >
                  <Text>Fade In Animation</Text>
                </Animated.View>
                <Button title="Start Animation" onPress={startAnimation} />
              </>
            )}
            
            {item.id === 'dimensions' && (
              <>
                <Text>Window Width: {Dimensions.get('window').width}</Text>
                <Text>Window Height: {Dimensions.get('window').height}</Text>
              </>
            )}
            
            {item.id === 'pixelratio' && (
              <>
                <Text>Pixel Ratio: {PixelRatio.get()}</Text>
                <Text>Font Scale: {PixelRatio.getFontScale()}</Text>
              </>
            )}
            
            {item.id === 'modal' && (
              <>
                <Button
                  title="Show Modal"
                  onPress={() => setModalVisible(true)}
                />
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>This is a Modal!</Text>
                      <Button
                        title="Hide Modal"
                        onPress={() => setModalVisible(!modalVisible)}
                      />
                    </View>
                  </View>
                </Modal>
              </>
            )}
            
            {item.id === 'linking' && (
              <Button
                title="Open URL"
                onPress={() => Linking.openURL('https://expo.dev')}
              />
            )}
            
            {item.id === 'actionsheet' && Platform.OS === 'ios' && (
              <Button
                title="Show Action Sheet"
                onPress={showActionSheet}
              />
            )}
            
            {item.id === 'keyboardavoiding' && (
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={0}
              >
                <Text>This view will adjust when keyboard appears</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Type here to test keyboard avoidance"
                />
              </KeyboardAvoidingView>
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
        data={OTHER_COMPONENTS}
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
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  animatedBox: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default OtherComponentsScreen;