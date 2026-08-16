import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import Icon from '../../../shared/components/Icon';

const MOCK_DATA = {
  videos: [
    { id: '1', title: 'The Path of Love', author: 'Shaykh A.', duration: '12:30' },
    { id: '2', title: 'Dhikr & Presence', author: 'Shaykh B.', duration: '24:15' },
  ],
  qasaid: [
    { id: '1', title: 'Mawlaya Salli', author: 'Traditional', duration: '5:45' },
    { id: '2', title: 'Tala\'al Badru', author: 'Traditional', duration: '4:20' },
  ],
  books: [
    { id: '1', title: 'The Masnavi', author: 'Jalal al-Din Rumi', pages: 438 },
    { id: '2', title: 'Fusus al-Hikam', author: 'Ibn Arabi', pages: 312 },
  ],
};

const TITLES = {
  videos: 'Videos',
  qasaid: 'Qasa\'id',
  books: 'Books',
};

export default function LibraryCategoryScreen({ category, onBack }) {
  const data = MOCK_DATA[category] || [];

  const renderItem = ({ item }) => (
    <Pressable style={s.row}>
      <View style={s.iconBox}>
        <Icon name={category === 'videos' ? 'play' : category === 'qasaid' ? 'music' : 'book'} size={18} color={COLORS.goldHi} />
      </View>
      <View style={s.text}>
        <Text style={s.title}>{item.title}</Text>
        <Text style={s.sub}>{item.author} · {item.duration || item.pages + ' pages'}</Text>
      </View>
      <Text style={s.chev}>›</Text>
    </Pressable>
  );

  return (
    <View style={s.screen}>
      <View style={s.header}>
        <Pressable onPress={onBack} style={s.backBtn}>
          <Text style={s.backText}>‹ Back</Text>
        </Pressable>
        <Text style={s.headerTitle}>{TITLES[category]}</Text>
        <View style={{ width: 50 }} />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={s.empty}>
            <Text style={s.emptyText}>Coming soon — database connection pending.</Text>
          </View>
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1 }, // NO backgroundColor
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  backBtn: { paddingVertical: 4 },
  backText: { color: COLORS.gold, fontSize: 14, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#F5F5F0' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(13,31,23,0.45)', // glass
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(27,67,50,0.30)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1 },
  title: { fontSize: 15, color: '#F5F5F0', fontWeight: '600', marginBottom: 2 },
  sub: { fontSize: 12, color: 'rgba(245,245,240,0.6)' },
  chev: { fontSize: 22, color: 'rgba(245,245,240,0.4)' },
  empty: { marginTop: 60, alignItems: 'center' },
  emptyText: { color: 'rgba(245,245,240,0.5)', fontSize: 14, fontStyle: 'italic' },
});