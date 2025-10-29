// screens/HomeScreen.tsx
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ✅ SVG Icons
import CartIcon from "../assets/Cart.svg"; // cleaned cart SVG
import LogoIcon from "../assets/Logo.svg";
import NextArrow from "../assets/Next Arrow.svg";
import SkillIcon from "../assets/Skill_Icon.svg";
import StepsIcon from "../assets/Steps_Icon.svg";
import TaskIcon from "../assets/Task Iocn.svg";

// Responsive sizing
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 32; // dynamic width
const ICON_SIZE = Math.min(SCREEN_WIDTH * 0.08, 36);
const FONT_SIZE = Math.min(SCREEN_WIDTH * 0.045, 18);
const HEADER_PADDING = Math.max(SCREEN_WIDTH * 0.04, 12);

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* ✅ Background Image for Header */}
      <ImageBackground
        source={require("../assets/Union.png")}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* Header */}
        <View style={[styles.header, { paddingHorizontal: HEADER_PADDING }]}>
          <View style={styles.logoContainer}>
            <LogoIcon width={ICON_SIZE} height={ICON_SIZE} />
            <Text style={[styles.logoText, { fontSize: FONT_SIZE }]}>ELS</Text>
          </View>

          <CartIcon />
        </View>
      </ImageBackground>

      {/* ✅ Body */}
      <View style={styles.content}>
        {/* Daily Task */}
        <View style={styles.taskSection}>
          <View style={styles.taskHeader}>
            <TaskIcon />
            <Text style={styles.taskLabel}>Daily Task</Text>
          </View>

          <LinearGradient
            colors={["#0d1117", "#1D2933", "#0d1117"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.taskCard, styles.dailyTaskCard]}
          >
            <View style={styles.taskContent}>
              <StepsIcon width={24} height={24} />
              <Text style={styles.taskNumber}>6076</Text>
              <Text style={styles.taskSubtext}>10,000 Steps</Text>
              <TouchableOpacity style={styles.arrowButton}>
                <NextArrow width={16} height={16} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Weekly Task */}
        <View style={styles.taskSection}>
          <View style={styles.taskHeader}>
            <TaskIcon />
            <Text style={styles.taskLabel}>Weekly Task</Text>
          </View>

          <LinearGradient
            colors={["#0d1117", "#1D2933", "#0d1117"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.taskCard, styles.weeklyTaskCard]}
          >
            <View style={styles.taskContent}>
              <SkillIcon width={24} height={24} />
              <Text style={styles.taskNumberPurple}>0</Text>
              <Text style={styles.taskSubtextPurple}>1 course to complete</Text>
              <TouchableOpacity style={styles.arrowButton}>
                <NextArrow width={16} height={16} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12151d",
  },
  // ✅ Header
  bg: {
    width: "100%",
    position: "absolute",
    top: 0,
    height: 120,
  },
  header: {
    position: "absolute",
    top: 18,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  logoText: {
    fontFamily: "Roboto",
    fontWeight: "700",
    color: "white",
  },

  // ✅ Content
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 100,
    gap: 40,
  },
  taskSection: {
    gap: 10,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  taskLabel: {
    fontWeight: "500",
    fontSize: 16,
    color: "white",
    letterSpacing: 0.2,
  },
  taskCard: {
    width: CARD_WIDTH,
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    opacity: 1,
  },
  dailyTaskCard: {
    borderWidth: 1,
    borderColor: "#AFEC8D",
  },
  weeklyTaskCard: {
    borderWidth: 1,
    borderColor: "#7267D4",
  },
  taskContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  taskNumber: {
    fontFamily: "Roboto",
    fontWeight: "900",
    fontSize: 18,
    color: "#CDF533",
  },
  taskNumberPurple: {
    fontFamily: "Roboto",
    fontWeight: "900",
    fontSize: 18,
    color: "#9A91EE",
  },
  taskSubtext: {
    fontFamily: "Roboto",
    fontWeight: "600",
    fontSize: 12,
    color: "rgba(205, 245, 51, 0.6)",
    marginLeft: 8,
  },
  taskSubtextPurple: {
    fontFamily: "Roboto",
    fontWeight: "600",
    fontSize: 12,
    color: "rgba(154, 145, 238, 0.6)",
    marginLeft: 8,
  },
  arrowButton: {
    marginLeft: "auto",
  },
});
