import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

export default function TeachingsScreen() {
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Text style={s.title}>Teachings</Text>
      <Text style={s.sub}>Wisdom from the path</Text>
      
      {[1, 2, 3, 4, 5].map((i) => (
        <View key={i} style={s.card}>
          <Text style={s.cardTitle}>Teaching {i}</Text>
          <Text style={s.cardText}>The lamp is not the light. Tend the wick, and let the flame be someone else's business.</Text>
          <Text style={s.cardTag}>On humility</Text>
        </View>
      ))}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1 }, // NO backgroundColor — transparent
  content: { padding: 20, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: '700', color: '#F5F5F0', marginBottom: 4 },
  sub: { fontSize: 13, color: 'rgba(245,245,240,0.6)', marginBottom: 24 },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(13,31,23,0.45)', // glass
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#F5F5F0', marginBottom: 6 },
  cardText: { fontSize: 14, color: 'rgba(245,245,240,0.85)', lineHeight: 20, fontStyle: 'italic', marginBottom: 8 },
  cardTag: { fontSize: 10, letterSpacing: 1, color: COLORS.gold, textTransform: 'uppercase' },
});