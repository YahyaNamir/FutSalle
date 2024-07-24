import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DraxProvider, DraxView } from 'react-native-drax';

const positions = {
  GK: { top: '40%', right: '30%' },
  LB: { top: '15%', right: '5%' },
  RB: { bottom: '15%', right: '5%' },
  LM: { top: '25%', left: '22%' },
  RM: { bottom: '25%', left: '22%' },
};

const FormationScreen = ({ formation, setFormation, players, setPlayers }) => {
  const handleReceiveDragDrop = (event, position) => {
    const draggedPlayer = event.dragged.payload;

    setFormation((prevFormation) => {
      const updatedFormation = prevFormation.map((p) => {
        if (p.position === position) {
          return { ...p, name: draggedPlayer.name };
        }
        return p;
      });
      return updatedFormation;
    });

    setPlayers((prevPlayers) =>
      prevPlayers.filter((p) => p.id !== draggedPlayer.id)
    );
  };

  return (
    <View style={styles.formationContainer}>
      <DraxProvider>
        {formation.map((player) => (
          <DraxView
            key={player.position}
            style={[styles.position, positions[player.position]]}
            payload={player}
            receivingStyle={styles.receiving}
            onReceiveDragDrop={(event) =>
              handleReceiveDragDrop(event, player.position)
            }
            draggable={false}
          >
            <Text style={styles.playerText}>
              {player.name || player.position}
            </Text>
          </DraxView>
        ))}
      </DraxProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  formationContainer: {
    flex: 1,
    marginTop: 16,
    alignItems: 'center',
  },
  position: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#b3b3ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 2,
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  playerText: {
    color: '#000',
    textAlign: 'center',
  },
});

export default FormationScreen;
