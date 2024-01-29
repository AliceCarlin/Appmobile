import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, FlatList } from 'react-native';
import { FavoritesContext } from '../providers/FavoritesProvider';

const DetailsScreen = ({ route, navigation }) => {
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
    setIsFavorite(favorites.some((favMonster) => favMonster.url === monsterDetails?.url));
  }, [favorites, monsterDetails]);

  const handleFavoritePress = () => {
    if (isFavorite) {
      removeFavorite(monsterDetails);
    } else {
      addFavorite(monsterDetails);
    }

    const sourceScreen = route.params.sourceScreen;
    if (sourceScreen === 'Favorites') {
      navigation.navigate('Favorites');
    } else {
      navigation.navigate('InfoScreen');
    }
  };

  if (!monsterDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const imageUrl = `https://www.dnd5eapi.co${monsterDetails.image}`;

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          <Text style={styles.monsterName}>{monsterDetails.name}</Text>
          {monsterDetails.image && (
            <Image source={{ uri: imageUrl }} style={styles.monsterImage} />
          )}
          <Button
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            onPress={handleFavoritePress}
          />
        </>
      }
      data={[]}
      keyExtractor={() => 'dummy-key'}
      renderItem={null} 
      ListFooterComponent={
        <View style={styles.detailsContainer}>
          <Text>Size: {monsterDetails.size}</Text>
          <Text>Type: {monsterDetails.type}</Text>
          <Text>Alignment: {monsterDetails.alignment}</Text>
          <Text>Armor Class: {monsterDetails.armor_class[0].value}</Text>
          <Text>Hit Points: {monsterDetails.hit_points}</Text>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Abilities</Text>
            <FlatList
              data={monsterDetails.special_abilities}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <View style={styles.abilityContainer}>
                  <Text style={styles.abilityName}>{item.name}</Text>
                  <Text>{item.desc}</Text>
                </View>
              )}
            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Actions</Text>
            <FlatList
              data={monsterDetails.actions}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <View style={styles.actionContainer}>
                  <Text style={styles.actionName}>{item.name}</Text>
                  <Text>{item.desc}</Text>
                </View>
              )}
            />
          </View>
        </View>
      }
    />
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
  sectionContainer: {
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  abilityContainer: {
    marginTop: 5,
  },
  abilityName: {
    fontWeight: 'bold',
  },
  actionContainer: {
    marginTop: 10,
  },
  actionName: {
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
