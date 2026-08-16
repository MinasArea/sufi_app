import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import Svg, { Path, Rect } from 'react-native-svg';
import Icon from './Icon';
import { COLORS } from '../theme/colors';

export default function TopBar({ screenName }) {
  return (
    <View style={s.wrapper}>
      <BlurView intensity={45} tint="dark" style={s.blur}>
        <View style={s.bar}>
          <View style={s.id}>
            <View style={s.mark}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path d="M12 2.5C8.5 2.5 6.5 6.8 6.5 10v1.2h11V10c0-3.2-2-7.5-5.5-7.5Z" fill={COLORS.gold}/>
                <Rect x="5.7" y="11.2" width="12.6" height="2.1" rx="0.6" fill={COLORS.gold}/>
                <Rect x="11" y="0" width="2" height="2.6" fill={COLORS.gold}/>
              </Svg>
            </View>
            <View style={s.titles}>
              <Text style={s.brand}>الْمِنْهَجُ الْمُحَمَّدِيُّ</Text>
              <Text style={s.screen}>{screenName}</Text>
            </View>
          </View>
          <View style={s.right}>
            <View style={s.streak}><Icon name="flame" size={17}/><Text style={s.streakText}>12</Text></View>
            <View style={s.aux}><Icon name="bell" size={17} color={COLORS.text2}/></View>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  blur: {
    paddingTop: Platform.OS === 'ios' ? 48 : 36,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: 'rgba(13, 31, 23, 0.55)', // dark green tint under blur
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  id: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  mark: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titles: {
    flexDirection: 'column',
  },
  brand: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.goldHi,
    lineHeight: 22,
    fontFamily: Platform.select({
      ios: 'GeezaPro-Bold',
      android: 'sans-serif-medium',
    }),
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  screen: {
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(245,245,240,0.6)',
    marginTop: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streak: {
    height: 36,
    paddingHorizontal: 8,
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  streakText: {
    color: COLORS.goldHi,
    fontWeight: '600',
    fontSize: 12,
  },
  aux: {
    width: 36,
    height: 36,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});