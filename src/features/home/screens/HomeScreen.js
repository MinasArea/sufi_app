import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import SufiCard from '../../../shared/components/SufiCard';
import Icon from '../../../shared/components/Icon';
import ScatteredStars from '../../../shared/components/ScatteredStars';
import { COLORS } from '../../../shared/theme/colors';
import { pillars, teachingOfDay, libraryHighlights } from '../data/homeData';

const { width: SCREEN_W } = Dimensions.get('window');

const CARD_W = 160;
const OVERLAP = 35;
const SLOT_W = CARD_W - OVERLAP;
const SIDE_PAD = (SCREEN_W - SLOT_W) / 2;
const CENTER_INDEX = Math.floor(pillars.length / 2);
const INITIAL_X = CENTER_INDEX * SLOT_W;

export default function HomeScreen({ onNavigate }) {
  const fade = useRef(new Animated.Value(0)).current;
  const lift = useRef(new Animated.Value(14)).current;
  const [active, setActive] = useState(CENTER_INDEX);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(lift, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  const onScroll = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / SLOT_W);
    setActive(Math.min(Math.max(idx, 0), pillars.length - 1));
  };

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Animated.View style={{ opacity: fade, transform: [{ translateY: lift }] }}>
        
        {/* Hero */}
        <View style={s.hero}>
          <ScatteredStars />
          <View style={s.lantern}>
            <Svg width="52" height="78" viewBox="0 0 60 90">
              <Path d="M30 4v8M20 12h20l4 10H16l4-10ZM17 22h26l-3 40a10 10 0 0 1-20 0l-3-40Z" stroke={COLORS.goldHi} strokeWidth="1.4" fill="none" />
              <Circle cx="30" cy="42" r="4" fill={COLORS.goldHi} opacity=".6" />
            </Svg>
          </View>
          <View style={s.badge}>
            <View style={s.dotGlow} />
            <Text style={s.badgeText}>Open Circle · Practiced Together</Text>
          </View>
          <Text style={s.headline}>Four Doors{'\n'}Into the Heart</Text>
          <Text style={s.sub}>Each pillar of the path asks something different of you — together they are the whole of the work.</Text>
        </View>

        {/* Carousel */}
        <View style={s.carousel}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SLOT_W}
            decelerationRate={0.88}               // slower, softer glide
            contentContainerStyle={{ paddingHorizontal: SIDE_PAD }}
            contentOffset={{ x: INITIAL_X, y: 0 }}
            onScroll={onScroll}
            scrollEventThrottle={32}              // smoother scroll tracking
            overScrollMode="never"
          >
            {pillars.map((p, i) => (
              <View
                key={p.key}
                style={[
                  s.slot,
                  i === active && s.activeSlot,
                ]}
              >
                <SufiCard item={p} index={i} isActive={i === active} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Dots */}
        <View style={s.dots}>
          {pillars.map((_, i) => (
            <View key={i} style={[s.dot, i === active && s.dotActive]} />
          ))}
        </View>

        {/* Buttons */}
        <View style={s.actions}>
          <Pressable onPress={() => onNavigate('gatherings')} style={[s.btn, s.goldBtn]}>
            <Text style={s.goldBtnText}>Next gathering</Text>
          </Pressable>
          <Pressable onPress={() => onNavigate('questions')} style={[s.btn, s.lineBtn]}>
            <Text style={s.lineBtnText}>Ask something</Text>
          </Pressable>
        </View>

        {/* Teaching */}
        <SectionTitle title="Teaching of the day" more onPress={() => onNavigate('teachings')} />
        <View style={s.teachRow}>
          <Text style={s.teachText}>{teachingOfDay.text}</Text>
          <Text style={s.tag}>{teachingOfDay.tag}</Text>
        </View>

        {/* Library */}
        <SectionTitle title="From the library" more onPress={() => onNavigate('library')} />
        {libraryHighlights.map(([title, sub]) => (
          <Pressable key={title} style={s.rowCard} onPress={() => onNavigate('library')}>
            <View style={s.iconBox}><Icon name="book" size={17} /></View>
            <View style={s.rowText}>
              <Text style={s.rowTitle}>{title}</Text>
              <Text style={s.rowSub}>{sub}</Text>
            </View>
            <Text style={s.chev}>›</Text>
          </Pressable>
        ))}
      </Animated.View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

function SectionTitle({ title, more, onPress }) {
  return (
    <View style={s.sectionTitle}>
      <Text style={s.sectionTitleText}>{title}</Text>
      <Pressable onPress={onPress}><Text style={s.more}>{more ? 'See all ›' : ''}</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  content: { paddingTop: 20 },
  hero: { position: 'relative', alignItems: 'center', paddingTop: 8, paddingHorizontal: 20, overflow: 'visible' },
  lantern: { position: 'absolute', right: 20, top: -4, opacity: 0.5 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: 'rgba(201,168,104,.1)', borderWidth: 1, borderColor: COLORS.border },
  dotGlow: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.goldHi },
  badgeText: { fontSize: 11, color: COLORS.goldHi },
  headline: { fontSize: 32, lineHeight: 38, fontWeight: '700', color: COLORS.text1, textAlign: 'center', marginTop: 16 },
  sub: { fontSize: 13, lineHeight: 21, color: COLORS.text2, textAlign: 'center', maxWidth: 330, marginTop: 12, marginBottom: 10 },

  carousel: { height: 280, marginTop: 15 },
  slot: {
    width: SLOT_W,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'visible',
  },
  activeSlot: {
    zIndex: 100,
    elevation: 20,
  },

  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 12, marginBottom: 5 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.2)' },
  dotActive: { width: 20, backgroundColor: COLORS.gold, borderRadius: 3 },

  actions: { flexDirection: 'row', gap: 10, marginTop: 18, marginBottom: 5, paddingHorizontal: 20 },
  btn: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 999 },
  goldBtn: { backgroundColor: COLORS.gold },
  lineBtn: { borderWidth: 1, borderColor: COLORS.border },
  goldBtnText: { color: COLORS.bg, fontSize: 13, fontWeight: '600' },
  lineBtnText: { color: COLORS.text1, fontSize: 13, fontWeight: '500' },

  sectionTitle: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 30, marginBottom: 12, paddingHorizontal: 20 },
  sectionTitleText: { fontSize: 18, fontWeight: '600', color: COLORS.text1 },
  more: { fontSize: 12, color: COLORS.gold },

  teachRow: { marginHorizontal: 20, padding: 16, borderRadius: 16, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.borderSoft, shadowColor: '#000', shadowOpacity: 0.24, shadowRadius: 5, elevation: 1 },
  teachText: { fontSize: 18, lineHeight: 27, fontStyle: 'italic', color: COLORS.text1 },
  tag: { fontSize: 10, letterSpacing: 1, color: COLORS.text3, textTransform: 'uppercase', marginTop: 9 },

  rowCard: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 13, borderRadius: 16, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.borderSoft, marginBottom: 9, marginHorizontal: 20 },
  iconBox: { width: 38, height: 38, borderRadius: 10, backgroundColor: COLORS.surface2, alignItems: 'center', justifyContent: 'center' },
  rowText: { flex: 1 },
  rowTitle: { fontSize: 14, color: COLORS.text1, fontWeight: '500', marginBottom: 2 },
  rowSub: { fontSize: 11, color: COLORS.text3 },
  chev: { fontSize: 25, color: COLORS.text3 },
});