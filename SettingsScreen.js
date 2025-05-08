import React from 'react';
import { View, Text, Switch, SafeAreaView } from 'react-native';

const styles = require('./App.js').styles;

const SettingsScreen = ({ toggleTheme, isDarkMode }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settingsContainer}>
        <Text style={styles.settingsHeader}>App Settings</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
        <Text style={styles.settingDescription}>
          Toggle between light and dark theme for the app.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
