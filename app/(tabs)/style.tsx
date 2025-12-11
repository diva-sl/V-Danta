// src/screens/SkillTaskScreen.js
import React from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

/*
 Developer-supplied reference image path (kept as requested).
 Not used for rendering — only for your reference or tests.
*/
export const REFERENCE_SCREENSHOT = "file:///mnt/data/iPhone SE - 14.png";

/* Sample course data (images left empty on purpose) */
const COURSES = [
  {
    id: 1,
    title: "Everyday Electrical Fixes at Home",
    modules: 15,
    time: "4 Min 50 Sec",
  },
  {
    id: 2,
    title: "Everyday Plumbing Fixes at Home",
    modules: 15,
    time: "4 Min 50 Sec",
  },
  {
    id: 3,
    title: "Home Appliance Maintenance Hacks",
    modules: 15,
    time: "4 Min 50 Sec",
  },
  {
    id: 4,
    title: "Home Wall Care & Painting Essentials",
    modules: 15,
    time: "4 Min 50 Sec",
  },
  { id: 5, title: "Home Concrete & Tile Repairs", modules: 10, time: "3 Min" },
  {
    id: 6,
    title: "Smartphone Hacks and Basic Repair",
    modules: 15,
    time: "4 Min 50 Sec",
  },
];

/* Reusable small icon row - simple textual icons as placeholders */
function MetaRow({ modules, time }) {
  return (
    <View style={styles.metaRow}>
      <View style={styles.metaItem}>
        <View style={styles.metaIconPlaceholder} />
        <Text style={styles.metaText}>{modules}</Text>
        <Text style={[styles.metaText, { marginLeft: 6 }]}>Modules</Text>
      </View>

      <View style={[styles.metaItem, { marginLeft: 18 }]}>
        <View style={[styles.metaIconPlaceholder, { width: 14, height: 14 }]} />
        <Text style={styles.metaText}>{time}</Text>
      </View>
    </View>
  );
}

/* Course card - image area intentionally left empty for later replacement */
function CourseCard({ course }) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.courseCard}>
      {/* image placeholder */}
      <View style={styles.imagePlaceholder} />

      {/* title */}
      <Text style={styles.courseTitle} numberOfLines={2}>
        {course.title}
      </Text>

      {/* meta row */}
      <MetaRow modules={course.modules} time={course.time} />
    </TouchableOpacity>
  );
}

export default function SkillTaskScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#0f1517" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.headerBack}>
            <Text style={styles.headerBackText}>{"<"}</Text>
          </TouchableOpacity>

          <View style={{ marginLeft: 8 }}>
            <Text style={styles.headerTitle}>Skill Task</Text>
            <Text style={styles.headerSubtitle}>
              - E - Learning (Micro-Courses)
            </Text>
          </View>

          <Text style={styles.weeklyText}>Weekly Task</Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoLeft}>
            <View style={styles.iconBoxPlaceholder} />
          </View>
          <View style={styles.infoRight}>
            <Text style={styles.infoTitle}>Skill Task</Text>
            <Text style={styles.infoDesc}>
              Each week, choose one course from the Topic Modules. Purchase it,
              watch, and master it to complete your self-empowerment task.
            </Text>
          </View>
        </View>

        {/* Courses Title */}
        <Text style={styles.sectionTitle}>Courses</Text>

        {/* Grid: two columns */}
        <View style={styles.grid}>
          {COURSES.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </View>

        {/* bottom spacing so content doesn't overlap bottom nav */}
        <View style={{ height: 96 }} />
      </ScrollView>

      {/* Bottom Nav (visual only) */}
      <View style={styles.bottomNav}>
        <View style={styles.bottomNavInner}>
          <View style={styles.navItem}>
            <View style={styles.navIconPlaceholder} />
            <Text style={styles.navLabel}>Home</Text>
          </View>

          <View style={styles.navItem}>
            <View style={styles.navIconPlaceholder} />
            <Text style={styles.navLabel}>Wallet</Text>
          </View>

          <View style={styles.navItem}>
            <View style={styles.navIconPlaceholder} />
            <Text style={styles.navLabel}>Profile</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

/* Styles */
const GAP = 12;
const CARD_PADDING = 14;
const CARD_RADIUS = 12;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0f1517", // dark background
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },

  /* Header */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  headerBack: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerBackText: {
    color: "#fff",
    fontSize: 18,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#bfc8d0",
    fontSize: 12,
    marginTop: 2,
  },
  weeklyText: {
    marginLeft: "auto",
    color: "#98a0a6",
    fontSize: 14,
    marginRight: 8,
  },

  /* Info card */
  infoCard: {
    width: "100%",
    minHeight: 96,
    borderRadius: 12,
    backgroundColor: "#11181b",
    flexDirection: "row",
    padding: CARD_PADDING,
    borderColor: "rgba(153, 197, 140, 0.06)",
    borderWidth: 1,
    marginBottom: 18,
  },
  infoLeft: {
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 12,
  },
  iconBoxPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#132427",
  },
  infoRight: {
    flex: 1,
    paddingLeft: 6,
  },
  infoTitle: {
    color: "#89939a",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  infoDesc: {
    color: "#d9e1e3",
    fontSize: 13,
    lineHeight: 20,
  },

  /* Section title */
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  /* Grid */
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: GAP,
  },

  /* Course card (two-column) */
  courseCard: {
    width: (width - 48) / 2 - 4, // account for paddings (16+16) and gap
    backgroundColor: "#0f1316",
    borderRadius: CARD_RADIUS,
    padding: 10,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(46, 123, 255, 0.04)", // subtle blue border as in screenshot
  },
  imagePlaceholder: {
    width: "100%",
    height: 90,
    borderRadius: 8,
    backgroundColor: "#0e2522",
    borderWidth: 2,
    borderColor: "rgba(96,160,255,0.18)", // blueish outline like screenshot
    marginBottom: 10,
  },
  courseTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
    lineHeight: 20,
  },

  /* meta row */
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaIconPlaceholder: {
    width: 16,
    height: 16,
    borderRadius: 3,
    backgroundColor: "#0e1f1c",
    marginRight: 6,
  },
  metaText: {
    color: "#dfe7e7",
    fontSize: 13,
  },

  /* Bottom nav (visual only) */
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
  navLabel: { color: "#bfc8d0", fontSize: 14 },
});
