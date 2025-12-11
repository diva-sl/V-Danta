// ProfileScreen.tsx
import { ImageBackground } from "expo-image";
import React, { JSX } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/* ======= Update these imports to match where you store images ======= */
const assets = {
  avatar: require("../../assets/profile.png"),
  logo: require("../../assets/Logo.png"),
  badge: require("../../assets/badge.png"),
  nextArrow: require("../../assets/Next Arrow.png"),
  iconSelflearning: require("../../assets/Self Learning.png"),
  iconPersonal: require("../../assets/Personal Details.png"),
  iconNomination: require("../../assets/Nomination Details.png"),
  iconOrder: require("../../assets/Order Summary.png"),
  iconSettings: require("../../assets/Settings.png"),
  iconNotifications: require("../../assets/Notifications.png"),
  iconPrivacy: require("../../assets/Privacy and Security.png"),
  iconLegal: require("../../assets/Legal Document.png"),
  iconFaq: require("../../assets/FAQ.png"),
  iconLogout: require("../../assets/Logout.png"),
  iconCloseAccount: require("../../assets/Close Account.png"),
};
/* ==================================================================== */

export default function ProfileScreen(): JSX.Element {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarGroupWrapper}>
          <Image
            source={assets.logo}
            style={styles.avatarCluster}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </View>

      {/* Profile card */}
      <View style={styles.profileCardWrapper}>
        {/* <View style={styles.profileCard}> */}
        <ImageBackground
          source={require("../../assets/bg2.png")}
          style={styles.profileCard} // fills parent
          imageStyle={styles.cardBgImage} // controls image render (cover + rounded corners)
        >
          <View style={styles.leftColumn}>
            <View style={styles.avatarWhiteCircle}>
              {/* <View style={styles.profileCardLeft}> */}
              {/* <View style={styles.avatarPlaceholder}> */}
              <Image
                source={assets.avatar}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.uploadText}>Upload</Text>
          </View>
          {/* Right column: name/level/badge, account, joined+online */}
          <View style={styles.rightColumn}>
            <View style={styles.rowName}>
              <Text style={styles.nameText}>John Doe</Text>

              <View style={styles.levelPill}>
                <Text style={styles.levelText}>20 Level</Text>
              </View>

              <Image
                source={assets.badge}
                style={styles.badgeImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.rowAccount}>
              <Text style={styles.smallLabel}>Profile A/C :</Text>
              <Text style={styles.accountNumber}>10037425679</Text>
            </View>

            <View style={styles.rowJoined}>
              <Text style={styles.joinedText}>Joined 20 Sept 2025</Text>

              <View style={styles.spacer} />

              <View style={styles.onlineRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>online</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      {/* </View> */}

      {/* Menu list */}
      <View style={styles.menuList}>
        <MenuItem source={assets.iconSelflearning} label="Self Learning" />
        <MenuItem source={assets.iconPersonal} label="Personal Details" />
        <MenuItem source={assets.iconNomination} label="Nomination Details" />
        <MenuItem source={assets.iconOrder} label="Order Summary" />
        <MenuItem source={assets.iconSettings} label="Settings" />
        <MenuItem source={assets.iconNotifications} label="Notifications" />
        <MenuItem source={assets.iconPrivacy} label="Privacy and Security" />
        <MenuItem source={assets.iconLegal} label="Legal Document" />
        <MenuItem source={assets.iconFaq} label="FAQ" />
        <MenuItem source={assets.iconLogout} label="Logout" noArrow={true} />
        <MenuItem
          source={assets.iconCloseAccount}
          label="Close Account"
          noArrow={true}
        />
      </View>
    </ScrollView>
  );
}
function MenuItem({
  source,
  label,
  noArrow,
}: {
  source: any;
  label: string;
  noArrow?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
      <View style={styles.menuIcon}>
        <Image
          source={source}
          style={styles.menuIconImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.menuLabel}>{label}</Text>

      {/* Only show arrow if NOT noArrow */}
      {!noArrow && (
        <View style={styles.menuRight}>
          <Image
            source={assets.nextArrow}
            style={styles.nextArrow}
            resizeMode="contain"
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

/* Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12151d",
  },
  contentContainer: {
    paddingBottom: 140,
  },

  /* Header */
  header: {
    paddingTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarGroupWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCluster: {
    width: 74,
    height: 72,
    marginRight: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  levelPill: {
    backgroundColor: "#12151d",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#1d3211",
    marginLeft: 40,
  },
  levelText: {
    color: "#a6b5a0",
    fontSize: 12,
  },

  /* Profile card */
  profileCardWrapper: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  avatarCircle: {
    position: "absolute",
    left: 22,
    top: 10,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCircleInner: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ffffff08",
    borderWidth: 1,
    borderColor: "#274914",
  },

  profileCard: {
    marginTop: 28,
    backgroundColor: "rgba(29,41,51,0.6)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1d3211",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  /* ImageBackground fills the card */
  cardBg: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },

  /* imageStyle applied to the internal <Image> */
  cardBgImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 14, // keep rounded corners on the image itself
  },

  leftColumn: {
    width: 80,
    alignItems: "center",
  },
  avatarWhiteCircle: {
    width: 62,
    height: 62,
    borderRadius: 36,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 8,
  },
  avatarImage: {
    width: 58,
    height: 58,
    borderRadius: 34,
  },
  uploadText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
  },

  rightColumn: {
    flex: 1,
    paddingLeft: 6,
    justifyContent: "center",
  },
  rowName: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  nameText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 8,
  },

  badgeImage: {
    width: 36,
    height: 36,
  },

  rowAccount: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  smallLabel: {
    marginRight: 6,
    fontSize: 13,
    color: "#fff",
    fontWeight: "400",
  },
  accountNumber: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  rowJoined: {
    flexDirection: "row",
    alignItems: "center",
  },
  joinedText: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
  },
  spacer: {
    flex: 1,
  },

  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2F9908",
    borderColor: "#fff",
    borderWidth: 1,
    marginRight: 6,
  },
  onlineText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
  },
  /* Menu */
  menuList: {
    paddingHorizontal: 8,
    marginTop: 6,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    // no separators as requested
  },
  menuIcon: {
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 2,
  },
  menuIconImage: {
    width: 40,
    height: 40,
  },
  menuLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  menuRight: {
    width: 32,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  nextArrow: {
    width: 24,
    height: 24,
    tintColor: "rgba(255,255,255,0.6)",
  },
});
