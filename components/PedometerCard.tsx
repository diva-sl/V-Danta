// app/components/PedometerMeter.tsx
import { Pedometer } from "expo-sensors";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, Defs, G, LinearGradient, Stop } from "react-native-svg";

const { width: SCREEN_W } = Dimensions.get("window");
const CARD_SIZE = Math.min(360, SCREEN_W - 32);
const CENTER = CARD_SIZE / 2;
const RADIUS = 110; // visible radius of the arc
const STROKE = 18;
const START_ANGLE = 135; // degrees where arc begins
const SWEEP_ANGLE = 270; // arc sweep degrees (135 -> 405)
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC_LENGTH = (CIRCUMFERENCE * SWEEP_ANGLE) / 360; // length of visible arc

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  target?: number;
  onSend?: (payload: { date: string; steps: number }) => Promise<any> | void;
  pointerAsset?: any; // require(...) pointer image
  bgAsset?: any; // optional background image asset
};

export default function PedometerMeter({
  target = 10000,
  onSend,
  pointerAsset = require("../../assets/pointer.png"),
  bgAsset = null,
}: Props) {
  const [todaySteps, setTodaySteps] = useState(0);
  const [available, setAvailable] = useState<boolean | null>(null);

  const progressAnim = useRef(new Animated.Value(0)).current; // 0..1
  const stepsAnim = useRef(new Animated.Value(0)).current;

  // pointer position (animated) is derived from progressAnim via interpolation
  const angleAnim = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [START_ANGLE, START_ANGLE + SWEEP_ANGLE],
  });

  // stroke offset: when progress = 0 -> offset = ARC_LENGTH, when 1 -> 0
  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [ARC_LENGTH, 0],
  });

  // textual display for steps (animated)
  const [displaySteps, setDisplaySteps] = useState(0);
  useEffect(() => {
    const id = stepsAnim.addListener(({ value }) => {
      setDisplaySteps(Math.round(value));
    });
    return () => stepsAnim.removeListener(id);
  }, [stepsAnim]);

  // helper: animate to value
  function animateTo(steps: number) {
    const frac = Math.max(0, Math.min(1, steps / Math.max(1, target)));
    Animated.timing(progressAnim, {
      toValue: frac,
      duration: 700,
      useNativeDriver: false,
    }).start();
    Animated.timing(stepsAnim, {
      toValue: steps,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }

  // get start of day
  const startOfDay = () => {
    const s = new Date();
    s.setHours(0, 0, 0, 0);
    return s;
  };

  async function fetchToday() {
    try {
      const isAvailable = await Pedometer.isAvailableAsync();
      setAvailable(isAvailable);
      if (!isAvailable) {
        setTodaySteps(0);
        animateTo(0);
        return;
      }
      const res = await Pedometer.getStepCountAsync(startOfDay(), new Date());
      const s = res?.steps ?? 0;
      setTodaySteps(s);
      animateTo(s);
    } catch (e) {
      console.warn("Pedometer error", e);
      setAvailable(false);
    }
  }

  // start live watch (simple)
  useEffect(() => {
    let sub: any;
    (async () => {
      await fetchToday();
      try {
        sub = Pedometer.watchStepCount((result) => {
          // result.steps may behave differently across devices; we update conservatively
          const val =
            typeof result.steps === "number" ? result.steps : todaySteps;
          // Some devices report cumulative since subscription; use max to avoid drop
          setTodaySteps((prev) => {
            const next = Math.max(prev, val);
            animateTo(next);
            return next;
          });
        });
      } catch (err) {
        console.warn("watchStepCount failed", err);
      }
    })();
    return () => sub?.remove?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  // pointer placement math -> convert polar to cartesian for a given angle
  function polarToCartesian(angleDeg: number) {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
    const x = CENTER + (RADIUS + STROKE / 2) * Math.cos(angleRad);
    const y = CENTER + (RADIUS + STROKE / 2) * Math.sin(angleRad);
    return { x, y };
  }

  // send to backend
  async function sendSteps() {
    const payload = {
      date: new Date().toISOString().slice(0, 10),
      steps: todaySteps,
    };
    try {
      if (onSend) await onSend(payload);
      else {
        // default; replace URL + auth
        await fetch("https://your.api/steps", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      console.log("sent steps", payload);
    } catch (err) {
      console.warn("sendSteps failed", err);
    }
  }

  // quick simulate button for testing (increments)
  function simulate(delta = 200) {
    const next = todaySteps + delta;
    setTodaySteps(next);
    animateTo(next);
  }

  // labels positions (angle values at ticks)
  const ticks = [
    { label: "0", angle: START_ANGLE },
    { label: "2500", angle: START_ANGLE + SWEEP_ANGLE * 0.25 },
    { label: "5000", angle: START_ANGLE + SWEEP_ANGLE * 0.5 },
    { label: "7500", angle: START_ANGLE + SWEEP_ANGLE * 0.75 },
    { label: "10k", angle: START_ANGLE + SWEEP_ANGLE },
  ];

  // render pointer as Animated.View moving on top of SVG. We compute translate using angleAnim interpolation
  // We'll transform: rotate(angle) then translate to top center and back; simpler: compute x/y using animated addition not supported,
  // So we use angleAnim interpolation to compute rotate and then position using transform and translate.
  // We'll position pointer absolutely using angleAnim interpolation for left & top.
  const pointerLeft = angleAnim.interpolate({
    inputRange: [START_ANGLE, START_ANGLE + SWEEP_ANGLE],
    outputRange: [
      `${polarToCartesian(START_ANGLE).x}px`,
      `${polarToCartesian(START_ANGLE + SWEEP_ANGLE).x}px`,
    ],
  });
  const pointerTop = angleAnim.interpolate({
    inputRange: [START_ANGLE, START_ANGLE + SWEEP_ANGLE],
    outputRange: [
      `${polarToCartesian(START_ANGLE).y}px`,
      `${polarToCartesian(START_ANGLE + SWEEP_ANGLE).y}px`,
    ],
  });

  // In some RN versions interpolating px strings works; if not, convert to numbers and use Animated.Value/measure.
  // The above works in most modern RN environments.

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Steps</Text>
        <View style={styles.targetBox}>
          <Text style={styles.targetLabel}>Weekly Target</Text>
          <Text style={styles.targetValue}>{target}</Text>
        </View>
      </View>

      <View style={styles.meterWrap}>
        {bgAsset ? (
          <Image source={bgAsset} style={styles.bgImage} resizeMode="contain" />
        ) : null}

        <Svg width={CARD_SIZE} height={CARD_SIZE} style={styles.svg}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#FF9B2D" />
              <Stop offset="0.45" stopColor="#CDF533" />
              <Stop offset="1" stopColor="#3BD9FF" />
            </LinearGradient>
            {/* subtle white outer ring can be a separate Circle if you want */}
          </Defs>

          {/* rotate group so arc starts at START_ANGLE */}
          <G rotation={START_ANGLE} origin={`${CENTER}, ${CENTER}`}>
            {/* background full faint track (so arc looks embedded) */}
            <Circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={STROKE + 8}
              strokeLinecap="round"
              fill="transparent"
            />

            {/* empty track (gray) - visible arc length only */}
            <Circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              stroke="#9e9e9e44"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`}
              strokeDashoffset={0}
              fill="transparent"
            />

            {/* animated gradient progress arc */}
            <AnimatedCircle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              stroke="url(#grad)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`}
              strokeDashoffset={strokeDashoffset}
              fill="transparent"
            />
          </G>
        </Svg>

        {/* pointer: absolute positioned using animated left/top */}
        <Animated.View
          style={[
            styles.pointerWrap,
            {
              left: pointerLeft,
              top: pointerTop,
              // rotate pointer so it faces outward (we rotate by angleAnim as well)
              transform: [
                {
                  rotate: angleAnim.interpolate({
                    inputRange: [START_ANGLE, START_ANGLE + SWEEP_ANGLE],
                    outputRange: [
                      `${START_ANGLE}deg`,
                      `${START_ANGLE + SWEEP_ANGLE}deg`,
                    ],
                  }),
                },
                { translateX: -12 }, // adjust based on pointer image size
                { translateY: -12 },
              ],
            },
          ]}
        >
          <Image source={pointerAsset} style={styles.pointer} />
        </Animated.View>

        {/* markers/labels positioned absolutely over the svg */}
        {ticks.map((t, idx) => {
          const p = polarToCartesian(t.angle);
          return (
            <Text
              key={idx}
              style={[
                styles.tickLabel,
                { left: p.x - 16, top: p.y - 12 }, // small offset to center label
              ]}
            >
              {t.label}
            </Text>
          );
        })}
      </View>

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.stepsBig}>{displaySteps}</Text>
          <Text style={styles.stepsSmall}>steps</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.syncBtn} onPress={sendSteps}>
            <Text style={styles.syncTxt}>Sync</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.simulateBtn}
            onPress={() => simulate(250)}
          >
            <Text style={styles.simTxt}>+250</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footer}>
        {available === null
          ? "Checking sensor..."
          : available
          ? "Pedometer available"
          : "Sensor not available"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_SIZE,
    alignSelf: "center",
    backgroundColor: "#12151D",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: { color: "#fff", fontSize: 16, fontWeight: "700" },
  targetBox: { alignItems: "flex-end" },
  targetLabel: { color: "#bfc8d0", fontSize: 11 },
  targetValue: { color: "#CDF533", fontWeight: "800", marginTop: 4 },

  meterWrap: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    position: "absolute",
    width: CARD_SIZE,
    height: CARD_SIZE,
    opacity: 0.85,
  },
  svg: { position: "absolute", left: 0, top: 0 },

  pointerWrap: {
    position: "absolute",
    width: 24,
    height: 24,
    marginLeft: -12,
    marginTop: -12,
    alignItems: "center",
    justifyContent: "center",
  },
  pointer: { width: 20, height: 20, resizeMode: "contain" },

  tickLabel: {
    position: "absolute",
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  stepsBig: { color: "#CDF533", fontSize: 22, fontWeight: "900" },
  stepsSmall: { color: "#dfe7e7", marginTop: 2 },

  controls: { flexDirection: "row", gap: 8 },
  syncBtn: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  syncTxt: { color: "#fff", fontWeight: "700" },
  simulateBtn: {
    backgroundColor: "rgba(255,255,255,0.03)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  simTxt: { color: "#fff", fontWeight: "700" },

  footer: { color: "#98a0a6", fontSize: 12, marginTop: 8, textAlign: "center" },
});
