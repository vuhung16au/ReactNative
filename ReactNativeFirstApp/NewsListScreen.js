import React, { useState, useEffect, useCallback } from 'react';
import { View, SafeAreaView, FlatList, RefreshControl, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';
import { Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';

const styles = require('./App.js').styles;

// Safely access API key or use placeholder
const API_KEY = Config?.NEWSAPI_API_KEY || '';
const NEWS_URL = `https://newsapi.org/v2/everything?q=AI%20LLM&apiKey=${API_KEY}`;

const NewsListScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const fetchNews = useCallback(async () => {
    try {
      setError(null);
      if (!API_KEY) {
        setError('API key is missing. Please set NEWSAPI_API_KEY in your environment.');
        return;
      }
      
      const response = await fetch(NEWS_URL);
      const json = await response.json();
      
      if (json.status === 'error') {
        setError(json.message || 'Failed to fetch news');
        return;
      }
      
      if (json.articles) {
        setData(
          json.articles.map((article, idx) => ({
            id: idx.toString(),
            title: article.title || 'No title',
            description: article.description || 'No description available',
            url: article.url || '#'
          }))
        );
      } else {
        setError('No articles found');
      }
    } catch (error) {
      setError('Error fetching news: ' + (error.message || 'Unknown error'));
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.centerContainer]}>
          <Text style={{ color: theme.colors.error, textAlign: 'center', marginBottom: 16 }}>{error}</Text>
          <Button 
            mode="contained" 
            onPress={onRefresh}
            style={{ backgroundColor: theme.colors.primary }}
          >
            Retry
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Card
            style={{ backgroundColor: theme.colors.surface, borderRadius: 16, marginBottom: 16, elevation: 3 }}
            onPress={() => navigation.navigate('Details', { item })}
          >
            <Card.Content>
              <Title style={{ color: theme.colors.primary }}>{item.title}</Title>
              <Paragraph style={{ color: theme.colors.text }}>{item.description}</Paragraph>
              <Button
                mode="contained"
                style={{ marginTop: 8, borderRadius: 8, backgroundColor: theme.colors.primary }}
                onPress={() => navigation.navigate('Details', { item })}
                labelStyle={{ color: theme.colors.text }}
              >
                Read More
              </Button>
            </Card.Content>
          </Card>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={() => (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: theme.colors.text }}>No news articles available</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default NewsListScreen;
