import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View, Easing } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { COLORS } from '../theme/colors';

export default function SufiCard({ item, index, isActive }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 900,
      delay: index * 120,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  const rotation = isActive ? 0 : item.rotation;
  const translateY = isActive ? -22 : item.y;
  const scale = isActive ? 1.18 : 0.92;

  return (
    <Animated.View
      style={[
        s.card,
        {
          opacity: anim,
          transform: [
            { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.8, scale] }) },
            { rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${rotation}deg`] }) },
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [40, translateY] }) },
          ],
        },
      ]}
    >
      {/* Smooth gradient background */}
      <View style={s.bg}>
        <Svg width="100%" height="100%">
          <Defs>
            <LinearGradient id={`grad${index}`} x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={item.color[0]} />
              <Stop offset="0.5" stopColor={item.color[1]} />
              <Stop offset="1" stopColor={item.color[0]} />
            </LinearGradient>
            <LinearGradient id={`shine${index}`} x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#fff" stopOpacity="0" />
              <Stop offset="0.5" stopColor="#fff" stopOpacity="0.06" />
              <Stop offset="1" stopColor="#fff" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" rx={24} fill={`url(#grad${index})`} />
          <Rect x="0" y="0" width="100%" height="100%" rx={24} fill={`url(#shine${index})`} />
        </Svg>
      </View>

      {/* Content */}
      <View style={s.inner}>
        <View style={s.badge}>
          <Text style={s.badgeText}>{item.category}</Text>
        </View>

        <View style={s.letterCircle}>
          <Text style={s.letter}>{item.letter}</Text>
        </View>

        <View style={s.textBlock}>
          <Text style={s.title} numberOfLines={2}>{item.name}</Text>
          <Text style={s.author}>{item.author}</Text>
          {isActive && item.desc ? (
            <Text style={s.desc} numberOfLines={2}>{item.desc}</Text>
          ) : null}
        </View>
      </View>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  card: {
    width: 160,
    height: 230,
    borderRadius: 24,
    padding: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
    position: 'relative',
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    overflow: 'hidden',
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 2,
  },
  badge: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  letterCircle: {
    alignSelf: 'center',
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  letter: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '800',
  },
  textBlock: {
    marginTop: 'auto',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 20,
    marginBottom: 3,
  },
  author: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  desc: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 14,
    fontStyle: 'italic',
  },
});