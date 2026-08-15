import React, { useRef, useEffect, useCallback } from 'react';
import { View, Animated, PanResponder, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Pattern, Image as SvgImage, Defs, G } from 'react-native-svg';
import { COLORS } from '../theme/colors';

const { width: SCREEN_W } = Dimensions.get('window');

const FLAG_W = SCREEN_W - 48;
const FLAG_H = 130;
const SEGMENTS = 24; // smoothness

export default function FlyingFlag({ imageSource }) {
  const phase = useRef(new Animated.Value(0)).current;
  const amplitude = useRef(new Animated.Value(8)).current;
  const dragVelocity = useRef(new Animated.Value(0)).current;
  const decayAnim = useRef(null);
  const loopAnim = useRef(null);

  // Continuous idle wave
  useEffect(() => {
    loopAnim.current = Animated.loop(
      Animated.timing(phase, {
        toValue: Math.PI * 2,
        duration: 3000,
        useNativeDriver: true,
      })
    );
    loopAnim.current.start();
    return () => loopAnim.current?.stop();
  }, []);

  // Build the wavy path from animated values
  const [pathD, setPathD] = React.useState('');
  const [goldPathD, setGoldPathD] = React.useState('');

  const computePath = useCallback((ph, amp, vel) => {
    const totalAmp = amp + Math.abs(vel) * 0.4;
    const freq = 2 + vel * 0.02;

    let d = `M 0,${FLAG_H * 0.5}`;
    let gold = `M 0,${FLAG_H * 0.5}`;

    // Top edge
    for (let i = 0; i <= SEGMENTS; i++) {
      const x = (i / SEGMENTS) * FLAG_W;
      const normX = i / SEGMENTS;
      const envelope = Math.sin(normX * Math.PI); // stronger in middle
      const wave = Math.sin(normX * Math.PI * freq + ph) * totalAmp * envelope;
      const y = FLAG_H * 0.15 + wave + (vel * 0.1 * Math.sin(normX * Math.PI));
      d += ` L ${x.toFixed(1)},${y.toFixed(1)}`;
      if (i % 2 === 0) gold += ` L ${x.toFixed(1)},${y.toFixed(1)}`;
    }

    // Right edge
    d += ` L ${FLAG_W},${FLAG_H * 0.85}`;
    gold += ` L ${FLAG_W},${FLAG_H * 0.85}`;

    // Bottom edge (inverse wave)
    for (let i = SEGMENTS; i >= 0; i--) {
      const x = (i / SEGMENTS) * FLAG_W;
      const normX = i / SEGMENTS;
      const envelope = Math.sin(normX * Math.PI);
      const wave = Math.sin(normX * Math.PI * freq + ph + 0.5) * totalAmp * 0.7 * envelope;
      const y = FLAG_H * 0.85 + wave - (vel * 0.05 * Math.sin(normX * Math.PI));
      d += ` L ${x.toFixed(1)},${y.toFixed(1)}`;
    }

    d += ' Z';
    return { d, gold };
  }, []);

  // Listen to animated values and rebuild path
  useEffect(() => {
    const listener = Animated.addListener(
      Animated.event(
        [{ nativeEvent: null }],
        { useNativeDriver: false }
      ),
      () => {
        const ph = phase.__getValue();
        const amp = amplitude.__getValue();
        const vel = dragVelocity.__getValue();
        const { d, gold } = computePath(ph, amp, vel);
        setPathD(d);
        setGoldPathD(gold);
      }
    );

    // Drive updates via a fast loop
    const id = setInterval(() => {
      const ph = phase.__getValue();
      const amp = amplitude.__getValue();
      const vel = dragVelocity.__getValue();
      const { d, gold } = computePath(ph, amp, vel);
      setPathD(d);
      setGoldPathD(gold);
    }, 32);

    return () => {
      clearInterval(id);
      listener && Animated.removeListener(listener);
    };
  }, [computePath, phase, amplitude, dragVelocity]);

  // Drag physics
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        decayAnim.current?.stop();
        dragVelocity.setValue(0);
      },

      onPanResponderMove: (_, gesture) => {
        const vel = gesture.dx * 0.15;
        dragVelocity.setValue(vel);
        // Add wind to phase
        phase.setValue(phase.__getValue() + vel * 0.02);
      },

      onPanResponderRelease: (_, gesture) => {
        const finalVel = gesture.vx * 20;

        // Spring decay
        decayAnim.current = Animated.decay(dragVelocity, {
          velocity: finalVel,
          deceleration: 0.992,
          useNativeDriver: true,
        });
        decayAnim.current.start();
      },
    })
  ).current;

  return (
    <View style={s.container} {...panResponder.panHandlers}>
      <Svg width={FLAG_W} height={FLAG_H} viewBox={`0 0 ${FLAG_W} ${FLAG_H}`}>
        <Defs>
          <Pattern
            id="flagPattern"
            patternUnits="userSpaceOnUse"
            width={FLAG_W}
            height={FLAG_H}
            x={0}
            y={0}
          >
            <SvgImage
              href={imageSource}
              x={0}
              y={-20}
              width={FLAG_W}
              height={FLAG_H + 40}
              preserveAspectRatio="xMidYMid slice"
              opacity={0.45}
            />
          </Pattern>
        </Defs>

        {/* Shadow/glow layer */}
        <Path
          d={pathD}
          fill="url(#flagPattern)"
          stroke={COLORS.gold}
          strokeWidth={0.8}
          opacity={0.9}
        />

        {/* Gold trim top */}
        <Path
          d={goldPathD}
          fill="none"
          stroke={COLORS.goldHi}
          strokeWidth={1.2}
          opacity={0.5}
        />
      </Svg>

      {/* Interactive hint */}
      <View style={s.hint} pointerEvents="none">
        <View style={s.hintLine} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    width: FLAG_W,
    height: FLAG_H + 16,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  hint: {
    position: 'absolute',
    bottom: 0,
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(201,168,104,0.2)',
  },
  hintLine: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
  },
});