import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from AsyncStorage on component mount
  useEffect(() => {
    loadFavorites();
  }, []);

  // Save favorites to AsyncStorage whenever favorites change
  useEffect(() => {
    saveFavorites();
  }, [favorites]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from AsyncStorage:', error);
    }
  };

  const saveFavorites = async () => {
    try {
      const jsonFavorites = JSON.stringify(favorites);
      await AsyncStorage.setItem('favorites', jsonFavorites);
    } catch (error) {
      console.error('Error saving favorites to AsyncStorage:', error);
    }
  };

  const addFavorite = (monster) => {
    setFavorites((prevFavorites) => [...prevFavorites, monster]);
  };

  const removeFavorite = (monster) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favMonster) => favMonster.url !== monster.url)
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesProvider, FavoritesContext };
