import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DraxView } from 'react-native-drax';

const PlayerItem = ({ item, onDragEnd, isAbsentList }) => {
  return (
    <DraxView
      style={styles.gridItem}
      payload={item}
      onReceiveDragDrop={onDragEnd}
      draggable={!isAbsentList}
      dragReleasedStyle={styles.dragReleased}
    >
      <Text>{item.name}</Text>
    </DraxView>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    zIndex: 1000000000,
    width: 65,
    height: 65,
    backgroundColor: '#ffdd01',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#000',
    borderWidth: 2,
    margin: 8,
  },
  dragReleased: {
    backgroundColor: '#ffd700', 
    transform: [{ scale: 0.95 }],
  },
});

export default PlayerItem;
