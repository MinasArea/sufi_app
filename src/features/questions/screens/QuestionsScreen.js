import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

export default function QuestionsScreen() {
  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Text style={s.title}>Ask a Question</Text>
      <Text style={s.sub}>Submit your question to the circle</Text>
      
      <View style={s.inputBox}>
        <TextInput
          style={s.input}
          placeholder="Write your question here..."
          placeholderTextColor="rgba(245,245,240,0.4)"
          multiline
          numberOfLines={4}
        />
      </View>
      
      <Pressable style={s.btn}>
        <Text style={s.btnText}>Submit Question</Text>
      </Pressable>
      
      <Text style={s.sectionTitle}>Recent Questions</Text>
      {[1, 2].map((i) => (
        <View key={i} style={s.card}>
          <Text style={s.q}>What is the meaning of tawakkul in daily life?</Text>
          <Text style={s.a}>Awaiting response from the circle...</Text>
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
  inputBox: {
    backgroundColor: 'rgba(13,31,23,0.45)', // glass
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  input: {
    color: '#F5F5F0',
    fontSize: 14,
    lineHeight: 20,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  btn: {
    backgroundColor: COLORS.gold,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 30,
  },
  btnText: { color: COLORS.bg, fontSize: 14, fontWeight: '700' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#F5F5F0', marginBottom: 12 },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(13,31,23,0.45)', // glass
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 10,
  },
  q: { fontSize: 14, color: '#F5F5F0', fontWeight: '600', marginBottom: 6 },
  a: { fontSize: 12, color: 'rgba(245,245,240,0.5)', fontStyle: 'italic' },
});