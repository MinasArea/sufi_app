import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import Icon from './Icon';
import { COLORS } from '../theme/colors';

export default function TopBar({ screenName }) {
  return (
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
  );
}

const s = StyleSheet.create({
  bar: {
    height: 88,              // was 74 — taller bar
    paddingTop: 26,          // more top breathing room
    paddingBottom: 10,       // bottom breathing room
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.bg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSoft,
  },
  id: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  mark: {
    width: 36,               // slightly bigger icon
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titles: {
    flexDirection: 'column',
  },
  brand: {
    fontSize: 16,            // slightly bigger title
    fontWeight: '700',
    color: COLORS.goldHi,
    lineHeight: 24,
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
    color: COLORS.text3,
    marginTop: 3,
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