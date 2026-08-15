import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
export default function Icon({name,size=20,color='#E3CD9C',strokeWidth=1.7}) {
 const p={stroke:color,strokeWidth,strokeLinecap:'round',strokeLinejoin:'round',fill:'none'};
 const shapes={
  home:<><Path {...p} d="M4 11.5 12 4l8 7.5M6 10v9h12v-9"/></>,
  book:<><Path {...p} d="M4 5.5c2.5-1.3 5-1.3 8 0v13c-3-1.3-5.5-1.3-8 0v-13ZM20 5.5c-2.5-1.3-5-1.3-8 0v13c3-1.3 5.5-1.3 8 0v-13Z"/></>,
  library:<><Path {...p} d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Z"/><Path {...p} d="M5 17h13"/></>,
  calendar:<><Rect {...p} x="4" y="5" width="16" height="15" rx="2"/><Path {...p} d="M4 9.5h16M8 3v4M16 3v4"/></>,
  chat:<><Path {...p} d="M4 5h16v11H9l-5 4V5Z"/><Path {...p} d="M8 10h8M8 13h5"/></>,
  bell:<><Path {...p} d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9Z"/><Path {...p} d="M13.7 21a2 2 0 0 1-3.4 0"/></>,
  flame:<><Path {...p} d="M12 3c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.5-2-1-2 .5 3-1 4-2 4a2.5 2.5 0 0 1-2.5-2.5c0-2 2-3 1.5-6.5-2.5 1-4.5 3.5-4.5 6.5a5.5 5.5 0 0 0 11 0C20.5 6 16 3 12 3Z"/></>,
 };
 return <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">{shapes[name]}</Svg>;
}
