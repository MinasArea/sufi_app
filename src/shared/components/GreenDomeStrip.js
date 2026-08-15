import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, {
  Defs,
  Pattern,
  Image as SvgImage,
  Path,
  LinearGradient,
  Stop,
  Rect,
} from 'react-native-svg';
import { COLORS } from '../theme/colors';

const { width: SCREEN_W } = Dimensions.get('window');

const W = SCREEN_W - 16;  // full width
const H = 300;            // much taller

export default function GreenDomeStrip() {
  const flagShape = `
    M 0,${H * 0.20}
    C ${W * 0.15},${H * 0.02} ${W * 0.30},${H * 0.38} ${W * 0.50},${H * 0.20}
    C ${W * 0.70},${H * 0.02} ${W * 0.85},${H * 0.38} ${W},${H * 0.20}
    L ${W},${H * 0.80}
    C ${W * 0.85},${H * 0.98} ${W * 0.70},${H * 0.62} ${W * 0.50},${H * 0.80}
    C ${W * 0.30},${H * 0.98} ${W * 0.15},${H * 0.62} 0,${H * 0.80}
    Z
  `;

  const goldWaveTop = `
    M 0,${H * 0.20}
    C ${W * 0.15},${H * 0.02} ${W * 0.30},${H * 0.38} ${W * 0.50},${H * 0.20}
    C ${W * 0.70},${H * 0.02} ${W * 0.85},${H * 0.38} ${W},${H * 0.20}
  `;

  const goldWaveBottom = `
    M 0,${H * 0.80}
    C ${W * 0.15},${H * 0.98} ${W * 0.30},${H * 0.62} ${W * 0.50},${H * 0.80}
    C ${W * 0.70},${H * 0.98} ${W * 0.85},${H * 0.62} ${W},${H * 0.80}
  `;

  return (
    <View style={s.container} pointerEvents="none">
      <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <Defs>
          <Pattern
            id="domePattern"
            patternUnits="userSpaceOnUse"
            width={W}
            height={H}
          >
            <SvgImage
              href={require('../../../assets/green-dome.png')}
              x={0}
              y={-80}
              width={W}
              height={H + 160}
              preserveAspectRatio="xMidYMax slice"
            />
          </Pattern>

          <LinearGradient id="glow" x1="0.5" y1="0" x2="0.5" y2="1">
            <Stop offset="0" stopColor="#2D6A4F" stopOpacity="0.18" />
            <Stop offset="0.4" stopColor="#1B4332" stopOpacity="0.10" />
            <Stop offset="1" stopColor={COLORS.bg} stopOpacity="0" />
          </LinearGradient>

          <LinearGradient id="fadeLeft" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={COLORS.bg} stopOpacity="0.90" />
            <Stop offset="1" stopColor={COLORS.bg} stopOpacity="0" />
          </LinearGradient>
          <LinearGradient id="fadeRight" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={COLORS.bg} stopOpacity="0" />
            <Stop offset="1" stopColor={COLORS.bg} stopOpacity="0.90" />
          </LinearGradient>
        </Defs>

        <Path d={flagShape} fill="url(#glow)" opacity={0.8} />

        <Path
          d={flagShape}
          fill="url(#domePattern)"
          opacity={0.58}
        />

        <Path
          d={goldWaveTop}
          fill="none"
          stroke={COLORS.goldHi}
          strokeWidth={1.6}
          opacity={0.55}
        />
        <Path
          d={goldWaveBottom}
          fill="none"
          stroke={COLORS.goldHi}
          strokeWidth={1.6}
          opacity={0.40}
        />
        <Path
          d={flagShape}
          fill="none"
          stroke={COLORS.gold}
          strokeWidth={0.8}
          opacity={0.30}
        />

        <Rect x={0} y={0} width={60} height={H} fill="url(#fadeLeft)" />
        <Rect x={W - 60} y={0} width={60} height={H} fill="url(#fadeRight)" />
      </Svg>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    width: SCREEN_W,
    height: H + 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
});