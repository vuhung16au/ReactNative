import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, SafeAreaView, Platform, ScrollView, RefreshControl } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { OPENWEATHER_API_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';

// Hardcoded API key as backup (from your .env file)
const BACKUP_API_KEY = '5c56d3b0f7e8c9a1e993a94ba1d5f8a2';

const styles = require('./App.js').styles;

const WeatherScreen = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const API_KEY = OPENWEATHER_API_KEY || BACKUP_API_KEY;
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    const getLocationAndWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if API key is available
        if (!API_KEY) {
          throw new Error('OpenWeather API key not found. Please set OPENWEATHER_API_KEY in your environment.');
        }
        
        if (Platform.OS === 'ios') {
          const auth = await Geolocation.requestAuthorization('whenInUse');
          if (auth !== 'granted') throw new Error('Location permission not granted');
        }
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            fetchWeatherData(latitude, longitude);
          },
          error => {
            if (error.code === 1) {
              setError('Location permission denied. Please enable location services.');
            } else {
              setError('Error getting location: ' + error.message);
            }
            setLoading(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } catch (err) {
        setError('Error: ' + err.message);
        setLoading(false);
      }
    };
    getLocationAndWeather();
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setError(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setLoading(false);
    } catch (err) {
      // Check for specific axios errors
      if (err.response) {
        // Server responded with an error status code (e.g., 401 for invalid API key)
        setError(`API Error (${err.response.status}): ${err.response.data.message || 'Unknown error'}`);
      } else if (err.request) {
        // Request was made but no response received (e.g., network issue)
        setError('Network error: Unable to reach weather service');
      } else {
        // Error in setting up the request
        setError('Error fetching weather: ' + err.message);
      }
      setLoading(false);
    }
  };

  const onRefresh = () => {
    if (location) {
      setRefreshing(true);
      fetchWeatherData(location.latitude, location.longitude).finally(() => setRefreshing(false));
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>Loading weather data...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: theme.colors.error, marginBottom: 20 }]}>{error}</Text>
          <Button 
            mode="contained"
            onPress={() => {
              setLoading(true);
              setError(null);
              if (location) fetchWeatherData(location.latitude, location.longitude);
              else {
                // Try to get location again
                if (Platform.OS === 'ios') {
                  Geolocation.requestAuthorization('whenInUse').then(auth => {
                    if (auth === 'granted') {
                      Geolocation.getCurrentPosition(
                        pos => {
                          const { latitude, longitude } = pos.coords;
                          setLocation({ latitude, longitude });
                          fetchWeatherData(latitude, longitude);
                        },
                        err => setError('Error getting location: ' + err.message),
                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                      );
                    } else {
                      setError('Location permission denied. Please enable location services.');
                      setLoading(false);
                    }
                  });
                } else {
                  Geolocation.getCurrentPosition(
                    pos => {
                      const { latitude, longitude } = pos.coords;
                      setLocation({ latitude, longitude });
                      fetchWeatherData(latitude, longitude);
                    },
                    err => setError('Error getting location: ' + err.message),
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                  );
                }
              }
            }}
            style={{ backgroundColor: theme.colors.primary }}
            labelStyle={{ color: theme.colors.text }}
          >
            Try Again
          </Button>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ padding: 16 }}
        style={{ backgroundColor: theme.colors.background }}
      >
        {weather ? (
          <Card style={{ backgroundColor: theme.colors.surface, borderRadius: 16, marginBottom: 16, elevation: 4 }}>
            <Card.Content>
              <Title style={{ color: theme.colors.primary, textAlign: 'center' }}>Weather in {weather?.name}</Title>
              <View style={{ marginVertical: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 15 }}>
                  {weather?.weather?.[0]?.icon && (
                    <Image
                      source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
                      style={[styles.weatherIcon, { marginRight: 16 }]}
                    />
                  )}
                  <Paragraph style={{
                    fontSize: 48,
                    fontWeight: 'bold',
                    color: theme.colors.text,
                    textAlign: 'center',
                    marginVertical: 0,
                  }}>
                    {weather?.main?.temp !== undefined && weather?.main?.temp !== null
                      ? `${Math.round(weather.main.temp)}°C`
                      : '--°C'}
                  </Paragraph>
                </View>
                <Paragraph style={{
                  marginTop: 18,
                  color: theme.colors.placeholder,
                  fontSize: 22,
                  textAlign: 'center',
                }}>
                  {weather?.weather?.[0]?.description || ''}
                </Paragraph>
              </View>
              <View style={{ borderTopWidth: 1, borderTopColor: theme.colors.border, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                <Paragraph style={{ color: theme.colors.text }}>Humidity: {weather?.main?.humidity}%</Paragraph>
                <Paragraph style={{ color: theme.colors.text }}>Wind: {weather?.wind?.speed} m/s</Paragraph>
              </View>
              <Button
                mode="contained"
                style={{ marginTop: 20, backgroundColor: theme.colors.primary }}
                labelStyle={{ color: theme.colors.text }}
                onPress={() => navigation.navigate('WeatherScreenFull')}
              >
                Full Weather
              </Button>
            </Card.Content>
          </Card>
        ) : (
          <Paragraph style={{ color: theme.colors.error, textAlign: 'center', marginTop: 32 }}>No weather data available.</Paragraph>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherScreen;
