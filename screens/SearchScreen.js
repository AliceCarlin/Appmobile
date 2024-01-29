import React, { useState } from 'react';
import { View, Text, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SearchScreen = () => {
  const validCRs = ['0', '0.125', '0.25', '0.5', '1', '2', '3', '4', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21','22', '23', '24', '30'];
  const navigation = useNavigation();

  const [selectedCR, setSelectedCR] = useState(validCRs[0]);
  const [searchResults, setSearchResults] = useState([]);

  const isValidCR = (cr) => validCRs.includes(cr);

  const handleSearch = async () => {
    if (!isValidCR(selectedCR)) {
      Alert.alert('Invalid Challenge Rating', 'Please enter a valid Challenge Rating.');
      return;
    }

    try {
      const response = await fetch(
        `https://www.dnd5eapi.co/api/monsters?challenge_rating=${selectedCR}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderMonsterItem = ({ item }) => {

    const containerWidth = searchResults.reduce((maxWidth, monster) => {
      const nameWidth = monster.name.length * 12;
      return nameWidth > maxWidth ? nameWidth : maxWidth;
    }, 0);

    return (
      <TouchableOpacity
        style={[styles.searchContainer, { width: containerWidth }]}
        onPress={() => handleMonsterPress(item.index)}
      >
        <Text style={styles.monsterName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const handleMonsterPress = (monsterIndex) => {
    const selectedMonster = searchResults[monsterIndex];
    if (selectedMonster) {
      navigation.navigate('DetailsScreen', { selectedMonster, sourceScreen: 'Search' });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Recherchez un monstre par Challenge Rating!</Text>
      <Picker
        selectedValue={selectedCR}
        onValueChange={(itemValue) => setSelectedCR(itemValue)}
      >
        {validCRs.map((cr) => (
          <Picker.Item key={cr} label={cr} value={cr} />
        ))}
      </Picker>
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.index.toString()}
        renderItem={renderMonsterItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  monsterName: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  odd: {
    marginRight: 5,
  },
  even: {
    marginLeft: 5,
  },
});

export default SearchScreen;
