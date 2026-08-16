import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

export default function GatheringsScreen() {
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Text style={s.title}>Gatherings</Text>
      <Text style={s.sub}>Upcoming circles of remembrance</Text>
      
      {[1, 2, 3].map((i) => (
        <View key={i} style={s.card}>
          <Text style={s.cardDay}>Saturday</Text>
          <Text style={s.cardDate}>March {10 + i}, 2026</Text>
          <Text style={s.cardTime}>After Maghrib · 7:00 PM</Text>
          <View style={s.tag}>
            <Text style={s.tagText}>Dhikr & Sama</Text>
          </View>
        </View>
      ))}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1 }, // NO backgroundColor
  content: { padding: 20, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: '700', color: '#F5F5F0', marginBottom: 4 },
  sub: { fontSize: 13, color: 'rgba(245,245,240,0.6)', marginBottom: 24 },
  card: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: 'rgba(13,31,23,0.45)', // glass
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 12,
  },
  cardDay: { fontSize: 12, color: COLORS.gold, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  cardDate: { fontSize: 20, fontWeight: '700', color: '#F5F5F0', marginBottom: 4 },
  cardTime: { fontSize: 13, color: 'rgba(245,245,240,0.7)', marginBottom: 10 },
  tag: { alignSelf: 'flex-start', backgroundColor: 'rgba(201,168,104,0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  tagText: { fontSize: 11, color: COLORS.goldHi, fontWeight: '600' },
});