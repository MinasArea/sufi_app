import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { COLORS } from '../theme/colors';

export default function FanCard({ item, index }) {
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(a, {
      toValue: 1,
      duration: 420,
      delay: index * 55,
      useNativeDriver: true,
    }).start();
  }, []);

  const isLight = item.lightBg;

  return (
    <Animated.View style={[s.card, { opacity: a }]}>
      <Svg pointerEvents="none" style={StyleSheet.absoluteFillObject} width="100%" height="100%">
        <Defs>
          <LinearGradient id={`fanGradient${index}`} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={item.color[0]} />
            <Stop offset="1" stopColor={item.color[1]} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" rx="18" fill={`url(#fanGradient${index})`} />
      </Svg>
      <View style={s.inner}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.82}
          style={[s.cadence, isLight && s.lightCadence]}
        >
          {item.cadence}
        </Text>
        <Text style={[s.letter, isLight && s.lightLetter]}>{item.letter}</Text>
        <Text
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.82}
          style={[s.name, isLight && s.lightName]}
        >
          {item.name}
        </Text>
        {item.desc && (
          <Text numberOfLines={4} style={[s.desc, isLight && s.lightDesc]}>
            {item.desc}
          </Text>
        )}
      </View>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  card: {
    width: 110,
    height: 180,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 7,
    overflow: 'hidden',
    position: 'relative',
  },
  inner: { flex: 1, minWidth: 0, padding: 14 },
  cadence: {
    alignSelf: 'flex-start',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: 'rgba(255,255,255,.9)',
    backgroundColor: 'rgba(5,15,10,.35)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 999,
    maxWidth: '100%',
  },
  lightCadence: { backgroundColor: 'rgba(10,42,30,.14)', color: COLORS.bg },
  letter: { fontSize: 28, color: 'rgba(255,255,255,.9)', lineHeight: 32, marginTop: 12 },
  lightLetter: { color: COLORS.bg },
  name: {
    marginTop: 'auto',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 15,
    color: 'rgba(255,255,255,.96)',
    textAlign: 'left',
  },
  lightName: { color: COLORS.bg },
  desc: { fontSize: 10, color: 'rgba(255,255,255,.78)', marginTop: 4, lineHeight: 14 },
  lightDesc: { color: 'rgba(10,42,30,.78)' },
});