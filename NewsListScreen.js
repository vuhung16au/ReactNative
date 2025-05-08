import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Pressable, SafeAreaView, FlatList, RefreshControl, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';

const styles = require('./App.js').styles;

// const API_KEY = '1a468223e1f84227a9c7075bde9b9e56'; // Removed hardcoded key
const NEWS_URL = `https://newsapi.org/v2/everything?q=AI%20LLM&apiKey=${Config.NEWSAPI_API_KEY}`;

const NewsListScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const fetchNews = useCallback(async () => {
    try {
      const response = await fetch(NEWS_URL);
      const json = await response.json();
      if (json.articles) {
        setData(
          json.articles.map((article, idx) => ({
            id: idx.toString(),
            title: article.title,
            description: article.description,
            url: article.url
          }))
        );
      }
    } catch (error) {
      // Optionally handle error
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

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => Linking.openURL(item.url)}
      style={({ pressed }) => [
        styles.listItem,
        pressed && styles.listItemPressed
      ]}
    >
      <View>
        <Text style={styles.listItemTitle}>{item.title}</Text>
        <Text style={styles.listItemDescription}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default NewsListScreen;
