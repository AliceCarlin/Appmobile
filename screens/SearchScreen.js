import React, { useState } from 'react';
import { View, Text, Button, FlatList, Picker } from 'react-native';

const SearchScreen = () => {
  const validCRs = ['0', '0.125', '0.25', '0.5', '1', '2', '3', /*... other CRs ...*/, '22', '23', '24', '30'];

  const [selectedCR, setSelectedCR] = useState(validCRs[0]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    // Your existing search logic here
  };

  return (
    <View>
      <Text>Search Screen</Text>
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
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            {/* Add more details or navigation logic here */}
          </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;
