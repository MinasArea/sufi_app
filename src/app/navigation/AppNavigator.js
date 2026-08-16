import React, { useState } from 'react';
import { StatusBar, View, StyleSheet, Image } from 'react-native';
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== 'library') setLibraryCategory(null);
  };

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
      <StatusBar barStyle="light-content" backgroundColor="#0D1F17" />
      <View style={s.app}>
        {/* NEW background image — baground2 */}
        <Image
          source={require('../../../assets/baground.jpg')}
          style={s.bg}
          resizeMode="cover"
        />

        {/* Stars */}
        <ScatteredStars count={50} />

        {/* Sticky blur header */}
        <TopBar screenName={TAB_NAMES[activeTab]} />

        {/* Content */}
        <View style={s.body}>{renderScreen()}</View>

        <BottomTabs active={activeTab} onNavigate={handleTabChange} />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0D1F17' },
  app: { flex: 1, position: 'relative' },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    transform: [{ scaleY: -1 }], // flipped vertically
  },
  body: { 
    flex: 1, 
    position: 'relative', 
    zIndex: 1,
    paddingTop: 90,
  },
});