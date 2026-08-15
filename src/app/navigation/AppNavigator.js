import React, { useState } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import TopBar from '../../shared/components/TopBar';
import BottomTabs from '../../shared/components/BottomTabs';
import ScatteredStars from '../../shared/components/ScatteredStars';
import HomeScreen from '../../features/home/screens/HomeScreen';
import TeachingsScreen from '../../features/teachings/screens/TeachingsScreen';
import LibraryScreen from '../../features/library/screens/LibraryScreen';
import LibraryCategoryScreen from '../../features/library/screens/LibraryCategoryScreen';
import GatheringsScreen from '../../features/gatherings/screens/GatheringsScreen';
import QuestionsScreen from '../../features/questions/screens/QuestionsScreen';
import { COLORS } from '../../shared/theme/colors';

const TAB_NAMES = {
  home: 'Home',
  teachings: 'Teachings',
  library: 'Library',
  gatherings: 'Gatherings',
  questions: 'Ask a Question',
};

export default function AppNavigator() {
  const [activeTab, setActiveTab] = useState('home');
  const [libraryCategory, setLibraryCategory] = useState(null);

  // When bottom tab changes, reset library sub-screen
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'library') setLibraryCategory(null);
  };

  // Library hub → category list
  const handleLibraryCategory = (category) => {
    setLibraryCategory(category);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={handleTabChange} />;
      case 'teachings':
        return <TeachingsScreen />;
      case 'library':
        if (libraryCategory) {
          return (
            <LibraryCategoryScreen
              category={libraryCategory}
              onBack={() => setLibraryCategory(null)}
            />
          );
        }
        return <LibraryScreen onNavigateCategory={handleLibraryCategory} />;
      case 'gatherings':
        return <GatheringsScreen />;
      case 'questions':
        return <QuestionsScreen />;
      default:
        return <HomeScreen onNavigate={handleTabChange} />;
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
      <View style={s.app}>
        <ScatteredStars count={50} />
        <TopBar screenName={TAB_NAMES[activeTab]} />
        <View style={s.body}>{renderScreen()}</View>
        <BottomTabs active={activeTab} onNavigate={handleTabChange} />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.black },
  app: { flex: 1, backgroundColor: COLORS.bg },
  body: { flex: 1, position: 'relative', zIndex: 1 },
});