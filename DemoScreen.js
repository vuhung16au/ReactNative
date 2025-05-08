import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, Pressable, Modal, Alert, SafeAreaView, ActivityIndicator, Platform, useWindowDimensions, RefreshControl } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styles } from './App';

const DemoScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const window = useWindowDimensions();
  const isLandscape = window.width > window.height;
  const isTablet = window.width > 768;

  const handlePressablePress = () => {
    Alert.alert('Pressable Pressed', 'You interacted with the Pressable component!');
  };

  const showAlert = () => {
    Alert.alert(
      'Simple Alert',
      'This is a basic alert message.',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  };

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Loading Finished', 'The activity indicator has completed.');
    }, 3000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulate refresh
  };

  const getResponsiveStyles = () => {
    if (isTablet) {
      return {
        contentPadding: { paddingHorizontal: 40 },
        fontSize: { fontSize: 18 },
        headerFontSize: { fontSize: 28 },
      };
    }
    return {
      contentPadding: { paddingHorizontal: 20 },
      fontSize: { fontSize: 16 },
      headerFontSize: { fontSize: 24 },
    };
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <SafeAreaView 
      style={[
        styles.container,
        isLandscape && styles.landscapeContainer,
      ]}
    >
      {/* Hamburger Menu Appbar */}
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Home" />
      </Appbar.Header>

      <Text style={[styles.header, responsiveStyles.headerFontSize]}>
        Exploring Core Components
      </Text>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContainer,
          responsiveStyles.contentPadding,
          isLandscape && styles.landscapeScrollContainer
        ]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* View */}
        <View style={[styles.section, isLandscape && styles.landscapeSection]}>
          <Text style={[styles.sectionTitle, responsiveStyles.fontSize]}>View</Text>
          <View style={styles.viewBox}>
            <Text style={responsiveStyles.fontSize}>This is a View component. It acts as a container.</Text>
          </View>
        </View>

        {/* Text */}
        <View style={[styles.section, isLandscape && styles.landscapeSection]}>
          <Text style={[styles.sectionTitle, responsiveStyles.fontSize]}>Text</Text>
          <Text style={[styles.basicText, responsiveStyles.fontSize]}>This is a basic Text component.</Text>
          <Text style={[styles.basicText, styles.boldText, responsiveStyles.fontSize]}>This text is bold.</Text>
        </View>

        {/* Image */}
        <View style={[styles.section, isLandscape && styles.landscapeSection]}>
          <Text style={[styles.sectionTitle, responsiveStyles.fontSize]}>Image</Text>
          <Image
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            style={styles.tinyLogo}
          />
          <Text style={[styles.imageCaption, responsiveStyles.fontSize]}>React Native logo from a URI.</Text>
        </View>

        {/* Button */}
        <View style={[styles.section, isLandscape && styles.landscapeSection]}>
          <Text style={[styles.sectionTitle, responsiveStyles.fontSize]}>Button</Text>
          <Button title="Press Me" onPress={() => Alert.alert('Button Pressed', 'You clicked the button!')} />
        </View>

        {/* Pressable */}
        <View style={[styles.section, isLandscape && styles.landscapeSection]}>
          <Text style={[styles.sectionTitle, responsiveStyles.fontSize]}>Pressable</Text>
          <Pressable style={styles.pressableButton} onPress={handlePressablePress}>
            <Text style={[styles.pressableText, responsiveStyles.fontSize]}>Pressable Area</Text>
          </Pressable>
        </View>

        {/* Modal */}
        <View style={[styles.section, isLandscape && styles.landscapeSection]}>
          <Text style={[styles.sectionTitle, responsiveStyles.fontSize]}>Modal</Text>
          <Button title="Show Modal" onPress={() => setModalVisible(true)} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={[styles.modalText, responsiveStyles.fontSize]}>This is a Modal!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={[styles.textStyle, responsiveStyles.fontSize]}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>

        {/* ActivityIndicator */}
        <View style={[styles.section, isLandscape && styles.landscapeSection]}>
          <Text style={[styles.sectionTitle, responsiveStyles.fontSize]}>ActivityIndicator</Text>
          <Button title="Start Loading" onPress={startLoading} disabled={loading} />
          {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />}
          {!loading && <Text style={responsiveStyles.fontSize}>Press 'Start Loading' to see the indicator.</Text>}
        </View>

        {/* Alert */}
        <View style={[styles.section, isLandscape && styles.landscapeSection]}>
          <Text style={[styles.sectionTitle, responsiveStyles.fontSize]}>Alert</Text>
          <Button title="Show Alert" onPress={showAlert} />
          <Text style={[styles.alertInfo, responsiveStyles.fontSize]}>Press the button above to trigger a basic Alert.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DemoScreen;
