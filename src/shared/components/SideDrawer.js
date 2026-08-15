import React,{useEffect,useRef} from 'react';
import {Animated,Pressable,StyleSheet,Text,View} from 'react-native';
import Icon from './Icon';
const items=[['home','Home','home'],['book','Teachings','teachings'],['dhikr','Dhikr Counter','dhikr'],['path','The Path (Maqamat)','path'],['people','Community','majlis'],['clock','Prayer Times','prayer'],['settings','Settings','settings']];
export default function SideDrawer({open,onClose,onNavigate}){
 const x=useRef(new Animated.Value(-330)).current; const opacity=useRef(new Animated.Value(0)).current;
 useEffect(()=>{Animated.parallel([Animated.timing(x,{toValue:open?0:-330,duration:300,useNativeDriver:true}),Animated.timing(opacity,{toValue:open?1:0,duration:250,useNativeDriver:true})]).start()},[open]);
 return <View pointerEvents={open?'auto':'none'} style={StyleSheet.absoluteFill}>
  <Animated.View style={[styles.backdrop,{opacity}]}><Pressable style={StyleSheet.absoluteFill} onPress={onClose}/></Animated.View>
  <Animated.View style={[styles.drawer,{transform:[{translateX:x}]}]}>
   <View style={styles.head}><View style={styles.crest}><Icon name="star" size={22}/></View><View><Text style={styles.name}>Tariqa</Text><Text style={styles.sub}>The Path of the Heart</Text></View></View>
   <View>{items.map(([icon,label,target])=><Pressable key={target} style={styles.item} onPress={()=>{onNavigate(target);onClose()}}><Icon name={icon} size={19}/><Text style={styles.itemText}>{label}</Text></Pressable>)}</View>
   <Text style={styles.foot}>Peace and light · Tariqa © 2026</Text>
  </Animated.View>
 </View>
}
const styles=StyleSheet.create({backdrop:{...StyleSheet.absoluteFillObject,backgroundColor:'rgba(4,12,10,.6)',zIndex:30},drawer:{position:'absolute',top:0,bottom:0,left:0,width:'78%',maxWidth:300,backgroundColor:'#183F38',borderRightWidth:1,borderRightColor:'rgba(201,162,75,.22)',zIndex:31,padding:26},head:{flexDirection:'row',alignItems:'center',gap:12,paddingBottom:18,marginBottom:22,borderBottomWidth:1,borderBottomColor:'rgba(201,162,75,.22)'},crest:{width:42,height:42,borderRadius:21,borderWidth:1,borderColor:'#C9A24B',alignItems:'center',justifyContent:'center'},name:{fontFamily:'serif',fontSize:17,color:'#F3ECDA'},sub:{fontSize:10.5,color:'#CFC7AE',marginTop:2},item:{flexDirection:'row',alignItems:'center',gap:14,paddingVertical:13,paddingHorizontal:8,borderRadius:10},itemText:{fontSize:14,color:'#F3ECDA'},foot:{marginTop:'auto',paddingTop:18,borderTopWidth:1,borderTopColor:'rgba(201,162,75,.22)',fontSize:10.5,color:'#CFC7AE'}});
