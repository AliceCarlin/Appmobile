import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FavoritesContext } from '../providers/FavoritesProvider';

const FavoritesScreen = () => {
  const { favorites } = useContext(FavoritesContext);

  // Render each favorite monster
  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Text>{item.name}</Text>
      <Text>Size: {item.size}</Text>
      {/* Add more details as needed */}
      <Text>Remove from Favorites</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.url}
        />
      ) : (
        <Text>No favorites yet!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
  },
  favoriteItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
});

export default FavoritesScreen;
