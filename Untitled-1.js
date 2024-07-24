const playerStyle = (draggingValue) => useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(draggingValue.value.translateX) },
      { translateY: withSpring(draggingValue.value.translateY) },
    ],
  }));

  const gestureHandler = (draggingValue) => useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startX = draggingValue.value.translateX;
      context.startY = draggingValue.value.translateY;
    },
    onActive: (event, context) => {
      draggingValue.value = {
        translateX: context.startX + event.translationX,
        translateY: context.startY + event.translationY,
      };
    },
    onEnd: () => {
      draggingValue.value = {
        translateX: withSpring(0),
        translateY: withSpring(0),
      };
    },
  });