import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Icon from '../../../shared/components/Icon';
import { COLORS } from '../../../shared/theme/colors';

const CATEGORIES = [
  { key: 'videos', title: 'Videos', subtitle: 'Lectures & Lessons', icon: 'play', color: ['#1B4332', '#2D6A4F'] },
  { key: 'qasaid', title: 'Qasa\'id', subtitle: 'Poems & Nasheeds', icon: 'music', color: ['#4A2E1E', '#6B422A'] },
  { key: 'books', title: 'Books', subtitle: 'Classical Texts', icon: 'book', color: ['#0F3F49', '#145A6B'] },
];

export default function LibraryScreen({ onNavigateCategory }) {
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Text style={s.title}>The Library</Text>
      <Text style={s.sub}>Select a collection</Text>

      <View style={s.grid}>
        {CATEGORIES.map((cat) => (
          <Pressable key={cat.key} style={s.card} onPress={() => onNavigateCategory(cat.key)}>
            <View style={[s.iconCircle, { backgroundColor: cat.color[0] + '50' }]}>
              <Icon name={cat.icon} size={28} color={COLORS.goldHi} />
            </View>
            <View>
              <Text style={s.cardTitle}>{cat.title}</Text>
              <Text style={s.cardSub}>{cat.subtitle}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1 }, // NO backgroundColor
  content: { padding: 20, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: '700', color: '#F5F5F0', marginBottom: 4 },
  sub: { fontSize: 13, color: 'rgba(245,245,240,0.6)', marginBottom: 24 },
  grid: { gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 18,
    borderRadius: 18,
    backgroundColor: 'rgba(13,31,23,0.45)', // glass
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#F5F5F0', marginBottom: 2 },
  cardSub: { fontSize: 12, color: 'rgba(245,245,240,0.6)' },
});