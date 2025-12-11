// // import { LinearGradient } from "expo-linear-gradient";
// // import React from "react";
// // import {
// //   Dimensions,
// //   Image,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from "react-native";
// // import Svg, {
// //   Circle,
// //   Defs,
// //   Stop,
// //   LinearGradient as SvgGradient,
// // } from "react-native-svg";

// // // Responsive scaling
// // const { width: SCREEN_WIDTH } = Dimensions.get("window");
// // const DESIGN_WIDTH = 375;
// // const scale = (size: number) => (SCREEN_WIDTH / DESIGN_WIDTH) * size;

// // export default function DailyTaskScreen() {
// //   return (
// //     <View style={styles.container}>
// //       <ScrollView showsVerticalScrollIndicator={false}>
// //         {/* Header */}
// //         <View style={styles.header}>
// //           <TouchableOpacity>
// //             <Text style={{ color: "white", fontSize: scale(18) }}>←</Text>
// //           </TouchableOpacity>
// //           <Text style={styles.headerTitle}>Health Tracker</Text>
// //           <Text style={styles.headerSubtitle}>Daily Task</Text>
// //         </View>

// //         {/* Today Card with Gauge */}
// //         <View style={styles.todayCard}>
// //           <Text style={styles.todayLabel}>Today</Text>

// //           <View style={styles.gaugeWrapper}>
// //             <Svg width={scale(240)} height={scale(240)} viewBox="0 0 240 240">
// //               <Defs>
// //                 <SvgGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
// //                   <Stop offset="0" stopColor="#FF9B2D" />
// //                   <Stop offset="0.4" stopColor="#CDF533" />
// //                   <Stop offset="0.8" stopColor="#3BD9FF" />
// //                 </SvgGradient>
// //               </Defs>
// //               {/* Background Circle */}
// //               <Circle
// //                 cx="120"
// //                 cy="120"
// //                 r="100"
// //                 stroke="#333"
// //                 strokeWidth="20"
// //                 fill="none"
// //               />
// //               {/* Progress Arc */}
// //               <Circle
// //                 cx="120"
// //                 cy="120"
// //                 r="100"
// //                 stroke="url(#gaugeGradient)"
// //                 strokeWidth="20"
// //                 strokeDasharray={`${2 * Math.PI * 100}`}
// //                 strokeDashoffset={2 * Math.PI * 100 * 0.4} // adjust % completed
// //                 strokeLinecap="round"
// //                 fill="none"
// //                 rotation="-90"
// //                 origin="120,120"
// //               />
// //             </Svg>
// //             {/* Markers */}
// //             <Text style={[styles.gaugeMarker, { left: 20, top: 100 }]}>0</Text>
// //             <Text style={[styles.gaugeMarker, { left: 55, top: 40 }]}>
// //               2500
// //             </Text>
// //             <Text style={[styles.gaugeMarker, { left: 115, top: 10 }]}>
// //               5000
// //             </Text>
// //             <Text style={[styles.gaugeMarker, { right: 55, top: 40 }]}>
// //               7500
// //             </Text>
// //             <Text style={[styles.gaugeMarker, { right: 20, top: 100 }]}>
// //               10k
// //             </Text>
// //           </View>

// //           <Text style={styles.stepsNumber}>6076</Text>
// //           <Text style={styles.stepsLabel}>Steps</Text>
// //         </View>

// //         {/* Rewards Section */}
// //         <Text style={styles.sectionTitle}>Boost-up Your Daily Rewards</Text>
// //         <View style={styles.rewardsRow}>
// //           <View style={styles.rewardCard}>
// //             <Image
// //               source={require("../assets/Card Shoe.svg")}
// //               style={styles.rewardImage}
// //               resizeMode="contain"
// //             />
// //             <Text style={styles.rewardName}>Nike</Text>
// //             <Text style={styles.rewardPrice}>₹ 1,999</Text>
// //           </View>
// //           <View style={styles.rewardCard}>
// //             <Image
// //               source={require("../assets/Card Shoe 1.svg")}
// //               style={styles.rewardImage}
// //               resizeMode="contain"
// //             />
// //             <Text style={styles.rewardName}>Nike</Text>
// //             <Text style={styles.rewardPrice}>₹ 1,999</Text>
// //           </View>
// //         </View>

// //         {/* Reports Section */}
// //         <Text style={styles.sectionTitle}>Reports</Text>
// //         <View style={styles.reportsCard}>
// //           {/* Tabs */}
// //           <View style={styles.tabs}>
// //             <Text style={styles.tab}>Day</Text>
// //             <Text style={[styles.tab, styles.activeTab]}>Week</Text>
// //             <Text style={styles.tab}>Month</Text>
// //           </View>
// //           <View style={styles.dateRow}>
// //             <TouchableOpacity>
// //               <Text style={styles.arrow}>←</Text>
// //             </TouchableOpacity>
// //             <Text style={styles.dateRange}>6 - 12 October</Text>
// //             <TouchableOpacity>
// //               <Text style={styles.arrow}>→</Text>
// //             </TouchableOpacity>
// //           </View>
// //           {/* Bar Chart */}
// //           <View style={styles.barChart}>
// //             {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
// //               (day, idx) => (
// //                 <View key={day} style={styles.barWrapper}>
// //                   <LinearGradient
// //                     colors={["#CDF533", "#8DDC64"]}
// //                     style={[styles.bar, { height: scale(40 + idx * 10) }]}
// //                   />
// //                   <Text style={styles.barLabel}>{day}</Text>
// //                 </View>
// //               )
// //             )}
// //           </View>
// //         </View>

// //         <View style={{ height: 100 }} />
// //       </ScrollView>

// //       {/* Bottom Nav */}
// //       <View style={styles.bottomNav}>
// //         <TouchableOpacity style={styles.navItem}>
// //           <Text style={styles.navIcon}>🏠</Text>
// //           <Text style={styles.navLabelActive}>Home</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={styles.navItem}>
// //           <Text style={styles.navIcon}>💳</Text>
// //           <Text style={styles.navLabel}>Wallet</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={styles.navItem}>
// //           <Text style={styles.navIcon}>👤</Text>
// //           <Text style={styles.navLabel}>Profile</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: "#0d1117" },
// //   header: { flexDirection: "row", alignItems: "center", gap: 10, padding: 16 },
// //   headerTitle: { fontSize: scale(18), fontWeight: "700", color: "white" },
// //   headerSubtitle: {
// //     fontSize: scale(14),
// //     color: "rgba(255,255,255,0.6)",
// //     marginLeft: 6,
// //   },
// //   todayCard: {
// //     margin: 16,
// //     padding: 16,
// //     borderRadius: 16,
// //     backgroundColor: "#1c2530",
// //     alignItems: "center",
// //   },
// //   todayLabel: {
// //     color: "white",
// //     fontSize: scale(16),
// //     marginBottom: 12,
// //     alignSelf: "flex-start",
// //   },
// //   gaugeWrapper: { alignItems: "center", justifyContent: "center" },
// //   gaugeMarker: { position: "absolute", fontSize: scale(12), color: "white" },
// //   stepsNumber: {
// //     fontSize: scale(36),
// //     fontWeight: "800",
// //     color: "#CDF533",
// //     marginTop: -20,
// //   },
// //   stepsLabel: { fontSize: scale(16), fontWeight: "600", color: "#CDF533" },
// //   sectionTitle: {
// //     fontSize: scale(16),
// //     color: "white",
// //     marginHorizontal: 16,
// //     marginTop: 24,
// //   },
// //   rewardsRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-around",
// //     marginTop: 12,
// //   },
// //   rewardCard: {
// //     width: SCREEN_WIDTH * 0.42,
// //     backgroundColor: "#1c2530",
// //     borderRadius: 12,
// //     padding: 12,
// //     alignItems: "center",
// //   },
// //   rewardImage: { width: "100%", height: 100, marginBottom: 12 },
// //   rewardName: { color: "white", fontSize: 14 },
// //   rewardPrice: { color: "#CDF533", fontWeight: "600", marginTop: 4 },
// //   reportsCard: {
// //     margin: 16,
// //     padding: 16,
// //     borderRadius: 16,
// //     backgroundColor: "#1c2530",
// //   },
// //   tabs: {
// //     flexDirection: "row",
// //     justifyContent: "space-around",
// //     marginBottom: 12,
// //   },
// //   tab: { color: "white", fontSize: 14 },
// //   activeTab: { color: "#CDF533", fontWeight: "700" },
// //   dateRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 12,
// //   },
// //   arrow: { color: "white", fontSize: 18 },
// //   dateRange: { color: "white", fontSize: 14 },
// //   barChart: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginTop: 8,
// //   },
// //   barWrapper: { alignItems: "center" },
// //   bar: { width: 18, borderRadius: 6 },
// //   barLabel: { color: "white", fontSize: 12, marginTop: 4 },
// //   bottomNav: {
// //     flexDirection: "row",
// //     justifyContent: "space-around",
// //     alignItems: "center",
// //     backgroundColor: "#1c2530",
// //     paddingVertical: 12,
// //   },
// //   navItem: { alignItems: "center" },
// //   navIcon: { fontSize: 20, color: "white" },
// //   navLabel: { fontSize: 12, color: "rgba(255,255,255,0.6)" },
// //   navLabelActive: { fontSize: 12, color: "white", fontWeight: "700" },
// // });
// import { LinearGradient } from "expo-linear-gradient";
// import React from "react";
// import {
//   Dimensions,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Svg, {
//   Circle,
//   Defs,
//   Stop,
//   LinearGradient as SvgGradient,
// } from "react-native-svg";

// // ✅ SVG imports (now handled as React components)
// import CardShoe1 from "../assets/Card Shoe 1.svg";
// import CardShoe from "../assets/Card Shoe.svg";

// const { width: SCREEN_WIDTH } = Dimensions.get("window");
// const DESIGN_WIDTH = 375;
// const scale = (size: number) => (SCREEN_WIDTH / DESIGN_WIDTH) * size;

// export default function DailyTaskScreen() {
//   return (
//     <View style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* 🔝 Header */}
//         <View style={styles.header}>
//           <TouchableOpacity>
//             <Text style={{ color: "white", fontSize: scale(18) }}>←</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Health Tracker</Text>
//           <Text style={styles.headerSubtitle}>Daily Task</Text>
//         </View>

//         {/* 🧭 Today Card */}
//         <View style={styles.todayCard}>
//           <Text style={styles.todayLabel}>Today</Text>

//           {/* Gauge Circle */}
//           <View style={styles.gaugeWrapper}>
//             <Svg width={scale(240)} height={scale(240)} viewBox="0 0 240 240">
//               <Defs>
//                 <SvgGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
//                   <Stop offset="0" stopColor="#FF9B2D" />
//                   <Stop offset="0.4" stopColor="#CDF533" />
//                   <Stop offset="0.8" stopColor="#3BD9FF" />
//                 </SvgGradient>
//               </Defs>
//               <Circle
//                 cx="120"
//                 cy="120"
//                 r="100"
//                 stroke="#333"
//                 strokeWidth="20"
//                 fill="none"
//               />
//               <Circle
//                 cx="120"
//                 cy="120"
//                 r="100"
//                 stroke="url(#gaugeGradient)"
//                 strokeWidth="20"
//                 strokeDasharray={`${2 * Math.PI * 100}`}
//                 strokeDashoffset={2 * Math.PI * 100 * 0.4}
//                 strokeLinecap="round"
//                 fill="none"
//                 rotation="-90"
//                 origin="120,120"
//               />
//             </Svg>

//             {/* Markers */}
//             <Text style={[styles.gaugeMarker, { left: 20, top: 100 }]}>0</Text>
//             <Text style={[styles.gaugeMarker, { left: 55, top: 40 }]}>
//               2500
//             </Text>
//             <Text style={[styles.gaugeMarker, { left: 115, top: 10 }]}>
//               5000
//             </Text>
//             <Text style={[styles.gaugeMarker, { right: 55, top: 40 }]}>
//               7500
//             </Text>
//             <Text style={[styles.gaugeMarker, { right: 20, top: 100 }]}>
//               10k
//             </Text>
//           </View>

//           {/* Glowing Step Counter */}
//           <View style={styles.stepsWrapper}>
//             <LinearGradient
//               colors={["#CDF53333", "#CDF53322", "#0d1117"]}
//               style={styles.stepsGlow}
//             />
//             <Text style={styles.stepsNumber}>6076</Text>
//             <Text style={styles.stepsLabel}>Steps</Text>
//           </View>

//           {/* Bottom Divider */}
//           <View style={styles.bottomDivider} />
//         </View>

//         {/* 🎁 Rewards Section */}
//         <Text style={styles.sectionTitle}>Boost-up Your Daily Rewards</Text>
//         <View style={styles.rewardsRow}>
//           <View style={styles.rewardCard}>
//             <CardShoe width={scale(120)} height={scale(80)} />
//             <Text style={styles.rewardName}>Nike</Text>
//             <Text style={styles.rewardPrice}>₹ 1,999</Text>
//           </View>

//           <View style={styles.rewardCard}>
//             <CardShoe1 width={scale(120)} height={scale(80)} />
//             <Text style={styles.rewardName}>Nike</Text>
//             <Text style={styles.rewardPrice}>₹ 1,999</Text>
//           </View>
//         </View>

//         {/* 📊 Reports Section */}
//         <Text style={styles.sectionTitle}>Reports</Text>
//         <View style={styles.reportsCard}>
//           <View style={styles.tabs}>
//             <Text style={styles.tab}>Day</Text>
//             <Text style={[styles.tab, styles.activeTab]}>Week</Text>
//             <Text style={styles.tab}>Month</Text>
//           </View>

//           <View style={styles.dateRow}>
//             <TouchableOpacity>
//               <Text style={styles.arrow}>←</Text>
//             </TouchableOpacity>
//             <Text style={styles.dateRange}>6 - 12 October</Text>
//             <TouchableOpacity>
//               <Text style={styles.arrow}>→</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.barChart}>
//             {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
//               (day, idx) => (
//                 <View key={day} style={styles.barWrapper}>
//                   <LinearGradient
//                     colors={["#CDF533", "#8DDC64"]}
//                     style={[styles.bar, { height: scale(40 + idx * 10) }]}
//                   />
//                   <Text style={styles.barLabel}>{day}</Text>
//                 </View>
//               )
//             )}
//           </View>
//         </View>

//         <View style={{ height: 100 }} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#0d1117" },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     padding: 16,
//   },
//   headerTitle: { fontSize: scale(18), fontWeight: "700", color: "white" },
//   headerSubtitle: {
//     fontSize: scale(14),
//     color: "rgba(255,255,255,0.6)",
//     marginLeft: 6,
//   },
//   todayCard: {
//     margin: 16,
//     padding: 16,
//     borderRadius: 16,
//     backgroundColor: "#1c2530",
//     alignItems: "center",
//   },
//   todayLabel: {
//     color: "white",
//     fontSize: scale(16),
//     marginBottom: 12,
//     alignSelf: "flex-start",
//   },
//   gaugeWrapper: { alignItems: "center", justifyContent: "center" },
//   gaugeMarker: { position: "absolute", fontSize: scale(12), color: "white" },
//   stepsWrapper: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: -20,
//   },
//   stepsGlow: {
//     position: "absolute",
//     width: scale(160),
//     height: scale(160),
//     borderRadius: scale(80),
//     opacity: 0.5,
//     shadowColor: "#CDF533",
//     shadowOpacity: 0.8,
//     shadowRadius: 20,
//     shadowOffset: { width: 0, height: 0 },
//   },
//   stepsNumber: {
//     fontSize: scale(36),
//     fontWeight: "800",
//     color: "#CDF533",
//     textShadowColor: "#AFFF91",
//     textShadowRadius: 15,
//   },
//   stepsLabel: { fontSize: scale(16), fontWeight: "600", color: "#CDF533" },
//   bottomDivider: {
//     width: "80%",
//     height: 1,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     marginTop: 16,
//   },
//   sectionTitle: {
//     fontSize: scale(16),
//     color: "white",
//     marginHorizontal: 16,
//     marginTop: 24,
//   },
//   rewardsRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 12,
//   },
//   rewardCard: {
//     width: SCREEN_WIDTH * 0.42,
//     backgroundColor: "#1c2530",
//     borderRadius: 12,
//     padding: 12,
//     alignItems: "center",
//   },
//   rewardName: { color: "white", fontSize: 14 },
//   rewardPrice: { color: "#CDF533", fontWeight: "600", marginTop: 4 },
//   reportsCard: {
//     margin: 16,
//     padding: 16,
//     borderRadius: 16,
//     backgroundColor: "#1c2530",
//   },
//   tabs: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 12,
//   },
//   tab: { color: "white", fontSize: 14 },
//   activeTab: { color: "#CDF533", fontWeight: "700" },
//   dateRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   arrow: { color: "white", fontSize: 18 },
//   dateRange: { color: "white", fontSize: 14 },
//   barChart: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 8,
//   },
//   barWrapper: { alignItems: "center" },
//   bar: { width: 18, borderRadius: 6 },
//   barLabel: { color: "white", fontSize: 12, marginTop: 4 },
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
  Circle,
  Defs,
  Stop,
  LinearGradient as SvgGradient,
} from "react-native-svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DESIGN_WIDTH = 375;
const scale = (size: number) => (SCREEN_WIDTH / DESIGN_WIDTH) * size;

export default function DailyTaskScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔝 Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={{ color: "white", fontSize: scale(18) }}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Health Tracker</Text>
          <Text style={styles.headerSubtitle}>Daily Task</Text>
        </View>

        {/* 🧭 Today Card */}
        <LinearGradient
          colors={["#1D3211", "#06292F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.todayCard}
        >
          <Text style={styles.todayLabel}>Today</Text>

          {/* Gauge Circle */}
          <View style={styles.gaugeWrapper}>
            <Svg width={scale(240)} height={scale(240)} viewBox="0 0 240 240">
              <Defs>
                <SvgGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0" stopColor="#FF9B2D" />
                  <Stop offset="0.4" stopColor="#CDF533" />
                  <Stop offset="0.8" stopColor="#3BD9FF" />
                </SvgGradient>
              </Defs>
              <Circle
                cx="120"
                cy="120"
                r="100"
                stroke="#333"
                strokeWidth="20"
                fill="none"
              />
              <Circle
                cx="120"
                cy="120"
                r="100"
                stroke="url(#gaugeGradient)"
                strokeWidth="20"
                strokeDasharray={`${2 * Math.PI * 100}`}
                strokeDashoffset={2 * Math.PI * 100 * 0.4}
                strokeLinecap="round"
                fill="none"
                rotation="-90"
                origin="120,120"
              />
            </Svg>

            {/* Markers */}
            <Text style={[styles.gaugeMarker, { left: 20, top: 100 }]}>0</Text>
            <Text style={[styles.gaugeMarker, { left: 55, top: 40 }]}>
              2500
            </Text>
            <Text style={[styles.gaugeMarker, { left: 115, top: 10 }]}>
              5000
            </Text>
            <Text style={[styles.gaugeMarker, { right: 55, top: 40 }]}>
              7500
            </Text>
            <Text style={[styles.gaugeMarker, { right: 20, top: 100 }]}>
              10k
            </Text>
          </View>

          {/* Glowing Step Counter */}
          <View style={styles.stepsWrapper}>
            <LinearGradient
              colors={["#CDF53333", "#CDF53322", "#0d1117"]}
              style={styles.stepsGlow}
            />
            <Text style={styles.stepsNumber}>6076</Text>
            <Text style={styles.stepsLabel}>Steps</Text>
          </View>
        </LinearGradient>

        {/* 🎁 Rewards Section */}
        <Text style={styles.sectionTitle}>Boost-up Your Daily Rewards</Text>
        <View style={styles.rewardsRow}>
          <LinearGradient
            colors={["#1D3211", "#06292F"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.rewardCard}
          >
            <Image
              source={require("../assets/CardShoe.png")}
              style={styles.rewardImage}
              resizeMode="contain"
            />
            <Text style={styles.rewardName}>Nike</Text>
            <Text style={styles.rewardPrice}>₹ 1,999</Text>
          </LinearGradient>

          <LinearGradient
            colors={["#1D3211", "#06292F"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.rewardCard}
          >
            <Image
              source={require("../assets/CardShoe1.png")}
              style={styles.rewardImage}
              resizeMode="contain"
            />
            <Text style={styles.rewardName}>Nike</Text>
            <Text style={styles.rewardPrice}>₹ 1,999</Text>
          </LinearGradient>
        </View>

        {/* 📊 Reports Section */}
        <Text style={styles.sectionTitle}>Reports</Text>
        <LinearGradient
          colors={["#1D3211", "#06292F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.reportsCard}
        >
          <View style={styles.tabs}>
            <Text style={styles.tab}>Day</Text>
            <Text style={[styles.tab, styles.activeTab]}>Week</Text>
            <Text style={styles.tab}>Month</Text>
          </View>

          <View style={styles.dateRow}>
            <TouchableOpacity>
              <Text style={styles.arrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.dateRange}>6 - 12 October</Text>
            <TouchableOpacity>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.barChart}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, idx) => (
                <View key={day} style={styles.barWrapper}>
                  <LinearGradient
                    colors={["#CDF533", "#8DDC64"]}
                    style={[styles.bar, { height: scale(40 + idx * 10) }]}
                  />
                  <Text style={styles.barLabel}>{day}</Text>
                </View>
              )
            )}
          </View>
        </LinearGradient>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d1117" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 16,
  },
  headerTitle: { fontSize: scale(18), fontWeight: "700", color: "white" },
  headerSubtitle: {
    fontSize: scale(14),
    color: "rgba(255,255,255,0.6)",
    marginLeft: 6,
  },
  todayCard: {
    margin: 16,
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#F4F2F0",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
  },
  todayLabel: {
    color: "white",
    fontSize: scale(16),
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  gaugeWrapper: { alignItems: "center", justifyContent: "center" },
  gaugeMarker: { position: "absolute", fontSize: scale(12), color: "white" },
  stepsWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
  },
  stepsGlow: {
    position: "absolute",
    width: scale(160),
    height: scale(160),
    borderRadius: scale(80),
    opacity: 0.5,
    shadowColor: "#CDF533",
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  stepsNumber: {
    fontSize: scale(36),
    fontWeight: "800",
    color: "#CDF533",
    textShadowColor: "#AFFF91",
    textShadowRadius: 15,
  },
  stepsLabel: { fontSize: scale(16), fontWeight: "600", color: "#CDF533" },
  sectionTitle: {
    fontSize: scale(16),
    color: "white",
    marginHorizontal: 16,
    marginTop: 24,
  },
  rewardsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  rewardCard: {
    width: SCREEN_WIDTH * 0.42,
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    shadowColor: "#F4F2F0",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  rewardImage: { width: "100%", height: 100, marginBottom: 12 },
  rewardName: { color: "white", fontSize: 14 },
  rewardPrice: { color: "#CDF533", fontWeight: "600", marginTop: 4 },
  reportsCard: {
    margin: 16,
    padding: 16,
    borderRadius: 20,
    shadowColor: "#F4F2F0",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  tab: { color: "white", fontSize: 14 },
  activeTab: { color: "#CDF533", fontWeight: "700" },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  arrow: { color: "white", fontSize: 18 },
  dateRange: { color: "white", fontSize: 14 },
  barChart: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  barWrapper: { alignItems: "center" },
  bar: { width: 18, borderRadius: 6 },
  barLabel: { color: "white", fontSize: 12, marginTop: 4 },
});
