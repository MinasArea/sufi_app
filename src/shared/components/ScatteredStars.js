import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const STARS = [
  { left: '8%', top: 18, size: 3, delay: 0 },
  { left: '18%', top: 64, size: 2, delay: 420 },
  { left: '30%', top: 8, size: 2, delay: 900 },
  { left: '42%', top: 48, size: 3, delay: 650 },
  { left: '56%', top: 20, size: 2, delay: 1200 },
  { left: '69%', top: 70, size: 3, delay: 300 },
  { left: '82%', top: 28, size: 2, delay: 760 },
  { left: '91%', top: 92, size: 3, delay: 1500 },
  { left: '12%', top: 118, size: 2, delay: 1100 },
  { left: '25%', top: 150, size: 3, delay: 500 },
  { left: '74%', top: 132, size: 2, delay: 1300 },
  { left: '88%', top: 158, size: 2, delay: 200 },
];

function Star({ star }) {
  const opacity = useRef(new Animated.Value(0.25)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(star.delay),
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0.95, duration: 900, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1.45, duration: 900, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0.22, duration: 1200, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 0.75, duration: 1200, useNativeDriver: true }),
        ]),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity, scale, star.delay]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.star,
        {
          left: star.left,
          top: star.top,
          width: star.size,
          height: star.size,
          borderRadius: star.size / 2,
          opacity,
          transform: [{ scale }],
        },
      ]}
    />
  );
}

export default function ScatteredStars() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
      {STARS.map((star, index) => <Star key={index} star={star} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
    backgroundColor: '#E4C77A',
    shadowColor: '#E4C77A',
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 4,
  },
});
