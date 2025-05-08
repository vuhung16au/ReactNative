import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, Platform, ScrollView, RefreshControl, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const styles = require('./App.js').styles;

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      setLoading(true);
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth !== 'granted') throw new Error('Location permission not granted');
      }
      Geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        error => {
          setError('Error getting location: ' + error.message);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (err) {
      setError('Error: ' + err.message);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getLocation().finally(() => setRefreshing(false));
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Try Again" onPress={() => {
          setError(null);
          getLocation(); // Retry getting location
        }} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Pull-to-refresh supported below */}
      <ScrollView
        contentContainerStyle={styles.mapContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={{ flex: 1, minHeight: 300 }}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="You are here"
              description="Your current location"
            />
          </MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MapScreen;
