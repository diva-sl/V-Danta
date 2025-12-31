import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React, {
  JSX,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, {
  Circle,
  Defs,
  G,
  Stop,
  LinearGradient as SvgGradient,
} from "react-native-svg";

import IPhoneSeBottomBar from "../components/IPhoneSeBottomBar";
import { usePedometer } from "../components/usePedometer";
import {
  useGetSummaryQuery,
  useGetTodayStepsQuery,
} from "../redux/services/trackingSteps";

const POINTER_IMG = require("../assets/Polygon1.png");
const TRACKER_BG = require("../assets/trackerBg.png");
const PRODUCT_BG = require("../assets/ProductBg.png");
const REPORTS_BG = require("../assets/ReportBg.png");
const PREV_ICON = require("../assets/Previous Arrow.png");
const NEXT_ICON = require("../assets/Next Arrow.png");

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DESIGN_WIDTH = 375;
const scale = (size: number) => (SCREEN_WIDTH / DESIGN_WIDTH) * size;

/* -------------------------- Replace these assets as needed -------------------------- */
const BACK_ICON = require("../assets/Previous Arrow.png"); // back arrow image
const IMG_16 = require("../assets/CardShoe.png"); // replace with your figma image / asset
const IMG_28 = require("../assets/CardShoe1.png"); // replace with your figma image / asset
const EXPAND_ICON = require("../assets/expand.png"); // fullscreen / expand icon
/* ------------------------------------------------------------------------------------ */

/* Gauge constants */
const GAUGE_SIZE = scale(240);
const RADIUS = 100;
const STROKE = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Arc sweep settings (matches screenshot: arc from 135deg to 405deg -> 270deg sweep)
const START_ANGLE = 135; // degrees where arc begins
const SWEEP_ANGLE = 270; // sweep in degrees
const ARC_LENGTH = (CIRCUMFERENCE * SWEEP_ANGLE) / 360; // visible arc length

/* Progress stroke and cap handling */
// visible stroke width for the animated progress arc
const PROGRESS_STROKE_VISIBLE_WIDTH = STROKE * 0.9;
// compensate for round cap extents so the cap is off-screen when progress=0
const strokeCapExtra = PROGRESS_STROKE_VISIBLE_WIDTH / 2;
const POINTER_OUTER_GAP = 0; // keep 0 for no gap

/* pointer & radius */
const OUTER_OFFSET = 0; // pointer sits exactly on the stroke centerline
const ROTATION_ADJUST = -44; // tweak if your pointer art needs rotation
const PROGRESS_RADIUS = RADIUS + STROKE * 0.6; // keep same radius as your design
const INNER_OFFSET = 14; // for inner light arc offset

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function DailyTaskScreen(): JSX.Element {
  const { data: todayData } = useGetTodayStepsQuery();
  const steps = todayData?.steps ?? 0;
  const target = todayData?.target ?? 10000;
  const TARGET = 10000;

  const [rangeDate, setRangeDate] = useState(() => new Date());
  const [showPicker, setShowPicker] = useState(false);

  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000);
  const addMonths = (d: Date, n: number) =>
    new Date(d.getFullYear(), d.getMonth() + n, 1);

  const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  usePedometer(); // ✅ AUTO STEP TRACKING

  const percent = Math.min(1, steps / Math.max(1, target));
  const [activeTab, setActiveTab] = useState<"home" | "wallet" | "profile">(
    "home"
  );

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    value: number;
    label: string;
  } | null>(null);

  const navigation = useNavigation<any>();

  useLayoutEffect(() => {
    navigation.setOptions?.({ headerShown: false, headerLeft: () => null });
  }, [navigation]);

  // animated progress value (0..1)
  const anim = useRef(new Animated.Value(0)).current;

  // pointer state for rendering (x,y in svg coords, rotation deg)
  const [pointerPos, setPointerPos] = useState<{
    x: number;
    y: number;
    rotation: number;
  } | null>(null);

  // helper: compute pointer coordinates and rotation for a given progress (0..1)
  const computePointer = (value: number) => {
    const clamped = Math.max(0, Math.min(1, value));
    const angleDeg = START_ANGLE + SWEEP_ANGLE * clamped;
    const angleRad = (angleDeg * Math.PI) / 180;

    const cx = GAUGE_SIZE / 2;
    const cy = GAUGE_SIZE / 2;

    const pointerRadius = PROGRESS_RADIUS + POINTER_OUTER_GAP; // OUTER_GAP = 0 for no gap
    const x = cx + pointerRadius * Math.cos(angleRad);
    const y = cy + pointerRadius * Math.sin(angleRad);

    // make pointer face outward (tangential) and apply artwork adjustment
    const rotation = angleDeg + 90 + ROTATION_ADJUST;

    return { x, y, rotation, angleDeg };
  };

  // ensure pointer placed at start immediately (so steps = 0 shows pointer at start)
  useEffect(() => {
    const start = computePointer(0);
    setPointerPos({ x: start.x, y: start.y, rotation: start.rotation });
  }, []);

  // animate the arc and update pointer as anim changes
  useEffect(() => {
    // animate the main anim value to the target percent
    Animated.timing(anim, {
      toValue: percent,
      duration: 900,
      useNativeDriver: false,
    }).start();

    // attach listener to update pointer position smoothly while anim animates
    const id = anim.addListener(({ value }) => {
      const { x, y, rotation } = computePointer(value);
      setPointerPos({ x, y, rotation });
    });

    return () => anim.removeListener(id);
  }, [percent, anim]);

  // stroke dashoffset interpolation — include strokeCapExtra to hide round cap at 0
  const strokeDashoffset = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [ARC_LENGTH + strokeCapExtra, 0],
  });

  // progress opacity: hide entirely at exactly 0 to avoid slivers from round caps
  const progressOpacity = anim.interpolate({
    inputRange: [0, 0.0001, 1],
    outputRange: [0, 1, 1],
  });

  // choose stroke for completed state (fully green) otherwise gradient
  const progressIsComplete = percent >= 1;

  const TABS: ("Day" | "Week" | "Month" | "Year")[] = [
    "Day",
    "Week",
    "Month",
    "Year",
  ];

  // add near other hooks (top of component)
  const [selectedTab, setSelectedTab] = useState<
    "Day" | "Week" | "Month" | "Year"
  >("Week");

  // sample data - keep your existing bars if preferred
  // const baseBars = useMemo(() => [25, 40, 55, 85, 60, 72, 45], []);

  type SummaryItem = {
    steps: number;
    label?: string; // optional (hour/day/month)
  };

  const DEFAULT_BARS = {
    Day: [120, 240, 180, 560, 780, 620, 400],
    Week: [4200, 5200, 6100, 7800, 6900, 8400, 7200],
    Month: [62000, 54000, 71000, 83000, 90000, 76000, 88000],
  };
  const summaryType =
    selectedTab === "Day"
      ? "day"
      : selectedTab === "Week"
      ? "week"
      : selectedTab === "Month"
      ? "month"
      : "year";

  const { data: summaryData = [] } = useGetSummaryQuery(
    { type: summaryType, date: rangeDate.toISOString() },
    { skip: !summaryType }
  );

  const DAY_LABELS = ["12am", "4am", "8am", "12pm", "4pm", "8pm", "11pm"];
  const WEEK_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const MONTH_LABELS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const zoomAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    zoomAnim.setValue(0.85);
    Animated.spring(zoomAnim, {
      toValue: 1,
      friction: 6,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [selectedTab]);

  const buildDayChart = () => {
    const bars = new Array(7).fill(0);
    const selected = rangeDate.toISOString().slice(0, 10);

    summaryData.forEach((d: any) => {
      const dt = new Date(d.date);
      if (dt.toISOString().slice(0, 10) !== selected) return;

      const idx = Math.min(Math.floor(dt.getHours() / 4), 6);
      bars[idx] += Number(d.steps);
    });

    return { bars, labels: DAY_LABELS };
  };

  const buildWeekChart = () => {
    const bars = new Array(7).fill(0);

    const start = new Date(rangeDate);
    const day = start.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    start.setDate(start.getDate() + diff);
    start.setHours(0, 0, 0, 0);

    summaryData.forEach((d: any) => {
      const dt = new Date(d.date);
      const index = Math.floor((dt.getTime() - start.getTime()) / 86400000);
      if (index >= 0 && index < 7) {
        bars[index] += Number(d.steps);
      }
    });

    return { bars, labels: WEEK_LABELS };
  };

  const buildMonthChart = () => {
    const bars = new Array(12).fill(0);
    const year = rangeDate.getFullYear();

    summaryData.forEach((d: any) => {
      const dt = new Date(d.date);
      if (dt.getFullYear() !== year) return;

      const m = dt.getMonth(); // 0 = Jan
      bars[m] += Number(d.steps || 0);
    });

    return { bars, labels: MONTH_LABELS };
  };

  const buildYearChart = () => {
    const currentYear = rangeDate.getFullYear();
    const years = [
      currentYear - 4,
      currentYear - 3,
      currentYear - 2,
      currentYear - 1,
      currentYear,
    ];

    const bars = new Array(5).fill(0);

    summaryData.forEach((d: any) => {
      const y = new Date(d.date).getFullYear();
      const idx = years.indexOf(y);
      if (idx !== -1) {
        bars[idx] += Number(d.steps || 0);
      }
    });

    return {
      bars,
      labels: years.map(String),
    };
  };

  console.log(summaryData);

  const { bars: chartBars, labels: chartLabels } = useMemo(() => {
    if (selectedTab === "Day") return buildDayChart();
    if (selectedTab === "Week") return buildWeekChart();
    if (selectedTab === "Month") return buildMonthChart();
    return buildYearChart();
  }, [selectedTab, summaryData, rangeDate]);

  const averageSteps = useMemo(() => {
    const nonZero = chartBars.filter((v) => v > 0);
    if (!nonZero.length) return 0;
    return nonZero.reduce((a, b) => a + b, 0) / nonZero.length;
  }, [chartBars]);

  // const chartBars = useMemo<number[]>(() => {
  //   return summaryData.map((d: any) => Number(d.steps ?? 0));
  // }, [summaryData]);

  // // helpers to compute labels + bars for each tab
  // const chartLabels = useMemo(() => {
  //   if (selectedTab === "Week") {
  //     return summaryData.map((d: any) =>
  //       new Date(d.date).toLocaleDateString("en-US", { weekday: "short" })
  //     );
  //   }

  //   if (selectedTab === "Day") {
  //     return ["12am", "4am", "8am", "12pm", "4pm", "8pm", "11pm"];
  //   }

  //   return summaryData.map((d: any) =>
  //     new Date(d.date).toLocaleDateString("en-US", { month: "short" })
  //   );
  // }, [summaryData, selectedTab]);

  const maxBarValue = Math.max(...chartBars, 1);
  const avgY = scale(120) - (averageSteps / maxBarValue) * scale(120);
  const targetY = scale(120) - (TARGET / maxBarValue) * scale(120);

  const onPrevRange = () => {
    setRangeDate((d) =>
      selectedTab === "Day"
        ? addDays(d, -1)
        : selectedTab === "Week"
        ? addDays(d, -7)
        : selectedTab === "Month"
        ? addMonths(d, -1)
        : new Date(d.getFullYear() - 1, 0, 1)
    );
  };

  const onNextRange = () => {
    setRangeDate((d) =>
      selectedTab === "Day"
        ? addDays(d, 1)
        : selectedTab === "Week"
        ? addDays(d, 7)
        : selectedTab === "Month"
        ? addMonths(d, 1)
        : new Date(d.getFullYear() + 1, 0, 1)
    );
  };

  const onDateSelect = (date: Date) => {
    setRangeDate(date);
  };
  const dateRangeLabel = useMemo(() => {
    if (selectedTab === "Day") {
      return rangeDate.toDateString();
    }

    if (selectedTab === "Week") {
      const start = addDays(rangeDate, -rangeDate.getDay());
      const end = addDays(start, 6);
      return `${start.getDate()} ${
        monthShort[start.getMonth()]
      } - ${end.getDate()} ${monthShort[end.getMonth()]}`;
    }

    if (selectedTab === "Month") {
      return `${monthShort[rangeDate.getMonth()]} ${rangeDate.getFullYear()}`;
    }

    return `${rangeDate.getFullYear()}`;
  }, [rangeDate, selectedTab]);

  const highlightIndex = useMemo(() => {
    if (selectedTab === "Day") return (new Date().getHours() / 4) | 0;
    if (selectedTab === "Week") {
      const d = new Date().getDay();
      return d === 0 ? 6 : d - 1;
    }
    return new Date().getDate() - 1;
  }, [selectedTab]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            // onPress={() => {
            onPress={() => navigation.goBack()}
            /* wire to navigation.goBack() in your app; keep blank if using router elsewhere */
            // navigation?.goBack?.();
            // }}
            activeOpacity={0.8}
          >
            <Image source={BACK_ICON} style={styles.backIcon} />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Health Tracker</Text>
            <Text style={styles.headerSubtitle}>Daily Task</Text>
          </View>
        </View>

        {/* Today Card */}
        <ImageBackground
          source={TRACKER_BG}
          style={styles.todayCard}
          imageStyle={styles.todayCardImage}
          resizeMode="cover"
        >
          <Text style={styles.todayLabel}>Today</Text>

          <View style={styles.gaugeWrapper}>
            <Svg
              width={GAUGE_SIZE}
              height={GAUGE_SIZE}
              viewBox={`0 0 ${GAUGE_SIZE} ${GAUGE_SIZE}`}
            >
              <Defs>
                <SvgGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0%" stopColor="#FFFFFD" />
                  <Stop offset="8%" stopColor="#CDF533" />
                  <Stop offset="51%" stopColor="#CDF533" />
                  <Stop offset="69%" stopColor="#FFD301" />
                  <Stop offset="92%" stopColor="#CE8D16" />
                </SvgGradient>
              </Defs>

              {/* rotate group so the visible arc starts at START_ANGLE degrees */}
              <G
                rotation={START_ANGLE}
                origin={`${GAUGE_SIZE / 2}, ${GAUGE_SIZE / 2}`}
              >
                {/* Outer soft white ring (thicker, subtle) - keep design unchanged but use butt cap */}
                <Circle
                  cx={GAUGE_SIZE / 2}
                  cy={GAUGE_SIZE / 2}
                  r={PROGRESS_RADIUS}
                  stroke="#DEDBDC"
                  strokeWidth={STROKE * 0.9}
                  strokeDasharray={`${ARC_LENGTH + 40} ${CIRCUMFERENCE}`}
                  strokeLinecap="round"
                  fill="none"
                  opacity={0.45}
                />

                {/* thin border/highlight aligned to stroke */}
                <Circle
                  cx={GAUGE_SIZE / 2}
                  cy={GAUGE_SIZE / 2}
                  r={PROGRESS_RADIUS}
                  stroke="rgba(255,255,255,0.92)"
                  strokeWidth={STROKE * 0.45}
                  strokeDasharray={`${ARC_LENGTH + 40} ${CIRCUMFERENCE}`}
                  strokeLinecap="round"
                  fill="none"
                  opacity={0.9}
                />

                {/* NEW: inner static arc (slightly inside the progress stroke) */}
                <Circle
                  cx={GAUGE_SIZE / 2}
                  cy={GAUGE_SIZE / 2}
                  r={PROGRESS_RADIUS - INNER_OFFSET} // place it inside by INNER_OFFSET
                  stroke="#9F9E9F" // your requested color
                  strokeWidth={STROKE * 0.28} // thin inner stroke
                  strokeDasharray={`${ARC_LENGTH - 25} ${CIRCUMFERENCE}`} // show same sweep
                  strokeLinecap="round"
                  fill="none"
                  opacity={0.9}
                />
                {/* Animated gradient progress arc (same arc length).
                    Start offset includes strokeCapExtra so round cap is fully off-screen at 0.
                    Use progressOpacity so nothing is visible when anim exactly 0. */}
                {/* {!progressIsComplete ? ( */}
                <AnimatedCircle
                  cx={GAUGE_SIZE / 2}
                  cy={GAUGE_SIZE / 2}
                  r={PROGRESS_RADIUS}
                  stroke={!progressIsComplete ? "url(#gaugeGrad)" : "#8DDC64"}
                  strokeWidth={STROKE * 0.35}
                  strokeLinecap="round"
                  strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE + 40}`}
                  strokeDashoffset={anim.interpolate({
                    inputRange: [0, 1],
                    // when anim=0 => offset = ARC_LENGTH (hidden); anim=1 => offset = 0 (full visible)
                    outputRange: [ARC_LENGTH + strokeCapExtra, 0],
                  })}
                  fill="none"
                  opacity={progressOpacity}
                />
                {/* ) : (
                  // When complete show solid green arc
                  <AnimatedCircle
                    cx={GAUGE_SIZE / 2}
                    cy={GAUGE_SIZE / 2}
                    r={PROGRESS_RADIUS}
                    stroke="#8DDC64"
                    strokeWidth={STROKE * 0.35}
                    strokeLinecap="round"
                    strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE + 60}`}
                    strokeDashoffset={anim.interpolate({
                      inputRange: [0, 1],
                      // when anim=0 => offset = ARC_LENGTH (hidden); anim=1 => offset = 0 (full visible)
                      outputRange: [ARC_LENGTH, 0],
                    })}
                    fill="none"
                    opacity={1}
                  />
                )} */}
              </G>
            </Svg>

            {/* pointer overlay - absolute so it sits on top of SVG */}
            <View
              pointerEvents="none"
              style={[StyleSheet.absoluteFillObject, { zIndex: 10 }]}
            >
              {pointerPos && (
                <Animated.View
                  style={{
                    position: "absolute",
                    left: pointerPos.x,
                    top: pointerPos.y,
                    transform: [
                      // center the pointer by half its style width/height
                      { translateX: -(STROKE * 1.6) / 2 },
                      { translateY: -(STROKE * 1.6) / 2 },
                      { rotate: `${pointerPos.rotation}deg` },
                    ],
                  }}
                >
                  <View style={styles.pointerBase}>
                    <Image source={POINTER_IMG} style={styles.pointerImg} />
                  </View>
                </Animated.View>
              )}
            </View>

            {/* Markers around the gauge (positioned roughly) */}
            <Text style={[styles.gaugeMarker, { left: 56, top: scale(190) }]}>
              0
            </Text>
            <Text
              style={[styles.gaugeMarker, { left: scale(32), top: scale(100) }]}
            >
              2500
            </Text>
            <Text
              style={[
                styles.gaugeMarker,
                { left: GAUGE_SIZE / 2 - scale(12), top: scale(30) },
              ]}
            >
              5000
            </Text>
            <Text
              style={[
                styles.gaugeMarker,
                { right: scale(32), top: scale(100) },
              ]}
            >
              7500
            </Text>
            <Text style={[styles.gaugeMarker, { right: 56, top: scale(190) }]}>
              10k
            </Text>
          </View>

          <Text style={styles.stepsNumber}>{steps}</Text>
          <Text style={styles.stepsLabel}>Steps</Text>
        </ImageBackground>

        {/* Rewards / two cards */}
        <Text style={styles.sectionTitle}>Boost-up Your Daily Rewards</Text>
        <View style={styles.rewardsRow}>
          <ImageBackground
            source={PRODUCT_BG}
            style={styles.rewardCard}
            imageStyle={styles.rewardCardImage}
            resizeMode="cover"
          >
            <Image
              source={IMG_16}
              style={styles.rewardImage}
              resizeMode="cover"
            />

            <View style={styles.rewardTextWrap}>
              <Text style={styles.rewardName}>Nike</Text>
              <Text style={styles.rewardPrice}>₹ 1,999</Text>
            </View>
          </ImageBackground>

          <ImageBackground
            source={PRODUCT_BG}
            style={styles.rewardCard}
            imageStyle={styles.rewardCardImage}
            resizeMode="cover"
          >
            <Image
              source={IMG_28}
              style={styles.rewardImage}
              resizeMode="cover"
            />

            <View style={styles.rewardTextWrap}>
              <Text style={styles.rewardName}>Nike</Text>
              <Text style={styles.rewardPrice}>₹ 1,999</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Reports */}
        <Text style={styles.sectionTitle}>Reports</Text>

        {/* Tabs header */}
        <View style={styles.reportsHeader}>
          <View style={styles.tabsRow}>
            {TABS.map((t) => {
              const active = t === selectedTab;
              return (
                <TouchableOpacity
                  key={t}
                  style={styles.tabBtn}
                  onPress={() => setSelectedTab(t)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.tabText, active && styles.tabActive]}>
                    {t}
                  </Text>
                  <View
                    style={[
                      styles.tabUnderline,
                      active && styles.tabUnderlineActive,
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Reports card uses image background (no header baked into the image) */}
        <ImageBackground
          source={REPORTS_BG}
          style={styles.reportsCard}
          imageStyle={styles.reportsCardImage}
          resizeMode="cover"
        >
          {/* arrows + date range centered */}
          <View style={styles.headerControls}>
            <TouchableOpacity
              onPress={onPrevRange}
              style={[styles.arrowBtn, { left: 0 }]}
            >
              <Image source={PREV_ICON} style={styles.arrowIcon} />
            </TouchableOpacity>

            {/* <Text style={styles.dateRangeHeader}>{dateRangeLabel}</Text> */}
            <TouchableOpacity onPress={() => setShowPicker(true)}>
              <Text style={styles.dateRangeHeader}>{dateRangeLabel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onNextRange}
              style={[styles.arrowBtn, { right: 0 }]}
            >
              <Image source={NEXT_ICON} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
          {/* Chart area */}
          <View style={styles.chartArea}>
            {/* horizontal ruler lines (5 lines) */}
            <View style={styles.rulerOverlay}>
              {[0, 1, 2, 3, 4].map((i) => (
                <View
                  key={i}
                  style={[styles.rulerLine, { top: `${(i / 4) * 100}%` }]}
                />
              ))}
            </View>

            {/* Y axis top label */}
            <Text style={styles.yAxisLabel}>10 k</Text>

            {/* Bars + base ruler */}
            <View style={styles.barChartWrap}>
              <Animated.View
                style={{
                  transform: [{ scale: zoomAnim }],
                }}
              >
                <View style={styles.barChart}>
                  {chartBars.map((v: number, i: number) => {
                    const height =
                      v === 0 ? 2 : Math.max(6, (v / maxBarValue) * scale(120));

                    const hasData = v > 0;
                    const isHighlight = i === highlightIndex;

                    return (
                      <View key={i} style={styles.barWrapper}>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPressIn={(e) => {
                            if (!hasData) return;

                            const { pageX, pageY } = e.nativeEvent;
                            setTooltip({
                              x: pageX,
                              y: pageY - 40,
                              value: v,
                              label: chartLabels[i],
                            });
                          }}
                        >
                          <LinearGradient
                            colors={
                              hasData
                                ? isHighlight
                                  ? ["#CDF533", "#8DDC64"] // active + data
                                  : ["#9BE15D", "#00E3AE"] // normal data bar
                                : [
                                    "rgba(255,255,255,0.06)",
                                    "rgba(255,255,255,0.04)",
                                  ] // no data
                            }
                            style={[styles.bar, { height }]}
                          />
                        </TouchableOpacity>

                        <Text
                          style={[
                            styles.barLabel,
                            hasData && styles.barLabelActive,
                          ]}
                        >
                          {chartLabels[i]}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </Animated.View>
              {/* horizontal base line (ruler) */}
              <View style={styles.baseLine} />

              {/* ticks under bars */}
              <View style={styles.ticksRow}>
                {chartBars.map((_, i) => (
                  <View key={i} style={styles.tick} />
                ))}
              </View>
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: avgY,
                  height: 1,
                  backgroundColor: "#00E5FF",
                  opacity: 0.8,
                  zIndex: 3,
                }}
              />

              <Text
                style={{
                  position: "absolute",
                  right: 6,
                  top: avgY - 10,
                  fontSize: 10,
                  color: "#00E5FF",
                }}
              >
                AVG
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: targetY,
                height: 1,
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "#FFD301",
                zIndex: 3,
              }}
            />

            <Text
              style={{
                position: "absolute",
                right: 6,
                top: targetY - 10,
                fontSize: 10,
                color: "#FFD301",
              }}
            >
              10K
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>
      {showPicker && (
        <DateTimePicker
          value={rangeDate}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "calendar"}
          onChange={(_, d) => {
            setShowPicker(false);
            if (d) setRangeDate(d);
          }}
        />
      )}
      {tooltip && (
        <TouchableOpacity
          style={styles.tooltipOverlay}
          onPress={() => setTooltip(null)}
        >
          <View
            style={[styles.tooltip, { left: tooltip.x - 50, top: tooltip.y }]}
          >
            <Text style={styles.tooltipLabel}>{tooltip.label}</Text>
            <Text style={styles.tooltipValue}>{tooltip.value} steps</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Bottom nav (placeholder) */}
      <IPhoneSeBottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}

/* ---------------------- Styles ---------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12151D",
    paddingTop: Platform.OS === "ios" ? 44 : 20,
  },
  scrollContainer: { paddingBottom: 140 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  // pointerBase width/height values used to center pointer in runtime transform
  pointerBase: {
    width: STROKE * 1.3,
    height: STROKE * 1.3,
    borderRadius: (STROKE * 1.3) / 2,
    backgroundColor: "#000", // inner black circle
    borderColor: "#CDF533", // neon green border
    borderWidth: 0.9,
    alignItems: "center",
    justifyContent: "center",
  },

  pointerImg: {
    width: STROKE * 0.6,
    height: STROKE * 0.6,
    resizeMode: "contain",
  },

  backBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(9),
    // backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  backIcon: { width: scale(16), height: scale(16), tintColor: "#fff" },
  headerText: { flexDirection: "column" },
  headerTitle: { color: "#fff", fontSize: scale(18), fontWeight: "700" },
  headerSubtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: scale(12),
    marginTop: 2,
  },
  todayCard: {
    marginHorizontal: 16,
    borderRadius: 16, // square corners
    paddingVertical: 18,
    paddingHorizontal: 16,
    overflow: "hidden",
    alignItems: "center",
    marginBottom: 18,

    borderWidth: 1.5, // visible stroke
  },

  todayCardImage: {
    borderRadius: 6, // MUST match parent radius
    width: "100%",
    height: "100%", // fixed stretching issue
    resizeMode: "cover",
  },

  todayLabel: {
    color: "#fff",
    fontSize: scale(14),
    alignSelf: "flex-start",
    marginBottom: 12,
  },

  gaugeWrapper: {
    width: GAUGE_SIZE,
    height: GAUGE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  gaugeMarker: { position: "absolute", color: "#fff", fontSize: scale(11) },

  stepsNumber: {
    fontSize: scale(36),
    fontWeight: "800",
    color: "#CDF533",
    marginTop: -40,
  },
  stepsLabel: { fontSize: scale(14), fontWeight: "600", color: "#CDF533" },

  sectionTitle: {
    color: "#fff",
    fontSize: scale(16),
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },

  rewardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  rewardCard: {
    width: (SCREEN_WIDTH - 48) / 2,
    height: scale(200),
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    marginBottom: 10,
  },

  rewardCardImage: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },

  rewardImage: {
    width: "100%",
    height: scale(86),
    borderRadius: 6,
    marginTop: 24,
    marginBottom: 16,
  },

  rewardTextWrap: {
    width: "100%",
    marginTop: 4,
  },

  rewardName: {
    color: "#FFFFFF",
    fontSize: scale(14),
    fontWeight: "600",
    textAlign: "left",
  },

  rewardPrice: {
    color: "#FFFFFF",
    fontSize: scale(13),
    fontWeight: "700",
    marginTop: 2,
    textAlign: "left",
  },

  // Reports card container
  reportsCard: {
    marginHorizontal: 16,
    padding: 12,
    backgroundColor: "transparent",

    // Only bottom corners rounded
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,

    overflow: "hidden",
  },

  // Background image must match same radius and not stretch
  reportsCardImage: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,

    width: "100%",
    height: "100%",
    resizeMode: "contain", // prevents stretching
  },

  reportsHeader: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 0,

    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    // Borders
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,

    // Bottom border with green stroke
    borderBottomWidth: 1.5,
    borderBottomColor: "#239D46",

    // Other sides keep the default white-opacity color
    borderColor: "rgba(255,255,255,0.08)",

    backgroundColor: "rgba(13,17,19,0.35)", // optional, remove if not needed
  },

  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabBtn: {
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  tabText: {
    color: "#fff",
    fontSize: scale(13),
  },
  tabActive: {
    color: "#CDF533",
    fontWeight: "700",
  },
  tabUnderline: {
    height: 3,
    width: 58,
    marginTop: 6,
    backgroundColor: "transparent",
    borderRadius: 2,
  },
  tabUnderlineActive: {
    backgroundColor: "#CDF533",
  },

  /* header controls (arrows + date) */
  headerControls: {
    width: "100%",
    justifyContent: "center", // centers the date
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
  },

  arrowBtn: {
    width: scale(30),
    height: scale(30),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    marginTop: -scale(15), // center vertically
  },
  arrowIcon: {
    width: scale(22),
    height: scale(22),
    tintColor: "#fff",
    resizeMode: "contain",
  },

  dateRangeHeader: {
    color: "#fff",
    fontSize: scale(14),
    marginHorizontal: 12,
    marginBottom: 40,
  },
  tooltipOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },

  tooltip: {
    position: "absolute",
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#CDF533",
  },

  tooltipLabel: {
    color: "#aaa",
    fontSize: 10,
    textAlign: "center",
  },

  tooltipValue: {
    color: "#CDF533",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },

  /* Reports card (image background) */
  // reportsCard: {
  //   marginHorizontal: 16,
  //   borderRadius: 12,
  //   padding: 12,
  //   backgroundColor: "transparent",
  //   overflow: "hidden",
  // },
  // reportsCardImage: { borderRadius: 12 },

  /* chart area and ruler */
  chartArea: {
    paddingTop: 6,
    paddingBottom: 18,
    paddingHorizontal: 6,
    minHeight: scale(180),
    position: "relative",
  },

  rulerOverlay: {
    position: "absolute",
    left: 8,
    right: 8,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  rulerLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  yAxisLabel: {
    color: "rgba(255,255,255,0.5)",
    textAlign: "right",
    marginBottom: 8,
    zIndex: 2,
  },

  barChartWrap: {
    position: "relative",
    zIndex: 2,
    paddingTop: 8,
  },

  barChart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: scale(120),
    paddingHorizontal: 6,
  },

  barWrapper: {
    width: scale(26),
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bar: {
    width: scale(16),
    borderRadius: 6,
  },
  barLabel: {
    color: "#fff",
    fontSize: scale(10),
    marginTop: 8,
    textAlign: "center",
  },
  barLabelActive: { color: "#CDF533", fontWeight: "700" },

  /* base line & ticks */
  baseLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    bottom: scale(22),
    zIndex: 2,
  },

  /* Ticks aligned under each bar */
  ticksRow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: scale(16),
    height: 6,
    flexDirection: "row",
    justifyContent: "space-around", // ALIGN WITH BAR WRAPPER
    alignItems: "center",
    zIndex: 2,
  },

  tick: {
    width: 2,
    height: 6,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 1,
  },
  // keep your existing dateRow but adjust spacing
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 6,
  },

  dateArrow: { color: "#fff", fontSize: scale(18) },
  dateRange: { color: "#fff", fontSize: scale(14) },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
    backgroundColor: "#12151d",
    borderTopColor: "rgba(255,255,255,0.02)",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: { alignItems: "center" },
  navText: { color: "#bfc8d0" },
});

export { PROGRESS_RADIUS, STROKE };
