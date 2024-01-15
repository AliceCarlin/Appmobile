import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { FavoritesContext } from '../providers/FavoritesProvider';

const DetailsScreen = ({ route }) => {
  const { monsterUrl } = route.params;
  const [monsterDetails, setMonsterDetails] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMonsterDetails = async () => {
      try {
        const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${monsterUrl}`);
        const data = await response.json();
        setMonsterDetails(data);
      } catch (error) {
        console.error('Error fetching monster details:', error);
      }
    };

    fetchMonsterDetails();
  }, [monsterUrl]);

  useEffect(() => {
    // Check if the monster is in favorites
    setIsFavorite(favorites.some((favMonster) => favMonster.url === monsterDetails?.url));
  }, [favorites, monsterDetails]);

  const handleFavoritePress = () => {
    if (isFavorite) {
      removeFavorite(monsterDetails);
    } else {
      addFavorite(monsterDetails);
    }
  };

  if (!monsterDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Prepend the base URL to the relative image path
  const imageUrl = `https://www.dnd5eapi.co${monsterDetails.image}`;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.monsterName}>{monsterDetails.name}</Text>
      {monsterDetails.image && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.monsterImage}
        />
      )}

      <Button
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        onPress={handleFavoritePress}
      />

      <View style={styles.detailsContainer}>
        <Text>Size: {monsterDetails.size}</Text>
        <Text>Type: {monsterDetails.type}</Text>
        <Text>Alignment: {monsterDetails.alignment}</Text>
        <Text>Armor Class: {monsterDetails.armor_class[0].value}</Text>
        <Text>Hit Points: {monsterDetails.hit_points}</Text>
        {/* Add more details as needed */}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  monsterName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  monsterImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 20,
  },
});

export default DetailsScreen;
