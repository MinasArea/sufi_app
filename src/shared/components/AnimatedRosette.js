import React,{useEffect,useRef} from 'react';
import {Animated,StyleSheet,View} from 'react-native';
import Svg,{Circle,Polygon,G,Defs,LinearGradient,Stop} from 'react-native-svg';

export default function AnimatedRosette(){
 const spin=useRef(new Animated.Value(0)).current;
 const glow=useRef(new Animated.Value(.45)).current;
 useEffect(()=>{
  Animated.loop(Animated.timing(spin,{toValue:1,duration:60000,useNativeDriver:true})).start();
  Animated.loop(Animated.sequence([Animated.timing(glow,{toValue:.75,duration:2200,useNativeDriver:true}),Animated.timing(glow,{toValue:.35,duration:2200,useNativeDriver:true})])).start();
 },[]);
 const rotate=spin.interpolate({inputRange:[0,1],outputRange:['0deg','360deg']});
 return <View style={styles.wrap}>
   <Animated.View style={[styles.halo,{opacity:glow}]}/>
   <Animated.View style={{width:168,height:168,transform:[{rotate}]}}>
    <Svg width="168" height="168" viewBox="0 0 200 200">
     <Defs><LinearGradient id="goldLine" x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor="#E4C77A"/><Stop offset="1" stopColor="#C9A24B"/></LinearGradient></Defs>
     <G stroke="url(#goldLine)" fill="none" strokeWidth="1.1">
      <Circle cx="100" cy="100" r="92" strokeOpacity=".35"/><Circle cx="100" cy="100" r="70" strokeOpacity=".5"/>
      <Polygon points="100,14 141,59 100,104 59,59" strokeWidth="1.3"/><Polygon points="100,196 141,151 100,106 59,151" strokeWidth="1.3"/>
      <Polygon points="14,100 59,59 104,100 59,141" strokeWidth="1.3"/><Polygon points="186,100 141,59 96,100 141,141" strokeWidth="1.3"/>
      <Polygon points="100,40 154,100 100,160 46,100" strokeWidth="1.6"/><Circle cx="100" cy="100" r="18" strokeWidth="1.4"/>
     </G>
    </Svg>
   </Animated.View>
 </View>
}
const styles=StyleSheet.create({wrap:{width:190,height:190,alignItems:'center',justifyContent:'center'},halo:{position:'absolute',width:150,height:150,borderRadius:75,backgroundColor:'#C9A24B',opacity:.4,shadowColor:'#E4C77A',shadowRadius:28,shadowOpacity:.8,shadowOffset:{width:0,height:0},elevation:18}});
