import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Define types for our component items
type ComponentItem = {
  id: string;
  title: string;
  type: 'section' | 'list_example';
};

// Define types for sample data
type DataItem = {
  id: string;
  title: string;
};

type SectionDataItem = {
  title: string;
  data: string[];
};

const ListComponentsScreen = () => {
  // Sample data for list components
  const DATA: DataItem[] = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' },
  ];
  
  const SECTION_DATA: SectionDataItem[] = [
    {
      title: 'Section 1',
      data: ['Item 1-1', 'Item 1-2', 'Item 1-3'],
    },
    {
      title: 'Section 2',
      data: ['Item 2-1', 'Item 2-2', 'Item 2-3'],
    },
  ];

  // List components data
  const LIST_COMPONENTS: ComponentItem[] = [
    { id: 'lists', title: 'List Views', type: 'section' },
    { id: 'flatlist_example', title: 'FlatList', type: 'list_example' },
    { id: 'sectionlist_example', title: 'SectionList', type: 'list_example' },
  ];
  
  // Render different types of items
  const renderItem = ({ item }: { item: ComponentItem }) => {
    switch (item.type) {
      case 'section':
        return (
          <View>
            <Text style={styles.sectionTitle}>{item.title}</Text>
          </View>
        );
        
      case 'list_example':
        return (
          <View style={styles.box}>
            <Text style={styles.title}>{item.title}</Text>
            
            {item.id === 'flatlist_example' && (
              <View style={styles.listContainer}>
                {DATA.map(dataItem => (
                  <View style={styles.listItem} key={dataItem.id}>
                    <Text>{dataItem.title}</Text>
                  </View>
                ))}
              </View>
            )}
            
            {item.id === 'sectionlist_example' && (
              <View style={styles.listContainer}>
                {SECTION_DATA.map((section, sectionIndex) => (
                  <View key={sectionIndex}>
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                    {section.data.map((dataItem, itemIndex) => (
                      <View style={styles.listItem} key={`${sectionIndex}-${itemIndex}`}>
                        <Text>{dataItem}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <FlatList
        data={LIST_COMPONENTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  box: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listContainer: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
    maxHeight: 200,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  }
});

export default ListComponentsScreen;