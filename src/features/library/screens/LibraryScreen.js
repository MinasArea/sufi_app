import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import Icon from '../../../shared/components/Icon';

const CATEGORIES = [
  { key: 'videos', title: 'Videos', subtitle: 'Lectures & Lessons', icon: 'play', color: ['#1B4332', '#2D6A4F'] },
  { key: 'qasaid', title: 'Qasa\'id', subtitle: 'Poems & Nasheeds', icon: 'music', color: ['#4A2E1E', '#6B422A'] },
  { key: 'books', title: 'Books', subtitle: 'Classical Texts', icon: 'book', color: ['#0F3F49', '#145A6B'] },
];

export default function LibraryScreen({ onNavigateCategory }) {
  return (
    <View style={s.screen}>
      <Text style={s.pageTitle}>The Library</Text>
      <Text style={s.pageSub}>Select a collection</Text>

      <View style={s.grid}>
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat.key}
            style={s.card}
            onPress={() => onNavigateCategory(cat.key)}
          >
            <View style={[s.iconCircle, { backgroundColor: cat.color[0] + '50' }]}>
              <Icon name={cat.icon} size={28} color={COLORS.goldHi} />
            </View>
            <Text style={s.cardTitle}>{cat.title}</Text>
            <Text style={s.cardSub}>{cat.subtitle}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 20, paddingTop: 20 },
  pageTitle: { fontSize: 28, fontWeight: '700', color: COLORS.text1, marginBottom: 4 },
  pageSub: { fontSize: 13, color: COLORS.text3, marginBottom: 24 },
  grid: { gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 18,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text1, marginBottom: 2 },
  cardSub: { fontSize: 12, color: COLORS.text3 },
});