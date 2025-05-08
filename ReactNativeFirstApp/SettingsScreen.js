import React from 'react';
import { View, Text, Switch, SafeAreaView } from 'react-native';
import { Card, List, Switch as PaperSwitch, useTheme } from 'react-native-paper';

const styles = require('./App.js').styles;

const SettingsScreen = ({ toggleTheme, isDarkMode }) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Card style={{ backgroundColor: theme.colors.surface, borderRadius: 16, margin: 16, elevation: 3 }}>
        <Card.Content>
          <List.Section>
            <List.Subheader style={{ color: theme.colors.primary, fontSize: 22 }}>App Settings</List.Subheader>
            <List.Item
              title="Dark Mode"
              titleStyle={{ color: theme.colors.text, fontSize: 18 }}
              right={() => (
                <PaperSwitch
                  value={isDarkMode}
                  onValueChange={toggleTheme}
                  color={theme.colors.primary}
                />
              )}
            />
            <List.Item
              description="Toggle between light and dark theme for the app."
              descriptionStyle={{ color: theme.colors.placeholder }}
            />
          </List.Section>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

export default SettingsScreen;
