import React from 'react';
import { View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';

const styles = require('./App.js').styles;

const DetailsScreen = ({ route, navigation }) => {
  const { item } = route.params || { item: { title: 'Detail', description: 'No data provided' } };
  const [refreshing, setRefreshing] = React.useState(false);
  const theme = useTheme();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.detailsContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Card style={{ backgroundColor: theme.colors.surface, borderRadius: 16, margin: 16, elevation: 4 }}>
          <Card.Content>
            <Title style={{ color: theme.colors.primary, textAlign: 'center', marginBottom: 12 }}>{item?.title || 'Details'}</Title>
            <Paragraph style={{ color: theme.colors.text, fontSize: 18, marginBottom: 16 }}>{item?.description || item?.summary || 'No details available.'}</Paragraph>
          </Card.Content>
        </Card>
        <Button 
          mode="contained"
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: theme.colors.primary, marginTop: 16 }}
          labelStyle={{ color: theme.colors.text }}
        >
          Go Back
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
