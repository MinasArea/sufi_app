import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import SufiCard from '../../../shared/components/SufiCard';
import Icon from '../../../shared/components/Icon';
import ScatteredStars from '../../../shared/components/ScatteredStars';
import GreenDomeStrip from '../../../shared/components/GreenDomeStrip';
import { COLORS } from '../../../shared/theme/colors';
import { pillars, teachingOfDay, libraryCategories } from '../data/homeData';

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
    <ScrollView style={{ flex: 1 }} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Animated.View style={{ opacity: fade, transform: [{ translateY: lift }] }}>
        
        {/* 1. Flag at the very top */}
        <View style={s.flagTop}>
          <GreenDomeStrip />
        </View>

        {/* 2. Headline */}
        <View style={s.hero}>
          <ScatteredStars />
          <Text style={s.headline}>Four Doors{'\n'}Into the Heart</Text>
          <Text style={s.sub}>Each pillar of the path asks something different of you — together they are the whole of the work.</Text>
        </View>

        {/* 3. Carousel */}
        <View style={s.carousel}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SLOT_W}
            decelerationRate={0.88}
            contentContainerStyle={{ paddingHorizontal: SIDE_PAD }}
            contentOffset={{ x: INITIAL_X, y: 0 }}
            onScroll={onScroll}
            scrollEventThrottle={32}
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

        {/* 4. Dots */}
        <View style={s.dots}>
          {pillars.map((_, i) => (
            <View key={i} style={[s.dot, i === active && s.dotActive]} />
          ))}
        </View>

        {/* 5. Buttons */}
        <View style={s.actions}>
          <Pressable onPress={() => onNavigate('gatherings')} style={[s.btn, s.goldBtn]}>
            <Text style={s.goldBtnText}>Next gathering</Text>
          </Pressable>
          <Pressable onPress={() => onNavigate('questions')} style={[s.btn, s.lineBtn]}>
            <Text style={s.lineBtnText}>Ask something</Text>
          </Pressable>
        </View>

        {/* 6. Teaching */}
        <SectionTitle title="Teaching of the day" more onPress={() => onNavigate('teachings')} />
        <View style={s.teachRow}>
          <Text style={s.teachText}>{teachingOfDay.text}</Text>
          <Text style={s.tag}>{teachingOfDay.tag}</Text>
        </View>

        {/* 7. Library */}
        <SectionTitle title="The Library" more onPress={() => onNavigate('library')} />
        <View style={s.libGrid}>
          {libraryCategories.map((cat) => (
            <Pressable key={cat.key} style={s.libCard} onPress={() => onNavigate('library')}>
              <View style={[s.libIconBox, { backgroundColor: cat.color[0] + '40' }]}>
                <Icon name={cat.icon} size={20} color={COLORS.goldHi} />
              </View>
              <View style={s.libText}>
                <Text style={s.libTitle}>{cat.title}</Text>
                <Text style={s.libSub}>{cat.subtitle}</Text>
              </View>
              <Text style={s.libCount}>{cat.count > 0 ? cat.count : '—'}</Text>
            </Pressable>
          ))}
        </View>
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
  content: { paddingTop: 10 },

  flagTop: {
    marginTop: -10,
    marginBottom: -30,
    zIndex: 0,
  },

  hero: {
    position: 'relative',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 10,
    overflow: 'visible',
  },

  headline: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    color: '#F5F5F0',
    textAlign: 'center',
    marginTop: 8,
    zIndex: 2,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  sub: {
    fontSize: 13,
    lineHeight: 20,
    color: 'rgba(245,245,240,0.85)',
    textAlign: 'center',
    maxWidth: 330,
    marginTop: 8,
    marginBottom: 5,
    zIndex: 2,
  },

  carousel: { height: 280, marginTop: 10 },
  slot: { width: SLOT_W, justifyContent: 'flex-end', alignItems: 'center', overflow: 'visible' },
  activeSlot: { zIndex: 100, elevation: 20 },

  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 10, marginBottom: 5 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.2)' },
  dotActive: { width: 20, backgroundColor: COLORS.gold, borderRadius: 3 },

  actions: { flexDirection: 'row', gap: 10, marginTop: 18, marginBottom: 5, paddingHorizontal: 20 },
  btn: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 999 },
  goldBtn: { backgroundColor: COLORS.gold },
  lineBtn: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  goldBtnText: { color: COLORS.bg, fontSize: 13, fontWeight: '600' },
  lineBtnText: { color: '#F5F5F0', fontSize: 13, fontWeight: '500' },

  sectionTitle: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 30, marginBottom: 12, paddingHorizontal: 20 },
  sectionTitleText: { fontSize: 18, fontWeight: '600', color: '#F5F5F0' },
  more: { fontSize: 12, color: COLORS.gold },

  teachRow: { marginHorizontal: 20, padding: 16, borderRadius: 16, backgroundColor: 'rgba(13,31,23,0.45)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  teachText: { fontSize: 18, lineHeight: 27, fontStyle: 'italic', color: '#F5F5F0' },
  tag: { fontSize: 10, letterSpacing: 1, color: 'rgba(245,245,240,0.6)', textTransform: 'uppercase', marginTop: 9 },

  libGrid: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 10 },
  libCard: {
    flex: 1,
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(13,31,23,0.40)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 8,
  },
  libIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  libText: { alignItems: 'center', gap: 2 },
  libTitle: { fontSize: 13, fontWeight: '700', color: '#F5F5F0' },
  libSub: { fontSize: 10, color: 'rgba(245,245,240,0.6)', textAlign: 'center' },
  libCount: { fontSize: 11, fontWeight: '600', color: COLORS.gold, marginTop: 2 },
});