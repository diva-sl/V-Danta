// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import React from "react";
// import {
//   Dimensions,
//   Image,
//   ImageBackground,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// // ✅ Import assets
// import NextArrow from "../assets/Next Arrow.svg";
// import SkillIcon from "../assets/Skill_Icon.svg";
// import StepsIcon from "../assets/Steps_Icon.svg";
// import TaskIcon from "../assets/Task Iocn.svg";

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
// const CARD_WIDTH = SCREEN_WIDTH - 32;

// const HomeScreen = () => {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       {/* 🌌 Background Image */}
//       <ImageBackground
//         source={require("../assets/Union.png")}
//         style={styles.background}
//         resizeMode="cover"
//       >
//         {/* 🔝 Header */}
//         <View style={styles.header}>
//           <Image source={require("../assets/logo.png")} style={styles.logo} />
//           <Image
//             source={require("../assets/cart.png")}
//             style={styles.cartIcon}
//           />
//         </View>

//         {/* 🧩 Main Content */}
//         <View style={styles.content}>
//           {/* 📅 Daily Task */}
//           <View style={styles.taskBlock}>
//             <View style={styles.taskHeader}>
//               <TaskIcon width={20} height={20} />
//               <Text style={styles.taskLabel}>Daily Task</Text>
//             </View>

//             <LinearGradient
//               colors={["#0d1117", "#1D2933", "#0d1117"]}
//               start={{ x: 0, y: 0.5 }}
//               end={{ x: 1, y: 0.5 }}
//               style={[styles.taskCard, styles.dailyCard]}
//             >
//               <TouchableOpacity
//                 style={styles.taskContent}
//                 onPress={() => router.push("/dailyTask")}
//               >
//                 <StepsIcon width={24} height={24} />
//                 <Text style={styles.stepsValue}>6076</Text>
//                 <Text style={styles.stepsSubtext}>10,000 Steps</Text>
//                 <NextArrow width={16} height={16} style={styles.arrow} />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>

//           {/* 📘 Weekly Task */}
//           <View style={styles.taskBlock}>
//             <View style={styles.taskHeader}>
//               <TaskIcon width={20} height={20} />
//               <Text style={styles.taskLabel}>Weekly Task</Text>
//             </View>

//             <LinearGradient
//               colors={["#0d1117", "#1D2933", "#0d1117"]}
//               start={{ x: 0, y: 0.5 }}
//               end={{ x: 1, y: 0.5 }}
//               style={[styles.taskCard, styles.weeklyCard]}
//             >
//               <TouchableOpacity
//                 style={styles.taskContent}
//                 onPress={() => router.push("/weeklyTask")}
//               >
//                 <SkillIcon width={24} height={24} />
//                 <Text style={styles.courseValue}>0</Text>
//                 <Text style={styles.courseSubtext}>1 course to complete</Text>
//                 <NextArrow width={16} height={16} style={styles.arrow} />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0d1117",
//   },
//   background: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     // 👇 Moves background image slightly upward for better framing
//     marginTop: -SCREEN_HEIGHT * 0.05,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: SCREEN_HEIGHT * 0.06,
//     paddingHorizontal: SCREEN_WIDTH * 0.05,
//   },
//   // ✅ Responsive logo
//   logo: {
//     width: SCREEN_WIDTH * 0.12, // scales with screen width
//     height: SCREEN_WIDTH * 0.12,
//     resizeMode: "contain",
//   },
//   // ✅ Responsive cart
//   cartIcon: {
//     width: SCREEN_WIDTH * 0.12,
//     height: SCREEN_WIDTH * 0.12,
//     resizeMode: "contain",
//     tintColor: "#AFFF91",
//   },
//   content: {
//     paddingHorizontal: 16,
//     marginTop: 40,
//     gap: 30,
//   },
//   taskBlock: {
//     gap: 10,
//   },
//   taskHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   taskLabel: {
//     fontSize: 16,
//     color: "#FFFFFF",
//     marginLeft: 8,
//   },
//   taskCard: {
//     width: CARD_WIDTH,
//     minHeight: 60,
//     borderRadius: 12,
//     justifyContent: "center",
//     paddingHorizontal: 18,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 6,
//   },
//   dailyCard: {
//     borderBottomColor: "#AFFF91",
//     borderBottomWidth: 1,
//     elevation: 3, // for Android shadow
//   },
//   weeklyCard: {
//     borderBottomColor: "#7267D4",
//     borderBottomWidth: 1,
//     elevation: 3, // for Android shadow
//   },
//   taskContent: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   stepsValue: {
//     color: "#CFFF4D",
//     fontSize: 24,
//     fontWeight: "900",
//     marginLeft: 10,
//   },
//   stepsSubtext: {
//     color: "rgba(205, 245, 51, 0.7)",
//     fontSize: 12,
//     marginLeft: 15,
//     fontWeight: "600",
//   },
//   courseValue: {
//     color: "#9A91EE",
//     fontSize: 24,
//     fontWeight: "900",
//     marginLeft: 10,
//   },
//   courseSubtext: {
//     color: "rgba(154, 145, 238, 0.7)",
//     fontSize: 12,
//     marginLeft: 15,
//     fontWeight: "600",
//   },
//   arrow: {
//     marginLeft: "auto",
//   },
// });
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 32;

const HomeScreen = () => {
  const router = useRouter();
  function onCartPress() {
    // Try this path first — adjust if your file route differs:
    router.push("/(tabs)/OrderSummaryScreen");

    // If that didn't work, try one of these variations:
    // router.push("/tabs/OrderSummaryScreen");
    // router.push("/OrderSummaryScreen");
    // router.push("/cart"); // if you exposed it as /cart
  }

  return (
    <View style={styles.container}>
      {/* 🌌 Background */}
      <ImageBackground
        source={require("../assets/Home Page Graphic.png")}
        style={styles.background}
        resizeMode="cover"
      >
        {/* 🔝 Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/Logo.png")} style={styles.logo} />
            <Text style={styles.brandName}>ELS</Text>
          </View>
          {/* 
          <Image
            source={require("../assets/Cart.png")}
            style={styles.cartIcon}
          /> */}
          <TouchableOpacity onPress={onCartPress} activeOpacity={0.75}>
            <Image
              source={require("../assets/Cart.png")}
              style={styles.cartIcon}
            />
          </TouchableOpacity>
        </View>

        {/* 🧩 Main Content */}
        <View style={styles.content}>
          {/* 📅 Daily Task */}
          <View style={styles.taskBlock}>
            <View style={styles.taskHeader}>
              <Image
                source={require("../assets/Task Iocn.png")}
                style={styles.taskIcon}
                resizeMode="contain"
              />
              <Text style={styles.taskLabel}>Daily Task</Text>
            </View>

            <LinearGradient
              colors={["#0D1117", "#1D2933", "#0D1117"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.taskCard, styles.dailyCard]}
            >
              <TouchableOpacity
                style={styles.taskContent}
                onPress={() => router.push("/dailyTask")}
              >
                <Image
                  source={require("../assets/Steps_Icon.png")}
                  style={styles.iconSmall}
                  resizeMode="contain"
                />
                <Text style={styles.stepsValue}>6076</Text>
                <Text style={styles.stepsSubtext}>10,000 Steps</Text>
                <Image
                  source={require("../assets/Next Arrow.png")}
                  style={styles.arrowIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* 📘 Weekly Task */}
          <View style={styles.taskBlock}>
            <View style={styles.taskHeader}>
              <Image
                source={require("../assets/Task Iocn.png")}
                style={styles.taskIcon}
                resizeMode="contain"
              />
              <Text style={styles.taskLabel}>Weekly Task</Text>
            </View>

            <LinearGradient
              colors={["#0D1117", "#1D2933", "#0D1117"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.taskCard, styles.weeklyCard]}
            >
              <TouchableOpacity
                style={styles.taskContent}
                onPress={() => router.push("/weeklyTask")}
              >
                <Image
                  source={require("../assets/Skill_Icon.png")}
                  style={styles.iconSmall}
                  resizeMode="contain"
                />
                <Text style={styles.courseValue}>0</Text>
                <Text style={styles.courseSubtext}>1 course to complete</Text>
                <Image
                  source={require("../assets/Next Arrow.png")}
                  style={styles.arrowIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1117",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: -SCREEN_HEIGHT * 0.05,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SCREEN_HEIGHT * 0.06,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: SCREEN_WIDTH * 0.12,
    height: SCREEN_WIDTH * 0.12,
    resizeMode: "contain",
  },
  brandName: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    marginLeft: 8,
  },
  cartIcon: {
    width: SCREEN_WIDTH * 0.12,
    height: SCREEN_WIDTH * 0.12,
    resizeMode: "contain",
    tintColor: "#AFFF91",
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 40,
    gap: 30,
  },
  taskBlock: {
    gap: 10,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskIcon: {
    width: 20,
    height: 20,
  },
  taskLabel: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 8,
    fontWeight: "600",
  },
  taskCard: {
    width: CARD_WIDTH,
    minHeight: 70,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  dailyCard: {
    borderBottomColor: "#AFFF91",
    borderBottomWidth: 1,
    elevation: 3,
  },
  weeklyCard: {
    borderBottomColor: "#7267D4",
    borderBottomWidth: 1,
    elevation: 3,
  },
  taskContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSmall: {
    width: 24,
    height: 24,
  },
  stepsValue: {
    color: "#CFFF4D",
    fontSize: 24,
    fontWeight: "900",
    marginLeft: 10,
  },
  stepsSubtext: {
    color: "rgba(205, 245, 51, 0.7)",
    fontSize: 12,
    marginLeft: 15,
    fontWeight: "600",
  },
  courseValue: {
    color: "#9A91EE",
    fontSize: 24,
    fontWeight: "900",
    marginLeft: 10,
  },
  courseSubtext: {
    color: "rgba(154, 145, 238, 0.7)",
    fontSize: 12,
    marginLeft: 15,
    fontWeight: "600",
  },
  arrowIcon: {
    width: 16,
    height: 16,
    marginLeft: "auto",
  },
});
