import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, SafeAreaView, Image, Platform, Dimensions, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { OPENWEATHER_API_KEY } from '@env';

const styles = require('./App.js').styles;

const WeatherScreenFull = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Using API key from .env file
  const theme = useTheme();

  useEffect(() => {
    const getLocationAndWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        // Improved API key check and error message
        if (!OPENWEATHER_API_KEY) {
          throw new Error('OpenWeather API key not found. Please set OPENWEATHER_API_KEY in your .env file.');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setError(null);
      // Get current weather
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );
      setWeather(weatherRes.data);
      // Get forecast (hourly and daily)
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );
      setForecast(forecastRes.data);
      setLoading(false);
    } catch (err) {
      // Improved error handling for API/network errors
      if (err.response) {
        setError(`API Error (${err.response.status}): ${err.response.data.message || 'Unknown error'}`);
      } else if (err.request) {
        setError('Network error: Unable to reach weather service');
      } else {
        setError('Error fetching weather: ' + err.message);
      }
      setLoading(false);
    }
  };

  const getTimeString = (dt, timezoneOffset) => {
    // dt in seconds, timezoneOffset in seconds
    const date = new Date((dt + timezoneOffset) * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDateString = (dt, timezoneOffset) => {
    const date = new Date((dt + timezoneOffset) * 1000);
    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>Loading full weather...</Text>
        </View>
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }
  if (!weather || !forecast) {
    return null;
  }
  const timezoneOffset = forecast.timezone_offset || 0;
  const now = getTimeString(forecast.current.dt, timezoneOffset);
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <ScrollView contentContainerStyle={{ padding: 16 }} style={{ backgroundColor: theme.colors.background }}>
        {/* Current Weather */}
        <Card style={{ backgroundColor: theme.colors.surface, borderRadius: 16, marginBottom: 16, elevation: 4 }}>
          <Card.Content>
            <Title style={{ color: theme.colors.primary, textAlign: 'center' }}>{weather.name}, {weather.sys?.country}</Title>
            <Paragraph style={{ color: theme.colors.text, textAlign: 'center', fontSize: 16 }}>{now} &bull; {weather.weather?.[0]?.description || ''}</Paragraph>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
              {weather.weather?.[0]?.icon && (
                <Image
                  source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
                  style={{ width: 80, height: 80, marginRight: 16 }}
                />
              )}
              <Text style={{ fontSize: 48, fontWeight: 'bold', color: theme.colors.text }}>{Math.round(weather.main.temp)}°C</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <Text style={{ color: theme.colors.text }}>Feels like: {Math.round(weather.main.feels_like)}°C</Text>
              <Text style={{ color: theme.colors.text }}>Humidity: {weather.main.humidity}%</Text>
              <Text style={{ color: theme.colors.text }}>Wind: {weather.wind.speed} m/s</Text>
            </View>
          </Card.Content>
        </Card>
        {/* Hourly Forecast */}
        <Card style={{ backgroundColor: theme.colors.surface, borderRadius: 16, marginBottom: 16, elevation: 2 }}>
          <Card.Content>
            <Title style={{ color: theme.colors.primary, fontSize: 18 }}>Hourly forecast</Title>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
              {forecast.hourly.slice(0, 8).map((h, idx) => (
                <View key={h.dt} style={{ alignItems: 'center', marginRight: 18, minWidth: 60 }}>
                  <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>{getTimeString(h.dt, timezoneOffset)}</Text>
                  <Image source={{ uri: `https://openweathermap.org/img/wn/${h.weather[0].icon}@2x.png` }} style={{ width: 40, height: 40 }} />
                  <Text style={{ color: theme.colors.text }}>{Math.round(h.temp)}°</Text>
                  <Text style={{ color: theme.colors.placeholder, fontSize: 12 }}>{h.weather[0].description}</Text>
                </View>
              ))}
            </ScrollView>
          </Card.Content>
        </Card>
        {/* 8-day Forecast */}
        <Card style={{ backgroundColor: theme.colors.surface, borderRadius: 16, marginBottom: 16, elevation: 2 }}>
          <Card.Content>
            <Title style={{ color: theme.colors.primary, fontSize: 18 }}>8-day forecast</Title>
            {forecast.daily.slice(0, 8).map((d, idx) => (
              <View key={d.dt} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 6 }}>
                <Text style={{ color: theme.colors.text, width: 90 }}>{getDateString(d.dt, timezoneOffset)}</Text>
                <Image source={{ uri: `https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png` }} style={{ width: 32, height: 32, marginHorizontal: 8 }} />
                <Text style={{ color: theme.colors.text, width: 70 }}>{Math.round(d.temp.max)} / {Math.round(d.temp.min)}°C</Text>
                <Text style={{ color: theme.colors.placeholder, flex: 1 }}>{d.weather[0].description}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherScreenFull;
