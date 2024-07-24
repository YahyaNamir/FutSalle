import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider } from 'react-native-drax'; 
import PlayerListScreen from './PlayerListScreen';
import FormationScreen from './FormationScreen';

const App = () => {
  const [players, setPlayers] = useState([
    { id: '1', name: 'Anibe' },
    { id: '2', name: 'Elfenni' },
    { id: '3', name: 'Hadri' },
    { id: '4', name: 'Alayn' },
    { id: '5', name: 'Mesrar' },
    { id: '6', name: 'Idris' },
    { id: '7', name: 'Safioui' },
    { id: '8', name: 'Mosry' },
    { id: '9', name: 'P 9' },
    { id: '10', name: 'P 10' },
  ]);

  const [absentPlayers, setAbsentPlayers] = useState([]);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [formation, setFormation] = useState([
    { id: 'GK', name: '', position: 'GK' },
    { id: 'LB', name: '', position: 'LB' },
    { id: 'RB', name: '', position: 'RB' },
    { id: 'LM', name: '', position: 'LM' },
    { id: 'RM', name: '', position: 'RM' },
  ]);

  useEffect(() => {
    let interval = null;
    if (isGameRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isGameRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isGameRunning, timer]);

  const handleStartGame = () => {
    setIsGameRunning(!isGameRunning);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <DraxProvider>
        <ImageBackground
          source={require('./assets/stade.jpeg')}
          style={styles.imageBackground}
        >
          <View style={styles.header}>
            <View style={styles.scoreContainer}>
              <Text style={styles.headerText}>MAROC</Text>
              <Text style={styles.score}>{formatTime(timer)}</Text>
              <Text style={styles.headerText}>ALBANIA</Text>
            </View>
          </View>
          <FormationScreen
            formation={formation}
            setFormation={setFormation}
            players={players}
            setPlayers={setPlayers}
            absentPlayers={absentPlayers}
            setAbsentPlayers={setAbsentPlayers}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleStartGame}
              style={styles.buttonStyle}
            >
              <Text style={styles.buttonText}>
                {isGameRunning ? 'Stop Game' : 'Start Game'}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <PlayerListScreen
          players={players}
          setPlayers={setPlayers}
          absentPlayers={absentPlayers}
          setAbsentPlayers={setAbsentPlayers}
        />
      </DraxProvider> 
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#0b7a2c',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: '#ffffffa2',
    borderBottomWidth: 3,
    zIndex: 20,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerText: {
    color: 'white',
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  score: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    borderRadius: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonStyle: {
    flexDirection: 'row',
    fontFamily: 'Outfit-Bold',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: '#f9df69',
    borderRadius: 50,
    borderColor: '#ffffff',
    borderWidth: 3,
    width: 200,
    marginBottom: -15,
    zIndex: 1,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
  },

  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Outfit-Bold',
  },
});

export default App;
