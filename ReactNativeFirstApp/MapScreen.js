import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, Platform, StatusBar, Dimensions, PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Card, useTheme, Button } from 'react-native-paper';

const MapScreen = () => {
  const [location, setLocation] = useState({
    latitude: 37.78825,  // Default to San Francisco if location not available
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const { width, height } = Dimensions.get('window');
  
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const granted = await Geolocation.requestAuthorization('whenInUse');
        return granted === 'granted';
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "App needs access to your location",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setError('Location permission denied');
        setLoading(false);
        return;
      }
      
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setLoading(false);
        },
        (error) => {
          console.log(error.code, error.message);
          setError('Unable to get location: ' + error.message);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (err) {
      setError('Error: ' + err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  if (loading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: theme.colors.background 
      }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 10, color: theme.colors.text }}>
          Loading map...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: theme.colors.background 
    }}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.surface} />
      
      {error ? (
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: 20 
        }}>
          <Text style={{ color: 'red', marginBottom: 20 }}>{error}</Text>
          <Button 
            mode="contained" 
            onPress={() => {
              setError(null);
              setLoading(true);
              getLocation();
            }}
          >
            Retry
          </Button>
        </View>
      ) : (
        <View style={{ flex: 1, margin: 16 }}>
          <Card style={{
            flex: 1,
            borderRadius: 16,
            overflow: 'hidden',
            elevation: 4
          }}>
            <MapView
              provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
              style={{
                width: '100%',
                height: '100%',
              }}
              initialRegion={location}
              region={location}
              showsUserLocation={true}
              showsMyLocationButton={true}
              showsCompass={true}
              rotateEnabled={true}
              scrollEnabled={true}
              zoomEnabled={true}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude
                }}
                title="Your Location"
                description="You are here"
              />
            </MapView>
          </Card>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MapScreen;
