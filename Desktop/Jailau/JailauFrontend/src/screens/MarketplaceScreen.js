import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import { getCategories, getListings } from '../services/api';
import colors from '../styles/colors';

const MarketplaceScreen = () => {
  const [categories, setCategories] = useState([]);
  const [listings, setListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredListings, setFilteredListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Функция загрузки данных с фильтрацией
  const fetchData = async () => {
    const categoriesData = await getCategories();
    const listingsData = await getListings();
    setCategories(categoriesData);
    setListings(listingsData);

    // Применить фильтрацию сразу после загрузки данных
    applyFilters(listingsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const applyFilters = (data) => {
    let filtered = data || listings;
    if (selectedCategory) {
      filtered = filtered.filter(listing => listing.category.id === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredListings(filtered);
  };

  // Функция обновления при потягивании вниз
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleSearch = () => {
    applyFilters(listings);
  };

  const renderItem = ({ item }) => (
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
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Маркетплейс</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Поиск</Text>
        </TouchableOpacity>
      </View>

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
          onPress={() => {
            setSelectedCategory(null);
            setSearchQuery('');
            setFilteredListings(listings);
          }}
        >
          <Text style={styles.resetButtonText}>Сбросить фильтр</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredListings}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        key={(selectedCategory ? selectedCategory.toString() : 'all') + '_2'}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl 
                refreshing={refreshing}
                onRefresh={onRefresh} 
                tintColor="#5C832F"
                colors={['#5C832F']} 
                progressBackgroundColor="#fff" 
                />
        }
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  searchButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  list: {
    paddingBottom: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  cardPrice: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 5,
  },
});

export default MarketplaceScreen;
