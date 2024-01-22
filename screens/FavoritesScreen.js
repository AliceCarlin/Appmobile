import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FavoritesContext } from '../providers/FavoritesProvider';

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoritesContext);

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.favoriteItem}
      onPress={() => handleFavoritePress(item.url)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleFavoritePress = (monsterUrl) => {
    navigation.navigate('DetailsScreen', { monsterUrl: monsterUrl.split('/').pop(), sourceScreen: 'Favorites' });
  };

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
