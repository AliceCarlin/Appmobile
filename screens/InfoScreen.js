import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InfoScreen = () => {
  const navigation = useNavigation();

  const handleMonsterPress = (monsterUrl) => {
    navigation.navigate('DetailsScreen', { monsterUrl });
  };

  const renderMonsterItem = ({ item, index }) => {
    const isOdd = index % 2 === 1;
  
    const containerWidth = monsters.reduce((maxWidth, monster) => {
      const nameWidth = monster.name.length * 7;
      return nameWidth > maxWidth ? nameWidth : maxWidth;
    }, 0);
  
    return (
      <TouchableOpacity
        style={[styles.monsterContainer, isOdd ? styles.odd : styles.even, { width: containerWidth }]}
        onPress={() => handleMonsterPress(item.index)}
      >
        <Text style={styles.monsterName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const [monsters, setMonsters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allMonstersLoaded, setAllMonstersLoaded] = useState(false);

  const fetchMonsters = async () => {
    try {
      if (loading || allMonstersLoaded) {
        return;
      }

      setLoading(true);

      const response = await fetch(`https://www.dnd5eapi.co/api/monsters?page=${page}`);
      const data = await response.json();

      if (data.count === 0 || !data.results) {
        console.error('No monsters found in fetched data:', data);
        setAllMonstersLoaded(true);
        return;
      }

      const newMonsters = data.results.filter(
        (newMonster) =>
          monsters.every((existingMonster) => existingMonster.index !== newMonster.index)
      );

      setMonsters((prevMonsters) => [...prevMonsters, ...newMonsters]);

      if (page < Math.ceil(data.count / 20)) {
        setPage(page + 1);
      } else {
        setAllMonstersLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching monsters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    if (!loading && !allMonstersLoaded) {
      fetchMonsters();
    }
  };

  useEffect(() => {
    fetchMonsters();
  }, []); // Initial fetch

  return (
    <View style={styles.container}>
      {monsters.length > 0 ? (
        <FlatList
          data={monsters}
          renderItem={renderMonsterItem}
          keyExtractor={(item) => item.index}
          onEndReached={handleEndReached}
          showsVerticalScrollIndicator = {false}
          onEndReachedThreshold={0.5}
          key={2}
          numColumns={2} // Add this line to display two columns
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
  },
  monsterContainer: {
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

export default InfoScreen;
