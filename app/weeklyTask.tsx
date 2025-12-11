// app/SkillTaskScreen.tsx
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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

const { width } = Dimensions.get("window");

// STATIC imports (must be static for Metro)
const MODULE_ICON = require("../assets/Module.png");
const MODULE_TIME_ICON = require("../assets/Module Time.png");
const PREVIEW_ICON = require("../assets/Preview.png");
const INFO_BG = require("../assets/bg2.png");
const SKILL_COMPLETION_ICON = require("../assets/Skill Task Completion.png");

// Course images (Skill1..Skill6)
const SKILL_IMAGES = [
  require("../assets/Skill1.png"),
  require("../assets/Skill2.png"),
  require("../assets/Skill3.png"),
  require("../assets/Skill4.png"),
  require("../assets/Skill5.png"),
  require("../assets/Skill6.png"),
];

type Course = {
  id: number;
  title: string;
  modules: number;
  time: string;
  price?: string;
  image?: any;
};

const COURSES: Course[] = [
  {
    id: 1,
    title: "Everyday Electrical Fixes at Home",
    modules: 15,
    time: "4 Min 50 Sec",
    price: "₹ 10/-",
    image: SKILL_IMAGES[0],
  },
  {
    id: 2,
    title: "Everyday Plumbing Fixes at Home",
    modules: 15,
    time: "4 Min 50 Sec",
    price: "₹ 10/-",
    image: SKILL_IMAGES[1],
  },
  {
    id: 3,
    title: "Home Appliance Maintenance Hacks",
    modules: 15,
    time: "4 Min 50 Sec",
    price: "₹ 10/-",
    image: SKILL_IMAGES[2],
  },
  {
    id: 4,
    title: "Home Wall Care & Painting Essentials",
    modules: 15,
    time: "4 Min 50 Sec",
    price: "₹ 10/-",
    image: SKILL_IMAGES[3],
  },
  {
    id: 5,
    title: "Home Concrete & Tile Repairs",
    modules: 10,
    time: "3 Min",
    price: "Free",
    image: SKILL_IMAGES[4],
  },
  {
    id: 6,
    title: "Smartphone Hacks and Basic Repair",
    modules: 15,
    time: "4 Min 50 Sec",
    price: "₹ 10/-",
    image: SKILL_IMAGES[5],
  },
];

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

function CourseCard({ course }: { course: Course }) {
  const navigation = useNavigation<any>();

  function onPress() {
    navigation.navigate("TaskDetail", { course });
  }
  return (
    <TouchableOpacity
      activeOpacity={0.92}
      style={styles.courseCard}
      onPress={onPress}
    >
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
  const [activeTab, setActiveTab] = useState<"home" | "wallet" | "profile">(
    "home"
  );

  return (
    <View style={[styles.screen]}>
      <StatusBar barStyle="light-content" backgroundColor="#12151D" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Simplified header: small preview image + single title "Skill Test" */}
        <View style={styles.simpleHeader}>
          <Image source={PREVIEW_ICON} style={styles.previewSmall} />
          <Text style={styles.simpleHeaderTitle}>Skill Test</Text>
        </View>

        <ImageBackground
          source={INFO_BG}
          style={styles.infoCard}
          imageStyle={{ borderRadius: 12 }}
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

        <Text style={styles.sectionTitle}>Courses</Text>

        <View style={styles.grid}>
          {COURSES.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </View>

        <View style={{ height: 96 }} />
      </ScrollView>

      {/* Use the shared iPhone SE bottom bar */}
      <IPhoneSeBottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#12151D" },
  scroll: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 40 },

  /* Simple header */
  simpleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  previewSmall: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  simpleHeaderTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    marginLeft: 10,
  },

  infoCard: {
    width: "100%",
    minHeight: 96,
    borderRadius: 12,
    flexDirection: "row",
    padding: 14,
    borderColor: "rgba(153,197,140,0.06)",
    borderWidth: 1,
    marginBottom: 18,
    overflow: "hidden",
  },
  infoLeft: {
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 12,
  },
  skillCompletionIcon: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  infoRight: { flex: 1, paddingLeft: 6 },
  infoTitle: {
    color: "#89939a",
    fontSize: 16,
    fontFamily: "Roboto-SemiBold",
    marginBottom: 6,
  },
  infoDesc: {
    color: "#d9e1e3",
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
    justifyContent: "space-between",
    gap: 12,
  },

  /* course card: NO border on card itself (per request) */
  courseCard: {
    width: (width - 48) / 2 - 4,
    // backgroundColor: "#0f1316",
    borderRadius: 12,
    padding: 10,
    marginBottom: 18,
    // no border here
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
  bottomNavInner: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 12,
  },
  navItem: { alignItems: "center" },
  navIconPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.02)",
    marginBottom: 6,
  },
  navLabel: { color: "#bfc8d0", fontSize: 14, fontFamily: "Roboto-Regular" },
});
