import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allEpisodesLoaded, setAllEpisodesLoaded] = useState(false);

  const fetchEpisodes = async () => {
    try {
      if (loading || allEpisodesLoaded) {
        return;
      }

      setLoading(true);

      const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
      const data = await response.json();

      console.log('Fetched data:', data);

      if (data.error) {
        console.error('API Error:', data.error);
        setAllEpisodesLoaded(true);
        return;
      }

      if (data.results) {
        setEpisodes((prevEpisodes) => [...prevEpisodes, ...data.results]);
        if (page < data.info.pages) {
          setPage(page + 1);
        } else {
          setAllEpisodesLoaded(true);
        }
      } else {
        console.error('Results not found in fetched data:', data);
      }
    } catch (error) {
      console.error('Error fetching episodes:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderEpisodeItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      {/* Add other episode details as needed */}
    </View>
  );

  const handleEndReached = () => {
    if (!loading && !allEpisodesLoaded) {
      fetchEpisodes();
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []); // Initial fetch

  return (
    <View style={styles.container}>
      {episodes.length > 0 ? (
        <FlatList
          data={episodes}
          renderItem={renderEpisodeItem}
          keyExtractor={(item) => `${item.id}`}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
