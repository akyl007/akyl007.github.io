import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getCategories, getListings } from '../services/api';
import colors from '../styles/colors';

const MarketplaceScreen = () => {
  const [categories, setCategories] = useState([]);
  const [listings, setListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getCategories();
      const listingsData = await getListings();
      setCategories(categoriesData);
      setListings(listingsData);
    };
    fetchData();
  }, []);

  const filterListings = () => {
    if (selectedCategory) {
      return listings.filter(listing => listing.category.id === selectedCategory);
    }
    return listings;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Маркетплейс</Text>
      <View style={styles.filterContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={styles.categoryButtonText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={styles.resetButtonText}>Сбросить фильтр</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filterListings()}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.image_url ? (
              <Image source={{ uri: item.image_url }} style={styles.cardImage} />
            ) : (
              <View style={styles.placeholderImage}><Text>No Image</Text></View>
            )}
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPrice}>{item.price} KZT</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: colors.placeholder,
    borderRadius: 20,
    margin: 5,
  },
  selectedCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    color: colors.textPrimary,
  },
  resetButton: {
    padding: 10,
    backgroundColor: colors.buttonReset,
    borderRadius: 20,
    margin: 5,
  },
  resetButtonText: {
    color: colors.white,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: 150,
    backgroundColor: colors.placeholder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  cardPrice: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 5,
  },
});

export default MarketplaceScreen;
