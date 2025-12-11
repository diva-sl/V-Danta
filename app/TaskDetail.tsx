// app/TaskDetail.tsx  (replace existing file or paste the new sections)
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_W } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const normalize = (size: number) =>
  Math.round((size * SCREEN_W) / guidelineBaseWidth);

/* -------------------- types & static requires -------------------- */
type Course = {
  id: number;
  title: string;
  modules: number;
  time: string;
  price?: string;
};
type RootStackParamList = {
  TaskDetail: { course?: Course } | undefined;
};

const MODULE_ICON: ImageSourcePropType = require("../assets/Module.png");
const MODULE_TIME_ICON: ImageSourcePropType = require("../assets/Module Time.png");

/* -------------------- small helpers -------------------- */
function generateCurriculum(total: number) {
  return Array.from({ length: Math.max(0, total) }).map((_, i) => ({
    id: i + 1,
    title: i === 0 ? "Fixing a Loose Switch Board" : `Module ${i + 1} - Topic`,
    duration: i === 0 ? "20 Sec" : `${10 + (i % 3) * 5} Sec`,
    status: i === 0 ? "watched" : "learn",
  }));
}

/* -------------------- main screen -------------------- */
export default function TaskDetailScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "TaskDetail">>();

  const defaultCourse: Course = {
    id: 1,
    title: "Everyday Electrical Fixes at Home",
    modules: 15,
    time: "4 Min 50 Sec",
    price: "₹ 10/-",
  };

  const course: Course = route.params?.course ?? defaultCourse;
  const curriculum = useMemo(
    () => generateCurriculum(course.modules || 0),
    [course.modules]
  );

  // progress state (0..1) - currently simulated. Replace with real player progress.
  const [progress, setProgress] = useState(0.12); // example initial progress
  // smooth animated bar
  const progressAnim = React.useRef(new Animated.Value(progress)).current;
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [progress, progressAnim]);

  // simulate small auto-progress for demo (remove when hooking to real player)
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(1, p + 0.02);
        return next === 1 ? 0.0 : next;
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const onPlayPress = (item: { id: number }) =>
    console.log("Play pressed:", item.id);

  /* helper to convert animated value to percentage style */
  const fillWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#0f1517" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Media / placeholder with bottom player controls --- */}
        <View style={styles.mediaWrapper}>
          <View style={styles.mediaArea}>
            {/* header (back + current/total time) */}
            <View style={styles.mediaHeader}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backBtn}
              >
                <Text style={styles.backBtnTxt}>{"<"}</Text>
              </TouchableOpacity>
            </View>

            {/* big media placeholder (video frame) */}
            <View style={styles.mediaPlaceholder} />

            {/* bottom player controls: start time - progress bar - end time - fullscreen */}
            <View style={styles.playerControls}>
              <Text style={styles.playerTimeText}>0:00</Text>

              <View style={styles.progressWrap}>
                <View style={styles.progressTrack}>
                  <Animated.View
                    style={[styles.progressFill, { width: fillWidth }]}
                  />
                </View>
              </View>

              <Text style={styles.playerTimeText}>0:20</Text>

              <TouchableOpacity
                style={styles.fullscreenBtn}
                activeOpacity={0.8}
                onPress={() => {
                  console.log("fullscreen pressed");
                  // hook to real fullscreen action later
                }}
              >
                <Text style={styles.fullscreenIcon}>⤢</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- Title row: left title + inline module + duration, right Each Video + price --- */}
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.courseTitle} numberOfLines={2}>
              {course.title}
            </Text>

            {/* Inline row: module icon + modules count  •  duration icon + duration */}
            <View style={styles.inlineMetaRow}>
              <View style={styles.inlineMetaItem}>
                <Image
                  source={MODULE_ICON}
                  style={styles.inlineMetaIcon}
                  resizeMode="contain"
                />
                <Text style={styles.inlineMetaText}>
                  <Text style={styles.inlineMetaBold}>{course.modules}</Text>{" "}
                  Modules
                </Text>
              </View>

              <View style={styles.inlineSpacer} />

              <View style={styles.inlineMetaItem}>
                <Image
                  source={MODULE_TIME_ICON}
                  style={styles.inlineMetaIcon}
                  resizeMode="contain"
                />
                <Text style={styles.inlineMetaText}>{course.time}</Text>
              </View>
            </View>
          </View>

          <View style={styles.rightColumn}>
            <Text style={styles.eachVideo}>Each Video</Text>
            <Text style={styles.price}>{course.price}</Text>
          </View>
        </View>

        {/* rest remains the same (meta, divider, curriculum, etc.) */}
        {/* <View style={styles.metaRow}>
          <View style={styles.metaLeft}>
            <Image
              source={MODULE_ICON}
              style={styles.metaIcon}
              resizeMode="contain"
            />
            <Text style={styles.metaText}>
              <Text style={styles.metaBold}>{course.modules}</Text> Modules
            </Text>
          </View>
        </View> */}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Curriculum</Text>

        <FlatList
          data={curriculum}
          keyExtractor={(it) => `${it.id}`}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <View style={styles.curriculumContainer}>
              <View style={styles.curriculumLeft}>
                <Text style={styles.slNo}>{index + 1}</Text>

                <View style={styles.titleAndDuration}>
                  <Text style={styles.curriculumTitle} numberOfLines={2}>
                    {item.title}
                  </Text>

                  <View style={styles.durationRowInline}>
                    <Image
                      source={MODULE_TIME_ICON}
                      style={[styles.durationIcon, { marginLeft: 6 }]}
                      resizeMode="contain"
                    />
                    <Text style={styles.durationTxt}>{item.duration}</Text>

                    {item.status === "watched" && (
                      <View style={styles.watchedBadgeInline}>
                        <Text style={styles.watchedTxtInline}>
                          Previously watched
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              <View style={styles.curriculumRight}>
                <TouchableOpacity
                  style={styles.learnBtn}
                  onPress={() => onPlayPress(item)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.learnTxt}>
                    {item.status === "watched" ? "Watch again" : "Learn"}
                  </Text>

                  <View style={styles.playCircle}>
                    <View style={styles.playTriangle} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
        />

        <View style={{ height: normalize(60) }} />
      </ScrollView>
    </View>
  );
}

/* -------------------- styles (additions+adjustments) -------------------- */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#12151D" },
  scroll: { paddingHorizontal: normalize(16), paddingBottom: normalize(30) },

  /* media */
  mediaWrapper: {
    marginHorizontal: normalize(-16),
    width: SCREEN_W,
  },

  mediaArea: {
    width: "100%",
    height: normalize(260),
    backgroundColor: "#0d1113",
    borderRadius: 0,
    marginTop: normalize(0),
    overflow: "hidden",
  },

  mediaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: normalize(10),
    zIndex: 2,
  },
  backBtn: {
    width: normalize(34),
    height: normalize(34),
    borderRadius: normalize(17),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    justifyContent: "center",
    alignItems: "center",
  },
  backBtnTxt: { color: "#fff", fontSize: normalize(16) },
  mediaTime: { color: "#fff", fontSize: normalize(12) },

  mediaPlaceholder: {
    flex: 1,
    marginHorizontal: normalize(10),
    backgroundColor: "#0b0f11",
    borderRadius: normalize(8),
  },

  /* player controls at bottom of media frame */
  playerControls: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalize(12),
    gap: normalize(8),
  },
  playerTimeText: {
    color: "#dfe7e7",
    fontSize: normalize(12),
    width: normalize(40),
  },
  progressWrap: { flex: 1, paddingHorizontal: normalize(6) },
  progressTrack: {
    height: normalize(6),
    borderRadius: normalize(6),
    backgroundColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#CDF533",
  },
  fullscreenBtn: {
    marginLeft: normalize(8),
    width: normalize(34),
    height: normalize(34),
    borderRadius: normalize(6),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    backgroundColor: "#0d1113",
  },
  fullscreenIcon: { color: "#dfe7e7", fontSize: normalize(14) },

  /* title row updated - module and duration inline */
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: normalize(12),
    marginBottom: normalize(12),
  },
  courseTitle: {
    color: "#fff",
    fontSize: normalize(14),
    fontWeight: "600",
    marginBottom: normalize(6),
  },

  inlineMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: normalize(12),
  },
  inlineMetaItem: { flexDirection: "row", alignItems: "center" },
  inlineMetaIcon: {
    width: normalize(12),
    height: normalize(12),
    marginRight: normalize(8),
  },
  inlineMetaText: { color: "#dfe7e7", fontSize: normalize(12) },
  inlineMetaBold: { color: "#fff", fontWeight: "500" },
  inlineSpacer: { width: normalize(14) },

  rightColumn: { alignItems: "flex-end", marginLeft: normalize(12) },
  eachVideo: { color: "#dfe7e7", fontSize: normalize(11) },
  price: {
    color: "#fff",
    fontSize: normalize(14),
    marginTop: normalize(6),
    fontWeight: "500",
  },

  /* existing styles unchanged (curriculum etc.) */
  metaRow: {
    flexDirection: "row",
    marginTop: normalize(8),
    marginBottom: normalize(8),
  },
  metaLeft: { flexDirection: "row", alignItems: "center" },
  metaIcon: {
    width: normalize(16),
    height: normalize(16),
    marginRight: normalize(6),
  },
  metaText: { color: "#dfe7e7", fontSize: normalize(12) },
  metaBold: { color: "#fff", fontWeight: "700" },

  divider: {
    height: 1,
    backgroundColor: "rgba(217,217,217,0.04)",
    marginVertical: normalize(8),
  },

  sectionTitle: {
    color: "#fff",
    fontSize: normalize(14),
    fontWeight: "700",
    marginBottom: normalize(8),
  },

  curriculumContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: normalize(8),
    borderRadius: normalize(8),
  },
  curriculumLeft: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  slNo: {
    color: "#cfe8d8",
    width: normalize(26),
    fontWeight: "400",
    fontSize: normalize(13),
    textAlign: "center",
    alignSelf: "center",
    marginRight: normalize(8),
  },
  titleAndDuration: { flex: 1 },
  curriculumTitle: {
    color: "#fff",
    fontSize: normalize(13),
    marginBottom: normalize(6),
  },

  durationRowInline: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: normalize(0),
  },
  durationIcon: {
    width: normalize(14),
    height: normalize(14),
    marginRight: normalize(8),
    marginTop: 0,
  },
  durationTxt: { color: "#dfe7e7", fontSize: normalize(12) },

  watchedBadgeInline: {
    backgroundColor: "#1D3210",
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(4),
    borderRadius: normalize(6),
    marginLeft: normalize(10),
  },
  watchedTxtInline: {
    color: "#CDF533",
    fontWeight: "700",
    fontSize: normalize(11),
  },

  curriculumRight: {
    width: normalize(110),
    alignItems: "flex-end",
    justifyContent: "center",
  },

  learnBtn: { flexDirection: "row", alignItems: "center" },
  learnTxt: {
    color: "#bfc8d0",
    fontWeight: "400",
    marginRight: normalize(8),
    fontSize: normalize(12),
  },

  playCircle: {
    width: normalize(34),
    height: normalize(34),
    borderRadius: normalize(17),
    backgroundColor: "#0d1113",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    justifyContent: "center",
    alignItems: "center",
  },
  playTriangle: {
    width: 0,
    height: 0,
    marginLeft: normalize(2),
    borderLeftWidth: normalize(7),
    borderLeftColor: "#CDF533",
    borderTopWidth: normalize(5),
    borderTopColor: "transparent",
    borderBottomWidth: normalize(5),
    borderBottomColor: "transparent",
  },

  rowSeparator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.02)",
    marginVertical: normalize(6),
  },
});
