import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { monsterUrl } = route.params;
  const [monsterDetails, setMonsterDetails] = useState(null);

  useEffect(() => {
    const fetchMonsterDetails = async () => {
      try {
        const response = await fetch(`https://www.dnd5eapi.co${monsterUrl}`);
        const data = await response.json();
        setMonsterDetails(data);
      } catch (error) {
        console.error('Error fetching monster details:', error);
      }
    };

    fetchMonsterDetails();
  }, [monsterUrl]);

  if (!monsterDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.monsterName}>{monsterDetails.name}</Text>
      <Image
        source={{ uri: `https://www.dnd5eapi.co${monsterDetails.image}` }}
        style={styles.monsterImage}
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
