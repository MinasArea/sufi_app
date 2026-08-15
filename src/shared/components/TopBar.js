import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import Icon from './Icon';
import { COLORS } from '../theme/colors';

export default function TopBar({ screenName }) {
  return (
    <View style={s.bar}>
      <View style={s.id}>
        <View style={s.mark}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path d="M12 2.5C8.5 2.5 6.5 6.8 6.5 10v1.2h11V10c0-3.2-2-7.5-5.5-7.5Z" fill={COLORS.gold}/>
            <Rect x="5.7" y="11.2" width="12.6" height="2.1" rx="0.6" fill={COLORS.gold}/>
            <Rect x="11" y="0" width="2" height="2.6" fill={COLORS.gold}/>
          </Svg>
        </View>
        <View style={s.titles}>
          <Text style={s.brand}>Maqām</Text>
          <Text style={s.screen}>{screenName}</Text>
        </View>
      </View>
      <View style={s.right}>
        <View style={s.streak}><Icon name="flame" size={17}/><Text style={s.streakText}>12</Text></View>
        <View style={s.aux}><Icon name="bell" size={17} color={COLORS.text2}/></View>
      </View>
    </View>
  );
}

const s=StyleSheet.create({
  bar:{height:74,paddingTop:18,paddingHorizontal:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:COLORS.bg,borderBottomWidth:1,borderBottomColor:COLORS.borderSoft},
  id:{flexDirection:'row',alignItems:'center',gap:11},
  mark:{width:34,height:34,borderRadius:10,backgroundColor:COLORS.surface,borderWidth:1,borderColor:COLORS.border,alignItems:'center',justifyContent:'center'},
  titles:{flexDirection:'column',lineHeight:1.15},
  brand:{fontSize:17,fontWeight:'600',color:COLORS.text1},
  screen:{fontSize:10,letterSpacing:1.4,textTransform:'uppercase',color:COLORS.text3,marginTop:1},
  right:{flexDirection:'row',alignItems:'center',gap:8},
  streak:{height:34,paddingHorizontal:8,borderRadius:17,flexDirection:'row',alignItems:'center',gap:5},
  streakText:{color:COLORS.goldHi,fontWeight:'600',fontSize:12},
  aux:{width:34,height:34,borderRadius:17,alignItems:'center',justifyContent:'center'}
});
