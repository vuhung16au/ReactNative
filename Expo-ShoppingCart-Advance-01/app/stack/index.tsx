import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { ListRenderItemInfo } from 'react-native';

// Define product interface
interface Product {
  id: string;
  name: string;
  display: string;
  chipset: string;
  ram: string;
  price: string;
  image: string;
}

// Sample iPhone data based on the provided comparison table
const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15',
    display: '6.1″ OLED',
    chipset: 'A16 Bionic',
    ram: '6 GB',
    price: '$1,499 AUD',
    image: 'https://placehold.co/300x300/png?text=iPhone+15'
  },
  {
    id: '2',
    name: 'iPhone 15 Plus',
    display: '6.7″ OLED',
    chipset: 'A16 Bionic',
    ram: '6 GB',
    price: '$1,649 AUD',
    image: 'https://placehold.co/300x300/png?text=iPhone+15+Plus'
  },
  {
    id: '3',
    name: 'iPhone 15 Pro',
    display: '6.1″ OLED',
    chipset: 'A17 Pro',
    ram: '8 GB',
    price: '$1,849 AUD',
    image: 'https://placehold.co/300x300/png?text=iPhone+15+Pro'
  },
  {
    id: '4',
    name: 'iPhone 15 Pro Max',
    display: '6.7″ OLED',
    chipset: 'A17 Pro',
    ram: '8 GB',
    price: '$2,199 AUD',
    image: 'https://placehold.co/300x300/png?text=iPhone+15+Pro+Max'
  },
];

export default function StackIndexScreen() {
  const renderItem = ({ item }: ListRenderItemInfo<Product>) => (
    <Link href={`/stack/${item.id}`} asChild>
      <TouchableOpacity style={styles.productCard}>
        <View style={styles.productCardContent}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <View style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Details</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>iPhone 15 Series</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      <Link href="/tabs" style={styles.backLink}>
        <Text style={styles.backLinkText}>Back to Home</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  subtitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 18,
    marginBottom: 16,
    color: '#2c3e50',
  },
  listContainer: {
    paddingBottom: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productCardContent: {
    flexDirection: 'row',
    padding: 12,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    marginBottom: 6,
    color: '#2c3e50',
  },
  productPrice: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: '#e74c3c',
    marginBottom: 10,
  },
  viewButton: {
    backgroundColor: '#3498db',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: '#fff',
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
  },
  backLink: {
    marginTop: 20,
    alignSelf: 'center',
  },
  backLinkText: {
    fontFamily: 'Inter_700Bold',
    color: '#3498db',
    fontSize: 16,
  },
});