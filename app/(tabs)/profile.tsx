// // app/(tabs)/profile.tsx
// import { StyleSheet, Text, View } from "react-native";

// export default function ProfileScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>👤 Profile Screen</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#12151d",
//   },
//   text: {
//     color: "white",
//     fontSize: 20,
//   },
// });
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, {
  Defs,
  G,
  Line,
  Path,
  Stop,
  LinearGradient as SvgLinearGradient,
} from "react-native-svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DESIGN_WIDTH = 320;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;

// SVG Path Data
const svgPaths = {
  p183c8800:
    "M26.3975 122.121C11.7172 109.665 2.4 91.0752 2.4 70.3087C2.4 32.8038 32.7904 2.4 70.2788 2.4C107.767 2.4 138.158 32.8038 138.158 70.3087C138.158 91.0434 128.869 109.608 114.227 122.064",
  p1a403e40:
    "M10.8294 16.6602V9.9959C10.8294 9.77496 10.7417 9.56308 10.5854 9.40686C10.4292 9.25063 10.2173 9.16287 9.99639 9.16287H6.66426C6.44333 9.16287 6.23144 9.25063 6.07522 9.40686C5.919 9.56308 5.83123 9.77496 5.83123 9.9959V16.6602",
  p23e19000:
    "M6.86914 0.240234C10.5296 0.24048 13.4971 3.211 13.4971 6.87598C13.497 10.5409 10.5296 13.5115 6.86914 13.5117C3.20849 13.5117 0.240291 10.5411 0.240234 6.87598C0.240234 3.21085 3.20845 0.240234 6.86914 0.240234Z",
  p26ea3580:
    "M0.833032 2.49911V14.1616C0.833032 14.6034 1.00856 15.0272 1.32101 15.3396C1.63346 15.6521 2.05723 15.8276 2.4991 15.8276H14.9946C15.2155 15.8276 15.4274 15.7399 15.5836 15.5836C15.7398 15.4274 15.8276 15.2155 15.8276 14.9946V11.6625",
  p2a497c00:
    "M0.833032 7.49685C0.832974 7.2545 0.885791 7.01505 0.987799 6.7952C1.08981 6.57536 1.23855 6.38042 1.42365 6.22398L7.25487 1.22662C7.55559 0.972472 7.93659 0.833032 8.33032 0.833032C8.72405 0.833032 9.10505 0.972472 9.40576 1.22662L15.237 6.22398C15.4221 6.38042 15.5708 6.57536 15.6728 6.7952C15.7748 7.01505 15.8277 7.2545 15.8276 7.49685V14.9941C15.8276 15.436 15.6521 15.8598 15.3396 16.1722C15.0272 16.4847 14.6034 16.6602 14.1615 16.6602H2.4991C2.05723 16.6602 1.63346 16.4847 1.32101 16.1722C1.00856 15.8598 0.833032 15.436 0.833032 14.9941V7.49685Z",
  p3126a9a0:
    "M151.289 41.2195C137.192 18.4021 111.969 3.2 83.2 3.2C39.0172 3.2 3.2 39.0547 3.2 83.2837C3.2 107.773 14.181 129.695 31.4828 144.385",
  p32592000:
    "M34.6828 147.585C17.381 132.895 6.4 110.973 6.4 86.4837C6.4 42.2547 42.2172 6.4 86.4 6.4C130.583 6.4 166.4 42.2547 166.4 86.4837C166.4 110.936 155.453 132.828 138.197 147.518",
  p33852100:
    "M6.66426 7.49729C8.50454 7.49729 9.99639 6.00544 9.99639 4.16516C9.99639 2.32488 8.50454 0.833032 6.66426 0.833032C4.82398 0.833032 3.33213 2.32488 3.33213 4.16516C3.33213 6.00544 4.82398 7.49729 6.66426 7.49729Z",
  p3405e100:
    "M2.48719 0.400077C2.79509 -0.133359 3.56502 -0.133359 3.87292 0.400076L6.2497 4.51783C6.62673 5.17103 5.97324 5.93531 5.2694 5.66433L3.4675 4.9706C3.2825 4.89938 3.07764 4.89938 2.89264 4.9706L1.09071 5.66434C0.38687 5.93532 -0.266616 5.17103 0.11041 4.51784L2.48719 0.400077Z",
  p36219480:
    "M31.4828 144.385C14.181 129.695 3.2 107.773 3.2 83.2837C3.2 39.0547 39.0172 3.2 83.2 3.2C127.383 3.2 163.2 39.0547 163.2 83.2837C163.2 107.736 152.253 129.628 134.997 144.318",
  p392d8640:
    "M14.1615 4.16516V1.66606C14.1615 1.44513 14.0738 1.23325 13.9176 1.07702C13.7613 0.920798 13.5494 0.833032 13.3285 0.833032H2.4991C2.05723 0.833032 1.63346 1.00856 1.32101 1.32101C1.00856 1.63346 0.833032 2.05723 0.833032 2.4991C0.833032 2.94096 1.00856 3.36473 1.32101 3.67718C1.63346 3.98963 2.05723 4.16516 2.4991 4.16516H14.9946C15.2155 4.16516 15.4274 4.25293 15.5836 4.40915C15.7398 4.56537 15.8276 4.77726 15.8276 4.99819V8.33032M15.8276 8.33032H13.3285C12.8866 8.33032 12.4629 8.50585 12.1504 8.8183C11.838 9.13075 11.6624 9.55452 11.6624 9.99638C11.6624 10.4383 11.838 10.862 12.1504 11.1745C12.4629 11.4869 12.8866 11.6624 13.3285 11.6624H15.8276C16.0485 11.6624 16.2604 11.5747 16.4167 11.4185C16.5729 11.2622 16.6606 11.0503 16.6606 10.8294V9.16335C16.6606 8.94242 16.5729 8.73053 16.4167 8.57431C16.2604 8.41809 16.0485 8.33032 15.8276 8.33032Z",
  p3dc72100:
    "M12.4955 15.8276V14.1616C12.4955 13.2778 12.1444 12.4303 11.5195 11.8054C10.8946 11.1805 10.0471 10.8294 9.16335 10.8294H4.16516C3.28142 10.8294 2.43388 11.1805 1.80899 11.8054C1.18409 12.4303 0.833032 13.2778 0.833032 14.1616V15.8276",
};

const ArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <G
      style={{
        transform: [{ rotate: direction === "left" ? "45deg" : "225deg" }],
      }}
    >
      <Line
        x1="4.5"
        y1="4.5"
        x2="4.5"
        y2="11.5"
        stroke="white"
        strokeLinecap="round"
      />
      <Line
        x1="11.5"
        y1="11.5"
        x2="4.5"
        y2="11.5"
        stroke="white"
        strokeLinecap="round"
      />
    </G>
  </Svg>
);

const HomeIcon = ({ active }: { active?: boolean }) => (
  <Svg width={16} height={18} viewBox="0 0 17 18" fill="none">
    <Path
      d={svgPaths.p1a403e40}
      stroke="white"
      strokeWidth="1.66606"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={active ? 1 : 0.6}
    />
    <Path
      d={svgPaths.p2a497c00}
      stroke="white"
      strokeWidth="1.66606"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={active ? 1 : 0.6}
    />
  </Svg>
);

const WalletIcon = () => (
  <Svg width={18} height={17} viewBox="0 0 18 17" fill="none">
    <Path
      d={svgPaths.p392d8640}
      stroke="white"
      strokeWidth="1.66606"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.6}
    />
    <Path
      d={svgPaths.p26ea3580}
      stroke="white"
      strokeWidth="1.66606"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.6}
    />
  </Svg>
);

const ProfileIcon = () => (
  <Svg width={14} height={17} viewBox="0 0 14 17" fill="none">
    <Path
      d={svgPaths.p3dc72100}
      stroke="white"
      strokeWidth="1.66606"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.6}
    />
    <Path
      d={svgPaths.p33852100}
      stroke="white"
      strokeWidth="1.66606"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.6}
    />
  </Svg>
);

const CircularProgress = () => (
  <View style={styles.circularChart}>
    <Svg
      width={200}
      height={200}
      viewBox="0 0 200 200"
      style={{ position: "absolute" }}
    >
      <Defs>
        <SvgLinearGradient
          id="progressGradient"
          x1="151.079"
          y1="151.638"
          x2="27.4424"
          y2="149.62"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.00480769" stopColor="#FFFFFD" />
          <Stop offset="0.0769231" stopColor="#CDF533" />
          <Stop offset="0.509615" stopColor="#CDF533" />
          <Stop offset="0.692308" stopColor="#FFD301" />
          <Stop offset="0.915529" stopColor="#CE8D16" />
        </SvgLinearGradient>
      </Defs>
      {/* Outer stroke */}
      <Path
        d={svgPaths.p32592000}
        stroke="#F4F2F0"
        strokeLinecap="round"
        strokeWidth="12.8"
        opacity={0.3}
        transform="translate(17, 27)"
      />
      {/* Mid stroke */}
      <Path
        d={svgPaths.p36219480}
        stroke="#DEDBDC"
        strokeLinecap="round"
        strokeWidth="6.4"
        opacity={0.3}
        transform="translate(20, 30)"
      />
      {/* Inner stroke */}
      <Path
        d={svgPaths.p183c8800}
        stroke="#9F9E9F"
        strokeLinecap="round"
        strokeWidth="4.8"
        opacity={0.3}
        transform="translate(30, 37)"
      />
      {/* Progress gradient */}
      <Path
        d={svgPaths.p3126a9a0}
        stroke="url(#progressGradient)"
        strokeLinecap="round"
        strokeWidth="6.4"
        opacity={0.8}
        transform="translate(23, 33)"
      />
    </Svg>

    {/* Center point indicator */}
    <View style={styles.pointer}>
      <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
        <Path
          d={svgPaths.p23e19000}
          fill="#12151D"
          stroke="#AFEC8D"
          strokeWidth="0.48"
        />
      </Svg>
      <View style={styles.pointerArrow}>
        <Svg width={7} height={6} viewBox="0 0 7 6" fill="none">
          <Path d={svgPaths.p3405e100} fill="#CDF533" />
        </Svg>
      </View>
    </View>

    {/* Labels */}
    <Text style={styles.chartLabel0}>0</Text>
    <Text style={styles.chartLabel2500}>2500</Text>
    <Text style={styles.chartLabel5000}>5000</Text>
    <Text style={styles.chartLabel7500}>7500</Text>
    <Text style={styles.chartLabel10k}>10k</Text>
  </View>
);

export default function HealthTrackerNative() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <ArrowIcon direction="left" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Health Tracker</Text>
          <Text style={styles.headerSubtitle}>Daily Task</Text>
        </View>

        {/* Main Card with Chart */}
        <View style={styles.mainCard}>
          <View style={styles.cardBackground} />
          <View
            style={[
              styles.cardGlass,
              { borderColor: "#1d3211", borderWidth: 1, borderRadius: 16 },
            ]}
          >
            <Text style={styles.todayLabel}>Today</Text>

            <CircularProgress />

            <View style={styles.stepsContainer}>
              <Text style={styles.stepsNumber}>6076</Text>
              <Text style={styles.stepsLabel}>Steps</Text>
            </View>
          </View>
        </View>

        {/* Boost Rewards Section */}
        <Text style={styles.boostTitle}>Boost-up Your Daily Rewards</Text>

        <View style={styles.productsContainer}>
          {/* Product Card 1 */}
          <View style={styles.productCard}>
            <View style={styles.productBackground} />
            <View
              style={[
                styles.productGlass,
                { borderColor: "#1d3211", borderWidth: 1, borderRadius: 16 },
              ]}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
                }}
                style={styles.productImage}
                resizeMode="contain"
              />
              <Text style={styles.productName}>Nike</Text>
              <Text style={styles.productPrice}>₹ 1,999</Text>
            </View>
          </View>

          {/* Product Card 2 */}
          <View style={styles.productCard}>
            <View style={styles.productBackground} />
            <View
              style={[
                styles.productGlass,
                { borderColor: "#1d3211", borderWidth: 1, borderRadius: 16 },
              ]}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1539185441755-769473a23570",
                }}
                style={styles.productImage}
                resizeMode="contain"
              />
              <Text style={styles.productName}>Nike</Text>
              <Text style={styles.productPrice}>₹ 1,999</Text>
            </View>
          </View>
        </View>

        {/* Reports Section */}
        <Text style={styles.reportsTitle}>Reports</Text>

        <View style={styles.reportsCard}>
          <View style={styles.reportsBackground} />
          <View
            style={[
              styles.reportsGlass,
              {
                borderColor: "rgba(181,194,174,0.28)",
                borderWidth: 1,
                borderRadius: 16,
              },
            ]}
          >
            {/* Tab Header */}
            <View style={styles.tabHeader}>
              <View style={styles.tabHeaderInner}>
                <Text style={styles.tabDay}>Day</Text>
                <Text style={styles.tabWeek}>Week</Text>
                <Text style={styles.tabMonth}>Month</Text>
              </View>
            </View>

            {/* Active Tab Indicator */}
            <View style={styles.activeTabIndicator} />

            {/* Date Range */}
            <View style={styles.dateRangeContainer}>
              <TouchableOpacity>
                <ArrowIcon direction="left" />
              </TouchableOpacity>
              <Text style={styles.dateRange}>6 - 12 October</Text>
              <TouchableOpacity>
                <ArrowIcon direction="right" />
              </TouchableOpacity>
            </View>

            {/* Chart Area */}
            <View style={styles.chartContainer}>
              {/* Grid lines */}
              <View style={styles.gridLine} />
              <View style={[styles.gridLine, { top: 45 }]} />

              {/* Y-axis label */}
              <Text style={styles.yAxisLabel}>10 k</Text>

              {/* Bars */}
              <View style={styles.barsContainer}>
                <LinearGradient
                  colors={["rgba(205,245,51,0.8)", "rgba(141,220,100,0.8)"]}
                  style={[styles.bar, { height: 93, left: 0 }]}
                />
                <LinearGradient
                  colors={["rgba(205,245,51,0.8)", "rgba(141,220,100,0.8)"]}
                  style={[styles.bar, { height: 62, left: 38, top: 31 }]}
                />
                <LinearGradient
                  colors={["rgba(205,245,51,0.8)", "rgba(141,220,100,0.8)"]}
                  style={[styles.bar, { height: 93, left: 76 }]}
                />
                <LinearGradient
                  colors={["rgba(205,245,51,0.8)", "rgba(141,220,100,0.8)"]}
                  style={[styles.bar, { height: 93, left: 114 }]}
                />
                <LinearGradient
                  colors={["rgba(205,245,51,0.8)", "rgba(141,220,100,0.8)"]}
                  style={[styles.bar, { height: 31, left: 152, top: 62 }]}
                />
                <LinearGradient
                  colors={["rgba(205,245,51,0.8)", "rgba(141,220,100,0.8)"]}
                  style={[styles.bar, { height: 93, left: 190 }]}
                />
                <LinearGradient
                  colors={["rgba(205,245,51,0.8)", "rgba(141,220,100,0.8)"]}
                  style={[styles.bar, { height: 93, left: 228 }]}
                />
              </View>

              {/* Highlight Popup */}
              <View style={styles.highlightPopup}>
                <Text style={styles.highlightDate}>11- Oct</Text>
                <Text style={styles.highlightSteps}>10k Steps</Text>
                <View style={styles.highlightLine} />
                <View style={styles.highlightDot} />
              </View>

              {/* X-axis */}
              <View style={styles.xAxis}>
                <Svg width={256} height={5} viewBox="0 0 256 5" fill="none">
                  <Line
                    x1="0.5"
                    y1="0.5"
                    x2="255.5"
                    y2="0.500022"
                    stroke="#546265"
                    strokeLinecap="round"
                  />
                  <Line
                    x1="9.5"
                    y1="4.5"
                    x2="9.5"
                    y2="0.5"
                    stroke="#546265"
                    strokeLinecap="round"
                  />
                  <Line
                    x1="47.5"
                    y1="4.5"
                    x2="47.5"
                    y2="0.5"
                    stroke="#546265"
                    strokeLinecap="round"
                  />
                  <Line
                    x1="85.5"
                    y1="4.5"
                    x2="85.5"
                    y2="0.5"
                    stroke="#546265"
                    strokeLinecap="round"
                  />
                  <Line
                    x1="123.5"
                    y1="4.5"
                    x2="123.5"
                    y2="0.5"
                    stroke="#546265"
                    strokeLinecap="round"
                  />
                  <Line
                    x1="161.5"
                    y1="4.5"
                    x2="161.5"
                    y2="0.5"
                    stroke="#546265"
                    strokeLinecap="round"
                  />
                  <Line
                    x1="199.5"
                    y1="4.5"
                    x2="199.5"
                    y2="0.5"
                    stroke="#546265"
                    strokeLinecap="round"
                  />
                  <Line
                    x1="245.5"
                    y1="4.5"
                    x2="245.5"
                    y2="0.5"
                    stroke="#546265"
                    strokeLinecap="round"
                  />
                </Svg>
              </View>

              {/* X-axis labels */}
              <View style={styles.xAxisLabels}>
                <Text style={styles.dayLabel}>Mon</Text>
                <Text style={[styles.dayLabel, { left: 40 }]}>Tue</Text>
                <Text style={[styles.dayLabel, { left: 80 }]}>Wed</Text>
                <Text style={[styles.dayLabel, { left: 120 }]}>Thru</Text>
                <Text style={[styles.dayLabel, { left: 162 }]}>Fri</Text>
                <Text style={[styles.dayLabel, { left: 198 }]}>Sat</Text>
                <Text style={[styles.dayLabel, { left: 238 }]}>Sun</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.bottomNavShadow} />
        <View style={styles.bottomNavContent}>
          <TouchableOpacity style={styles.navItem}>
            <HomeIcon active />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <WalletIcon />
            <Text style={[styles.navText, styles.navTextInactive]}>Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <ProfileIcon />
            <Text style={[styles.navText, styles.navTextInactive]}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12151d",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    paddingHorizontal: 16,
    paddingTop: 30,
    marginBottom: 6,
  },
  headerTitle: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 16,
    color: "white",
  },
  headerSubtitle: {
    fontFamily: "Roboto",
    fontWeight: "600",
    fontSize: 10,
    lineHeight: 16,
    color: "rgba(255,255,255,0.7)",
  },
  mainCard: {
    marginHorizontal: 16,
    marginTop: 10,
    height: 242,
    borderRadius: 16,
    position: "relative",
  },
  cardBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backgroundColor: "rgba(29,41,51,0.6)",
    opacity: 0.6,
  },
  cardGlass: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backgroundColor: "rgba(29,41,51,0.6)",
  },
  todayLabel: {
    position: "absolute",
    top: 16,
    left: 16,
    fontFamily: "Roboto",
    fontWeight: "900",
    fontSize: 12,
    lineHeight: 26,
    color: "white",
    letterSpacing: 0.0703,
  },
  circularChart: {
    position: "absolute",
    top: 20,
    left: 44,
    width: 200,
    height: 200,
  },
  pointer: {
    position: "absolute",
    top: 30,
    left: 148,
    width: 14,
    height: 14,
  },
  pointerArrow: {
    position: "absolute",
    top: 2,
    left: 3,
    transform: [{ rotate: "142deg" }],
  },
  chartLabel0: {
    position: "absolute",
    top: 132,
    left: 47,
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 9.6,
    lineHeight: 12.8,
    color: "white",
  },
  chartLabel2500: {
    position: "absolute",
    top: 70,
    left: 32,
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 9.6,
    lineHeight: 12.8,
    color: "white",
  },
  chartLabel5000: {
    position: "absolute",
    top: 17,
    left: 86,
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 9.6,
    lineHeight: 12.8,
    color: "white",
  },
  chartLabel7500: {
    position: "absolute",
    top: 70,
    left: 148,
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 9.6,
    lineHeight: 12.8,
    color: "white",
  },
  chartLabel10k: {
    position: "absolute",
    top: 132,
    left: 154,
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 9.6,
    lineHeight: 12.8,
    color: "white",
  },
  stepsContainer: {
    position: "absolute",
    top: 175,
    alignSelf: "center",
    alignItems: "center",
  },
  stepsNumber: {
    fontFamily: "Roboto",
    fontWeight: "900",
    fontSize: 32,
    lineHeight: 26,
    color: "#cdf533",
    letterSpacing: 0.0703,
  },
  stepsLabel: {
    fontFamily: "Roboto",
    fontWeight: "900",
    fontSize: 12,
    lineHeight: 26,
    color: "#cdf533",
    letterSpacing: 0.0703,
    marginTop: 4,
  },
  boostTitle: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16,
    color: "white",
    marginLeft: 16,
    marginTop: 30,
    marginBottom: 12,
  },
  productsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
  },
  productCard: {
    width: 140,
    height: 178,
    borderRadius: 16,
    position: "relative",
  },
  productBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backgroundColor: "rgba(29,41,51,0.6)",
  },
  productGlass: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backgroundColor: "rgba(29,41,51,0.6)",
    padding: 10,
  },
  productImage: {
    width: 120,
    height: 90,
    marginBottom: 16,
  },
  productName: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16,
    color: "white",
    marginBottom: 8,
  },
  productPrice: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16,
    color: "white",
  },
  reportsTitle: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16,
    color: "white",
    marginLeft: 16,
    marginTop: 30,
    marginBottom: 12,
  },
  reportsCard: {
    marginHorizontal: 16,
    height: 240,
    borderRadius: 16,
    position: "relative",
  },
  reportsBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backgroundColor: "rgba(29,41,51,0.4)",
  },
  reportsGlass: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    backgroundColor: "rgba(29,41,51,0.6)",
  },
  tabHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 34,
    backgroundColor: "#12151d",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#0c2127",
  },
  tabHeaderInner: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 20,
  },
  tabDay: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 12.8,
    color: "white",
  },
  tabWeek: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 12.8,
    color: "#cdf533",
  },
  tabMonth: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 12.8,
    color: "white",
  },
  activeTabIndicator: {
    position: "absolute",
    top: 32,
    left: "50%",
    marginLeft: -36,
    width: 72,
    height: 2,
    backgroundColor: "#cdf533",
    borderRadius: 8,
  },
  dateRangeContainer: {
    position: "absolute",
    top: 45,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dateRange: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 16,
    color: "white",
  },
  chartContainer: {
    position: "absolute",
    top: 58,
    left: 22,
    width: 256,
    height: 150,
  },
  gridLine: {
    position: "absolute",
    top: 0,
    width: 256,
    height: 1,
    backgroundColor: "#546265",
    opacity: 0.4,
  },
  yAxisLabel: {
    position: "absolute",
    top: -14,
    right: 0,
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 16,
    color: "rgba(255,255,255,0.6)",
  },
  barsContainer: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    height: 93,
    flexDirection: "row",
  },
  bar: {
    position: "absolute",
    bottom: 0,
    width: 16,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  highlightPopup: {
    position: "absolute",
    top: -30,
    left: 180,
    width: 50,
    height: 33,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#00ffe0",
    padding: 4,
  },
  highlightDate: {
    fontFamily: "Roboto",
    fontWeight: "600",
    fontSize: 8,
    lineHeight: 16,
    color: "#4a4a4a",
  },
  highlightSteps: {
    fontFamily: "Roboto",
    fontWeight: "600",
    fontSize: 8,
    lineHeight: 16,
    color: "#575757",
  },
  highlightLine: {
    position: "absolute",
    top: 33,
    left: 24,
    width: 1,
    height: 94,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#00FFE0",
  },
  highlightDot: {
    position: "absolute",
    top: 128,
    left: 21,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#00FFE0",
  },
  xAxis: {
    position: "absolute",
    bottom: 25,
    left: 0,
  },
  xAxisLabels: {
    position: "absolute",
    bottom: 10,
    left: 0,
    width: "100%",
    flexDirection: "row",
  },
  dayLabel: {
    position: "absolute",
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 16,
    color: "white",
    left: 0,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
  },
  bottomNavShadow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  bottomNavContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    paddingTop: 10,
  },
  navItem: {
    alignItems: "center",
    gap: 4,
  },
  navText: {
    fontFamily: "Roboto",
    fontWeight: "300",
    fontSize: 14,
    lineHeight: 16,
    color: "white",
  },
  navTextInactive: {
    opacity: 0.6,
  },
});
