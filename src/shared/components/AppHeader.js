import React from 'react';
import {Pressable,StyleSheet,Text,View} from 'react-native';
import Icon from './Icon';
export default function AppHeader({onMenu,onReminder}){return <View style={styles.bar}><Pressable style={styles.btn} onPress={onMenu}><Icon name="menu"/></Pressable><View style={styles.wordmark}><Text style={styles.ar}>طريقة</Text><Text style={styles.en}>Tariqa</Text></View><Pressable style={styles.btn} onPress={onReminder}><Icon name="bell"/></Pressable></View>}
const styles=StyleSheet.create({bar:{height:72,paddingHorizontal:16,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#0E2B27',borderBottomWidth:1,borderBottomColor:'rgba(201,162,75,.22)',zIndex:20},btn:{width:42,height:42,borderRadius:21,alignItems:'center',justifyContent:'center'},wordmark:{alignItems:'center',lineHeight:1},ar:{fontFamily:'serif',fontSize:16,color:'#C9A24B',letterSpacing:1},en:{fontSize:11,letterSpacing:5,color:'#CFC7AE',textTransform:'uppercase'}});
