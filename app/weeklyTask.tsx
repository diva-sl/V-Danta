import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IPhoneSeBottomBar from "../components/IPhoneSeBottomBar";
import { useGetCoursesQuery } from "../redux/services/skillsApi";

const { width } = Dimensions.get("window");

// STATIC imports (must be static for Metro)
const MODULE_ICON = require("../assets/Module.png");
const MODULE_TIME_ICON = require("../assets/Module Time.png");
const Previous_ICON = require("../assets/Previous Arrow.png");
const INFO_BG = require("../assets/bg2.png");
const SKILL_COMPLETION_ICON = require("../assets/Skill Task Completion.png");

// Course images (Skill1..Skill6)
const SKILL_IMAGE_MAP: Record<string, any> = {
  Skill1: require("../assets/Skill1.png"),
  Skill2: require("../assets/Skill2.png"),
  Skill3: require("../assets/Skill3.png"),
  Skill4: require("../assets/Skill4.png"),
  Skill5: require("../assets/Skill5.png"),
  Skill6: require("../assets/Skill6.png"),
};

type Course = {
  id: number;
  title: string;
  modules: number;
  time: string;
  price?: string;
  image?: any;
};

// const COURSES: Course[] = [
//   {
//     id: 1,
//     title: "Everyday Electrical Fixes at Home",
//     modules: 15,
//     time: "4 Min 50 Sec",
//     price: "₹ 10/-",
//     image: SKILL_IMAGES[0],
//   },
//   {
//     id: 2,
//     title: "Everyday Plumbing Fixes at Home",
//     modules: 15,
//     time: "4 Min 50 Sec",
//     price: "₹ 10/-",
//     image: SKILL_IMAGES[1],
//   },
//   {
//     id: 3,
//     title: "Home Appliance Maintenance Hacks",
//     modules: 15,
//     time: "4 Min 50 Sec",
//     price: "₹ 10/-",
//     image: SKILL_IMAGES[2],
//   },
//   {
//     id: 4,
//     title: "Home Wall Care & Painting Essentials",
//     modules: 15,
//     time: "4 Min 50 Sec",
//     price: "₹ 10/-",
//     image: SKILL_IMAGES[3],
//   },
//   {
//     id: 5,
//     title: "Home Concrete & Tile Repairs",
//     modules: 10,
//     time: "3 Min",
//     price: "Free",
//     image: SKILL_IMAGES[4],
//   },
//   {
//     id: 6,
//     title: "Smartphone Hacks and Basic Repair",
//     modules: 15,
//     time: "4 Min 50 Sec",
//     price: "₹ 10/-",
//     image: SKILL_IMAGES[5],
//   },
// ];

function CourseMeta({ modules, time }: { modules: number; time: string }) {
  return (
    <View style={styles.metaColumn}>
      <View style={styles.metaRowTop}>
        <Image
          source={MODULE_ICON}
          style={styles.metaIcon}
          resizeMode="contain"
        />
        <Text style={styles.metaNumber}>
          <Text style={styles.metaNumberBold}>{modules}</Text>
          <Text style={styles.metaLabel}> Modules</Text>
        </Text>
      </View>

      <View style={styles.metaRowBottom}>
        <Image
          source={MODULE_TIME_ICON}
          style={[styles.metaIcon, { width: 14, height: 14 }]}
          resizeMode="contain"
        />
        <Text style={styles.metaTime}>{time}</Text>
      </View>
    </View>
  );
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const navigation = useNavigation<any>();

  function onPress() {
    navigation.navigate("TaskDetail", { course });
  }

  // set marginRight for left-column cards so two-per-row spacing works reliably
  const isLeft = index % 2 === 0;
  const cardStyle = [
    styles.courseCard,
    { marginRight: isLeft ? 12 : 0 }, // spacing between two columns
  ];

  return (
    <TouchableOpacity activeOpacity={0.92} style={cardStyle} onPress={onPress}>
      {/* Course image with thin border only */}
      <Image
        source={course.image}
        style={styles.courseImage}
        resizeMode="cover"
      />

      <Text style={styles.courseTitle} numberOfLines={2}>
        {course.title}
      </Text>

      <CourseMeta modules={course.modules} time={course.time} />
    </TouchableOpacity>
  );
}

export default function SkillTaskScreen() {
  const { data: courses = [], isLoading } = useGetCoursesQuery();

  const [activeTab, setActiveTab] = useState<"home" | "wallet" | "profile">(
    "home"
  );
  const navigation = useNavigation<any>();

  useLayoutEffect(() => {
    navigation.setOptions?.({ headerShown: false, headerLeft: () => null });
  }, [navigation]);

  return (
    <View style={[styles.screen]}>
      <StatusBar barStyle="light-content" backgroundColor="#12151D" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          {/* Back button */}
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack && navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate("Home");
              }
            }}
            style={styles.PreviousTouchable}
            activeOpacity={0.8}
          >
            <Image source={Previous_ICON} style={styles.PreviousSmall} />
          </TouchableOpacity>

          {/* Left side (Skill Task + subtitle) */}
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Skill Task</Text>
            <Text style={styles.headerSubtitle}>
              E-learning (Micro-Courses)
            </Text>
          </View>

          {/* Right side (Weekly Task + progress count) */}
          <View style={styles.headerRight}>
            <Text style={styles.weeklyText}>Weekly Task</Text>

            <View style={styles.counterBadge}>
              <Text style={styles.counterText}>0/6</Text>
            </View>
          </View>
        </View>

        <ImageBackground
          source={INFO_BG}
          style={styles.infoCard}
          imageStyle={styles.infoCardImage}
        >
          <View style={styles.infoLeft}>
            <Image
              source={SKILL_COMPLETION_ICON}
              style={styles.skillCompletionIcon}
              resizeMode="contain"
            />
          </View>

          <View style={styles.infoRight}>
            <Text style={styles.infoTitle}>Skill Task</Text>
            <Text style={styles.infoDesc}>
              Each week, choose one course from the Topic Modules. Purchase it,
              watch, and master it to complete your self-empowerment task.
            </Text>
          </View>
        </ImageBackground>

        <Text style={styles.sectionTitle}>Skill Task</Text>

        <View style={styles.grid}>
          {/* {COURSES.map((c, i) => (
            <CourseCard key={c.id} course={c} index={i} />
          ))} */}
          {courses.map((c, i) => (
            <CourseCard
              key={c.id}
              index={i}
              course={{
                id: c.id,
                title: c.title,
                modules: c.modules,
                time: c.duration,
                price: c.price,
                image: SKILL_IMAGE_MAP[c.image_key],
              }}
            />
          ))}
        </View>

        <View style={{ height: 96 }} />
      </ScrollView>

      {/* Use the shared iPhone SE bottom bar */}
      <IPhoneSeBottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}

const CARD_WIDTH = (width - 48) / 2 - 4;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#12151D" },
  scroll: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 40 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  headerLeft: {
    flexDirection: "column",
    marginLeft: 6,
    flex: 1,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Roboto-Bold",
  },

  headerSubtitle: {
    color: "#bfc8d0",
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    marginTop: 2,
  },

  headerRight: {
    alignItems: "flex-end",
  },

  weeklyText: {
    color: "#A9C1FF",
    fontSize: 13,
    fontFamily: "Roboto-SemiBold",
  },

  counterBadge: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#CDF533",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignItems: "center",
  },

  counterText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Roboto-Bold",
  },

  PreviousTouchable: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  PreviousSmall: {
    width: 20,
    height: 20,
    borderRadius: 6,
  },

  infoCard: {
    width: "100%",
    minHeight: 110, // increased to fit larger icon cleanly
    borderRadius: 10,
    flexDirection: "row",
    padding: 16,
    borderColor: "rgba(153,197,140,0.10)",
    borderWidth: 1,
    marginBottom: 18,
    overflow: "hidden",

    backgroundColor: "transparent", // ✅ remove background color completely
  },
  infoCardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12, // SAME radius as container
    resizeMode: "cover", // ← **NO STRETCH**
  },
  infoLeft: {
    width: 80, // ✅ increased space for bigger image
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 12,
  },
  skillCompletionIcon: {
    width: 80, // ✅ bigger icon
    height: 80,
    borderRadius: 8,
  },
  infoRight: {
    flex: 1,
    paddingLeft: 8,
  },
  infoTitle: {
    color: "#b0c7c0",
    fontSize: 16,
    fontFamily: "Roboto-SemiBold",
    marginBottom: 15,
  },
  infoDesc: {
    color: "#e3ecec",
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Roboto-Regular",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    marginBottom: 8,
  },

  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    // spacing is handled per-card using marginRight
  },

  /* course card: NO border on card itself (per request) */
  courseCard: {
    width: CARD_WIDTH,
    borderRadius: 12,
    padding: 10,
    marginBottom: 18,
    overflow: "hidden",
  },

  /* image: thin border only around the image, reduced weight */
  courseImage: {
    width: "100%",
    height: 90,
    borderRadius: 8,
    backgroundColor: "#0e2522",
    borderWidth: 1, // reduced weight
    borderColor: "rgba(0,123,255,0.16)", // soft blue border
    marginBottom: 10,
  },

  courseTitle: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Roboto-SemiBold",
    marginBottom: 10,
  },

  metaColumn: { flexDirection: "column" },
  metaRowTop: { flexDirection: "row", alignItems: "center" },
  metaRowBottom: { flexDirection: "row", alignItems: "center", marginTop: 8 },

  metaIcon: { width: 18, height: 18, marginRight: 8, tintColor: "#dbe7d0" },
  metaNumber: { color: "#fff", fontSize: 14, fontFamily: "Roboto-Regular" },
  metaNumberBold: { color: "#fff", fontFamily: "Roboto-Bold", fontSize: 14 },
  metaLabel: { color: "#dfe7e7", fontSize: 13, fontFamily: "Roboto-Regular" },
  metaTime: {
    color: "#dfe7e7",
    fontSize: 13,
    fontFamily: "Roboto-Regular",
    marginLeft: 6,
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    backgroundColor: "#0d1416",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.02)",
    justifyContent: "center",
  },
});
