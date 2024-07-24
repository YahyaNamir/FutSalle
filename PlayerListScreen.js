import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const AnimatedView = Animated.createAnimatedComponent(View);

const PlayerItem = ({ item, onDragEnd, isAbsentList }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);

      if (isAbsentList && event.translationY > 200) {
        onDragEnd();
      } else if (!isAbsentList && event.translationY < -200) {
        onDragEnd();
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
      zIndex: 1000, 
    };
  }, []);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <AnimatedView style={[styles.gridItem, animatedStyle]}>
        <Text>{item.name}</Text>
      </AnimatedView>
    </PanGestureHandler>
  );
};

const PlayerListScreen = ({
  players,
  setPlayers,
  absentPlayers,
  setAbsentPlayers,
}) => {
  const handleDragEnd = (item) => {
    setAbsentPlayers((prevAbsentPlayers) => [
      ...prevAbsentPlayers,
      item,
    ]);
    setPlayers((prevPlayers) =>
      prevPlayers.filter((p) => p.id !== item.id)
    );
  };

  const handleReturnPlayer = (item) => {
    setPlayers((prevPlayers) => [...prevPlayers, item]);
    setAbsentPlayers((prevAbsentPlayers) =>
      prevAbsentPlayers.filter((p) => p.id !== item.id)
    );
  };

  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>Players</Text>
      <FlatList
        data={players}
        renderItem={({ item }) => (
          <PlayerItem item={item} onDragEnd={() => handleDragEnd(item)} isAbsentList={false} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={4}
        columnWrapperStyle={styles.gridRow}
      />
      <Text style={styles.absentTitle}>Absent Players</Text>
      <FlatList
        data={absentPlayers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlayerItem styleitem={item} onDragEnd={() => handleReturnPlayer(item)} isAbsentList={true} />
        )}
        numColumns={4}
        columnWrapperStyle={styles.gridRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    zIndex: -1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    zIndex: -1,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  absentTitle: {
    fontSize: 20,
    zIndex: 90,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  gridItem: {
    zIndex: 90,
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
  gridRow: {
    justifyContent: 'flex-start',
    zIndex: 90,
  },
});

export default PlayerListScreen;
