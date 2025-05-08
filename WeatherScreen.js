import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ActivityIndicator, SafeAreaView, Platform, ScrollView, RefreshControl } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { Card, Title, Paragraph } from 'react-native-paper';
import { OPENWEATHER_API_KEY } from '@env';

const styles = require('./App.js').styles;

const WeatherScreen = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const API_KEY = OPENWEATHER_API_KEY; // Use API key from .env

  useEffect(() => {
    const getLocationAndWeather = async () => {
      try {
        setLoading(true);
        setError(null);
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
      setError('Error fetching weather: ' + err.message);
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
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading weather data...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Try Again" onPress={() => {
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
        }} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.weatherContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {weather ? (
          <View>
            <Card style={[styles.weatherCard, { overflow: 'visible' }]}>
              <View style={{ overflow: 'hidden', borderRadius: 10 }}>
                <Card.Content>
                  <Title>Weather in {weather?.name}</Title>
                  <View style={styles.weatherDetails}>
                    {weather?.weather?.[0]?.icon && (
                      <Image
                        source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
                        style={styles.weatherIcon}
                      />
                    )}
                    <View style={{ justifyContent: 'center' }}>
                      <Paragraph style={styles.temperature}>
                        {weather?.main?.temp !== undefined && weather?.main?.temp !== null
                          ? `${Math.round(weather.main.temp)}°C`
                          : '--°C'}
                      </Paragraph>
                      <Paragraph style={{ textAlign: 'left' }}>{weather?.weather?.[0]?.description || ''}</Paragraph>
                    </View>
                  </View>
                  <View style={styles.extraWeatherInfo}>
                    <Paragraph>Humidity: {weather?.main?.humidity}%</Paragraph>
                    <Paragraph>Wind: {weather?.wind?.speed} m/s</Paragraph>
                  </View>
                </Card.Content>
              </View>
            </Card>
          </View>
        ) : (
          <Text style={styles.errorText}>No weather data available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherScreen;
