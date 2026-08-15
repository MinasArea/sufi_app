import React,{useEffect,useRef} from 'react';
import {Animated,Text,StyleSheet,View} from 'react-native';
import Svg,{Defs,LinearGradient,Stop,Rect} from 'react-native-svg';
import {COLORS} from '../theme/colors';

export default function FanCard({item,index}){
 const a=useRef(new Animated.Value(0)).current;
 useEffect(()=>{Animated.timing(a,{toValue:1,duration:420,delay:index*55,useNativeDriver:true}).start()},[]);
 const ty=a.interpolate({inputRange:[0,1],outputRange:[18,item.y]});
 return <Animated.View style={[s.card,item.center&&s.center,{opacity:a,transform:[{rotate:`${item.rotation}deg`},{translateY:ty}]}]}>
   <Svg pointerEvents="none" style={StyleSheet.absoluteFillObject} width="100%" height="100%">
     <Defs><LinearGradient id={`fanGradient${index}`} x1="0" y1="0" x2="1" y2="1"><Stop offset="0" stopColor={item.color[0]}/><Stop offset="1" stopColor={item.color[1]}/></LinearGradient></Defs>
     <Rect x="0" y="0" width="100%" height="100%" rx="18" fill={`url(#fanGradient${index})`}/>
   </Svg>
   <View style={s.inner}>
     <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.82} style={[s.cadence,item.center&&s.centerCadence]}>{item.cadence}</Text>
     <Text style={[s.letter,item.center&&s.centerLetter]}>{item.letter}</Text>
     <Text numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.82} style={[s.name,item.center&&s.centerName]}>{item.name}</Text>
     {item.desc&&<Text numberOfLines={4} style={[s.desc,item.center&&s.centerDesc]}>{item.desc}</Text>}
   </View>
 </Animated.View>
}

const s=StyleSheet.create({
 card:{width:78,height:172,flexShrink:0,borderRadius:18,padding:12,marginLeft:-24,borderWidth:1,borderColor:'rgba(255,255,255,0.12)',shadowColor:'#000',shadowOpacity:.45,shadowRadius:14,elevation:7,overflow:'hidden',position:'relative'},
 center:{width:122,height:198,marginLeft:-24,marginRight:-24,zIndex:5,padding:15},
 inner:{flex:1,minWidth:0},
 cadence:{alignSelf:'flex-start',fontSize:8,fontWeight:'600',letterSpacing:.2,color:'rgba(255,255,255,.9)',backgroundColor:'rgba(5,15,10,.35)',paddingHorizontal:6,paddingVertical:3,borderRadius:999,maxWidth:'100%'},
 centerCadence:{backgroundColor:'rgba(10,42,30,.14)',color:COLORS.bg},
 letter:{fontSize:25,color:'rgba(255,255,255,.9)',lineHeight:29,marginTop:12},
 centerLetter:{fontSize:34,lineHeight:38,color:COLORS.bg,marginTop:13},
 name:{marginTop:'auto',fontSize:11,fontWeight:'700',lineHeight:14,color:'rgba(255,255,255,.96)',textAlign:'left'},
 centerName:{marginTop:9,fontSize:15,lineHeight:18,color:COLORS.bg,fontWeight:'800'},
 desc:{fontSize:9.5,color:'rgba(255,255,255,.78)',marginTop:4,lineHeight:13},
 centerDesc:{fontSize:10,color:'rgba(10,42,30,.78)',lineHeight:14,marginTop:5},
});
