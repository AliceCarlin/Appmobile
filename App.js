import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const CharacterDisplay = () => {
  const [characterData, setCharacterData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character/2');
        setCharacterData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
}

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.boxes}>
        <Text style={{color: '#fff'}}>heyyy</Text>
      </View>
      <View style={styles.boxes}>
        <Text>Character Name: {characterData.name}</Text>
      </View>
      <View style={styles.boxes}>
        
      </View>
      <Text style={styles.text}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxes:{
    height: 72,
    width: 320,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginBottom:5,
    marginTop: 5,
    borderRadius: 15,
  },
  text:{
    color:'red'
  }
});
