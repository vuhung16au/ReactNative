import React from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, RefreshControl } from 'react-native';

const styles = require('./App.js').styles;

const DetailsScreen = ({ route, navigation }) => {
  const { item } = route.params || { item: { title: 'Detail', description: 'No data provided' } };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.detailsContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.detailsTitle}>{item.title}</Text>
        <Text style={styles.detailsDescription}>{item.description}</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
