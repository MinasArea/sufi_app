import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, {
  Defs,
  Pattern,
  Image as SvgImage,
  Path,
  ClipPath,
  G,
} from 'react-native-svg';
import { COLORS } from '../theme/colors';

const { width: SCREEN_W } = Dimensions.get('window');

const W = SCREEN_W;      // FULL WIDTH — no gap on sides
const H = 300;

export default function GreenDomeStrip() {
  // Original shape you liked
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
      <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ backgroundColor: 'transparent' }}>
        <Defs>
          <ClipPath id="flagClip">
            <Path d={flagShape} />
          </ClipPath>

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
        </Defs>

        {/* Dome — original opacity, full width */}
        <G clipPath="url(#flagClip)">
          <Path d={flagShape} fill="url(#domePattern)" opacity={0.65} />
        </G>

        {/* Gold trim */}
        <Path
          d={goldWaveTop}
          fill="none"
          stroke={COLORS.goldHi}
          strokeWidth={1.6}
          opacity={0.60}
        />
        <Path
          d={goldWaveBottom}
          fill="none"
          stroke={COLORS.goldHi}
          strokeWidth={1.6}
          opacity={0.45}
        />
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
    backgroundColor: 'transparent',
  },
});