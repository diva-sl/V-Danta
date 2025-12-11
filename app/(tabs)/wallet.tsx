// WalletScreen.tsx
import React, { useMemo, useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  Dimensions,
  Image,
  SafeAreaView,
  SectionList,
  StatusBar,
} from "react-native";

const { width } = Dimensions.get("window");
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/**
 * LOCAL IMAGE: the file you uploaded
 * Path provided: /mnt/data/iPhone SE - 16.png
 *
 * I'm using it via uri so your build system / dev server can map it.
 * If you prefer `require(...)`, change accordingly once you move file to assets.
 */
const BACKGROUND_IMAGE_URI = "/mnt/data/iPhone SE - 16.png";

/* ---------- sample transaction data (you said you'll update dynamically later) ---------- */
type Transaction = {
  id: string;
  title: string;
  subtitle?: string;
  amount: number; // positive = credit, negative = debit
  time: string; // "11:01 AM"
  dateISO: string; // "2025-10-24" used for grouping
  icon?: string; // optional: icon id or uri
};

const SAMPLE_TRANSACTIONS: Transaction[] = [
  // Today
  {
    id: "t1",
    title: "Transfer to Account",
    subtitle: "100457xxxxxxx",
    amount: -10000,
    time: "11:01 AM",
    dateISO: "2025-10-25",
  },
  {
    id: "t2",
    title: "Credited Prize",
    subtitle: "Poll Money",
    amount: 38269.83,
    time: "09:03 AM",
    dateISO: "2025-10-25",
  },
  {
    id: "t3",
    title: "Credited heath tracker",
    amount: 300,
    time: "08:30 AM",
    dateISO: "2025-10-25",
  },
  {
    id: "t4",
    title: "Team Growth Rewards",
    amount: 22569,
    time: "06:45 AM",
    dateISO: "2025-10-25",
  },

  // Yesterday
  {
    id: "t5",
    title: "Purchased battle pass giftpass",
    amount: -10,
    time: "09:30 AM",
    dateISO: "2025-10-24",
  },
  {
    id: "t6",
    title: "Purchased battle pass",
    amount: -10,
    time: "09:03 AM",
    dateISO: "2025-10-24",
  },

  // 23 Oct 2025
  {
    id: "t7",
    title: "Purchased Skill Task",
    amount: -10,
    time: "09:30 AM",
    dateISO: "2025-10-23",
  },
  {
    id: "t8",
    title: "Purchased Booster Kit",
    amount: -1999,
    time: "09:30 AM",
    dateISO: "2025-10-23",
  },

  // older sample entries
  {
    id: "t9",
    title: "Team Growth Rewards",
    amount: 500,
    time: "01:45 PM",
    dateISO: "2025-09-27",
  },
  {
    id: "t10",
    title: "Team Growth Rewards",
    amount: 500,
    time: "11:45 AM",
    dateISO: "2025-09-26",
  },
  {
    id: "t11",
    title: "Team Growth Rewards",
    amount: 500,
    time: "12:45 PM",
    dateISO: "2025-09-25",
  },
  {
    id: "t12",
    title: "Team Growth Rewards",
    amount: 500,
    time: "02:45 PM",
    dateISO: "2025-09-24",
  },
  {
    id: "t13",
    title: "Money Added to wallet",
    amount: 2000,
    time: "02:00 PM",
    dateISO: "2025-09-20",
  },
  {
    id: "t14",
    title: "Credited Bonus Reward",
    amount: 500,
    time: "01:30 PM",
    dateISO: "2025-09-20",
  },
];

/* ---------- helpers ---------- */
const formatAmount = (amt: number) =>
  amt < 0
    ? "₹ " +
      Math.abs(amt).toLocaleString(undefined, { minimumFractionDigits: 2 })
    : "₹ " + amt.toLocaleString(undefined, { minimumFractionDigits: 2 });

const amountColor = (amt: number) =>
  amt < 0 ? styles.amountDebit : styles.amountCredit;
const MONTH_SHORT = [
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

const formatHeader = (dateISO: string) => {
  const dt = new Date(dateISO + "T00:00:00");

  const day = String(dt.getDate()).padStart(2, "0");
  const month = MONTH_SHORT[dt.getMonth()];
  const year = dt.getFullYear();

  return `${day} ${month} ${year}`;
};

const uniqueById = (items: Transaction[]) => {
  const seen = new Set<string>();
  return items.filter((it) => {
    if (seen.has(it.id)) return false;
    seen.add(it.id);
    return true;
  });
};

const groupByDate = (transactions: Transaction[]) => {
  // remove duplicates first
  const clean = uniqueById(transactions);

  // map dateISO -> items in insertion order
  const map = new Map<string, Transaction[]>();
  clean.forEach((t) => {
    const arr = map.get(t.dateISO) ?? [];
    arr.push(t);
    map.set(t.dateISO, arr);
  });

  // convert to SectionList sections and format header
  const sections = Array.from(map.entries()).map(([dateISO, data], index) => ({
    title: formatHeader(dateISO),
    data,
    dateISO,
    index,
  }));
  // sort descending by date
  sections.sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );

  return sections;
};
const FILTER_ICON = require("../../assets/Filter.png");
const PLACEHOLDER_TX = require("../../assets/placeholder.png");
const TRANSFER_ARROW = require("../../assets/TransferArrow.png");

const ICONS: Record<string, any> = {
  "Transfer to Account": require("../../assets/Transfer to Account.png"),
  "Credited Prize": require("../../assets/Credited Prize.png"),
  "Credited heath tracker": require("../../assets/Credited heath.png"),
  "Team Growth Rewards": require("../../assets/Team Growth Rewards.png"),
  "Purchased battle pass giftpass": require("../../assets/Purchased battle.png"),
  "Purchased battle pass": require("../../assets/Purchased battle.png"),
  "Purchased Skill Task": require("../../assets/Purchased battle.png"),
  "Purchased Booster Kit": require("../../assets/Purchased battle.png"),
  "Money Added to wallet": require("../../assets/Money Added to wallet.png"),
  "Credited Bonus Reward": require("../../assets/Credited Bonus Reward.png"),
};
const onShowMorePress = () => {
  // TODO: replace with load-more / navigation logic later
  console.log("Show more pressed — load more transactions");
};

/* ---------- main component ---------- */
export default function WalletScreen() {
  const [visible, setVisible] = useState(true);
  const availableAmount = // compute or pass as prop in your real app
    38269.83 +
    300 +
    22569 +
    500 +
    500 +
    500 +
    500 +
    2000 +
    500 -
    (10000 + 10 + 10 + 10 + 1999);

  // group transactions into sections
  const sections = useMemo(() => groupByDate(SAMPLE_TRANSACTIONS), []);

  // compute available balance from sample data (simple sum)
  const availableBalance = SAMPLE_TRANSACTIONS.reduce(
    (acc, t) => acc + t.amount,
    0
  );
  const iconAnim = useRef(new Animated.Value(0)).current;

  const togglePasswordVisibility = () => {
    Animated.sequence([
      Animated.timing(iconAnim, {
        toValue: 1,
        duration: 140,
        useNativeDriver: true,
      }),
      Animated.timing(iconAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setVisible((v) => !v);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}
        showsVerticalScrollIndicator={false}
      >
        {/* top left logo + title */}
        <View style={styles.headerRow}>
          <View style={styles.logoPlaceholder}>
            {/* Replace with your SVG/logo component */}
            <Image
              source={require("../../assets/Logo.png")}
              style={styles.logoImage}
            />
          </View>
          <Text style={styles.headerTitle}>Wallet</Text>
        </View>

        {/* Balance card */}
        <View style={styles.cardWrap}>
          <ImageBackground
            source={require("../../assets/bg1.png")}
            style={styles.cardBg} // fills parent
            imageStyle={styles.cardBgImage} // controls image render (cover + rounded corners)
          >
            <View style={styles.innerStroke} />

            {/* content */}
            <View style={styles.content}>
              {/* top row: profile/account on left */}
              <View style={styles.topRow}>
                <View style={styles.accountLeft}>
                  <Image
                    source={{ uri: BACKGROUND_IMAGE_URI }}
                    style={styles.smallLogo}
                    resizeMode="cover"
                  />

                  <View
                    style={{
                      marginLeft: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.accountLabel}>
                      Profile Account No :
                    </Text>
                    <Text style={[styles.accountNumber, { marginLeft: 6 }]}>
                      10037425679
                    </Text>
                  </View>
                </View>

                <View style={{ width: 40 }} />
              </View>

              {/* center: Available balance (center aligned) */}
              <View style={styles.centerRow}>
                <View style={styles.balanceCenter}>
                  <Text style={styles.availableLabel}>Available Balance</Text>

                  <View style={styles.amountRow}>
                    <Text style={styles.availableAmount}>
                      {visible
                        ? `₹ ${availableAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}`
                        : "Xxxxx"}
                    </Text>

                    {/* Animated MaterialCommunityIcons Eye */}
                    <TouchableOpacity
                      onPress={togglePasswordVisibility}
                      style={styles.eyeBtn}
                      activeOpacity={0.8}
                    >
                      <Animated.View
                        style={{
                          transform: [
                            {
                              rotate: iconAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ["0deg", "360deg"],
                              }),
                            },
                            {
                              scale: iconAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.15],
                              }),
                            },
                          ],
                        }}
                      >
                        <Icon
                          name={visible ? "eye" : "eye-off"}
                          size={22}
                          color="#ffffff"
                        />
                      </Animated.View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* bottom actions: bank transfer (left) and add money (right) */}
              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.bankTransferBtn}>
                  <Image source={TRANSFER_ARROW} style={styles.bankIcon} />
                  <Text style={styles.bankTransferText}>Bank Transfer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addMoneyBtn}>
                  <Text style={styles.addMoneyText}>Add Money</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* Transaction History heading + statement */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
        </View>
        <View style={styles.statementRow}>
          <ImageBackground
            source={require("../../assets/bg2.png")}
            style={styles.allTxBg}
            imageStyle={styles.allTxBgImage}
          >
            <View style={styles.statementBox}>
              {/* LEFT SIDE → Text */}
              <View style={styles.statementTextGroup}>
                <Text style={styles.statementRange}>20 Sept to 25 Oct</Text>
                <Text style={styles.downloadText}>Download Statement</Text>
              </View>

              {/* RIGHT SIDE → Filter icon */}
              <TouchableOpacity style={styles.filterButtonInside}>
                <Image source={FILTER_ICON} style={styles.filterImage} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        {/* TRANSACTION CARD WRAPPER */}
        <View style={styles.allTxCard}>
          <ImageBackground
            source={require("../../assets/bg2.png")}
            style={styles.allTxBg}
            imageStyle={styles.allTxBgImage}
          >
            {/* SCROLLABLE TRANSACTION LIST */}
            <SectionList
              sections={sections}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              renderSectionHeader={({ section }) => (
                <View style={styles.dateHeader}>
                  {section.index !== 0 && <View style={styles.separator} />}
                  <Text style={styles.dateHeaderText}>{section.title}</Text>
                </View>
              )}
              renderItem={({ item }) => {
                const imgSource = ICONS[item.title] ?? PLACEHOLDER_TX;

                return (
                  <View style={styles.transactionRow}>
                    <View style={styles.txIcon}>
                      <Image source={imgSource} style={styles.txImage} />
                    </View>

                    <View style={styles.txMeta}>
                      <Text style={styles.txTitle}>{item.title}</Text>
                      {item.subtitle && (
                        <Text style={styles.txSubtitle}>{item.subtitle}</Text>
                      )}
                    </View>

                    <View style={styles.txRight}>
                      <Text style={[styles.txAmount, amountColor(item.amount)]}>
                        {formatAmount(item.amount)}
                      </Text>
                      <Text style={styles.txTime}>{item.time}</Text>
                    </View>
                  </View>
                );
              }}
              // ListFooterComponent={() => (
              //   <View style={styles.showMoreWrapper}>
              //     <TouchableOpacity style={styles.showMoreBtn}>
              //       <Text style={styles.showMoreText}>Show More...</Text>
              //     </TouchableOpacity>
              //   </View>
              // )}
              contentContainerStyle={styles.allTxContent}
            />
          </ImageBackground>

          {/* BORDER AROUND CARD (NOT BLOCKING SCROLL) */}
          <View pointerEvents="none" style={styles.allTxBorder} />
        </View>
        {/* SHOW MORE — separate from card but visually linked */}
        <View style={styles.showMoreWrapper}>
          <TouchableOpacity
            style={styles.showMoreBtn}
            onPress={onShowMorePress}
          >
            <Text style={styles.showMoreText}>Show More...</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0d1113", // dark background like the image
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#0d1113",
  },
  containerContent: {
    paddingBottom: 40, // space for bottom nav or last items
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  logoPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 10,
  },
  logoImage: {
    width: SCREEN_WIDTH * 0.12,
    height: SCREEN_WIDTH * 0.12,
    resizeMode: "contain",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  cardWrap: {
    marginTop: 10,
    height: 180,
    width: "100%",
    borderRadius: 14,
    overflow: "hidden", // CRITICAL: ensures child Image respects rounded corners
    alignSelf: "center",
    backgroundColor: "transparent",
    position: "relative",
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
  innerStroke: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 14,
    borderWidth: 1,
    // keep stroke inside and subtle as requested
    borderColor: "rgba(29,50,17,0.22)",
    zIndex: 1,
  },
  content: {
    zIndex: 2,
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accountLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    opacity: 0.9,
  },
  accountLabel: {
    color: "#b7c9ab",
    fontSize: 11,
  },
  accountNumber: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  centerRow: {
    alignItems: "center",
    justifyContent: "center",
  },
  balanceCenter: {
    alignItems: "center",
  },
  availableLabel: {
    color: "#b7c9ab",
    fontSize: 12,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  availableAmount: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginRight: 6,
    textAlign: "center",
  },
  eyeBtn: {
    padding: 6,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  eyeText: {
    color: "#fff",
    fontSize: 16,
  },

  actionsRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bankTransferBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  bankIcon: {
    width: 14,
    height: 14,
    marginRight: 8,
    resizeMode: "contain",
    tintColor: "#e7c140", // optional colour
  },

  bankTransferText: {
    color: "#e7c140",
    fontWeight: "600",
  },

  addMoneyBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#e7c140",
  },
  addMoneyText: {
    color: "#12151d",
    fontWeight: "700",
  },

  balanceCardBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1D2933",
    zIndex: 1,
  },
  allTxCard: {
    width: "100%",
    flex: 1,
    marginTop: 16,
    borderRadius: 16,
    overflow: "hidden", // VERY IMPORTANT
    position: "relative",
    alignSelf: "center",
  },

  allTxBg: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "flex-start",
  },

  allTxBgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // cover avoids stretching
    alignSelf: "center", // center the focal point horizontally
    borderRadius: 16,
  },
  allTxTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.28)",
    zIndex: 1,
  },
  allTxBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(231,193,64,0.20)",
  },

  allTxContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom: 10, // space for show more + bottom nav
    zIndex: 2,
  },

  balanceCardContent: {
    padding: 16,
    zIndex: 2,
    flex: 1,
    justifyContent: "space-between",
  },

  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  availableWrapper: {},
  availableLabels: {},

  /* transaction header */
  sectionHeader: {
    marginTop: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  statementRow: {
    marginTop: 14,
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },

  statementBg: {
    width: "100%",
    padding: 12,
  },

  statementBgImage: {
    resizeMode: "cover",
    borderRadius: 12,
  },

  statementBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(231,193,64,0.25)", // golden tint same as card
  },

  statementBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statementTextGroup: {
    flex: 1,
  },

  statementRange: {
    color: "#ffffffb0",
    fontSize: 13,
  },

  downloadText: {
    color: "#e7c140",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },

  filterButtonInside: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(231,193,64,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 14,
    borderWidth: 1,
    borderColor: "rgba(231,193,64,0.20)",
  },

  filterImage: {
    width: 26,
    height: 26,
    resizeMode: "contain",
    tintColor: "#e7c140",
  },

  /* section list / transactions */
  sectionListContent: {
    paddingVertical: 12,
    paddingBottom: 90, // leave space for bottom nav
  },

  dateHeader: {
    paddingTop: 18,
    paddingBottom: 6,
  },
  dateHeaderText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  transactionRow: {
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
  },
  txIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    overflow: "hidden", // ensures circular clipping
  },
  txImage: {
    width: 22,
    height: 22,
    resizeMode: "cover",
  },

  txIconText: {
    fontWeight: "700",
    color: "#B30038",
  },
  txMeta: {
    flex: 1,
  },
  txTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  txSubtitle: {
    color: "#ffffffb3",
    fontSize: 12,
    marginTop: 4,
  },
  txRight: {
    width: 110,
    alignItems: "flex-end",
  },
  txAmount: {
    fontSize: 14,
    fontWeight: "700",
  },
  txTime: {
    color: "#fff",
    fontSize: 10,
    marginTop: 6,
  },

  amountDebit: {
    color: "#f1618f",
  },
  amountCredit: {
    color: "#cdf533",
  },

  separator: {
    borderBottomWidth: 2,
    borderStyle: "dashed",
    borderColor: "#546265",
    width: "100%",
    alignSelf: "center",
    marginBottom: 12,
  },

  showMoreWrapper: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  showMoreBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e7c140",
    backgroundColor: "rgba(97, 78, 17, 0.06)",
  },
  showMoreText: {
    color: "#fff",
    fontWeight: "700",
  },

  /* bottom nav imitation */
  bottomNav: {
    position: "absolute",
    bottom: 12,
    left: 16,
    right: 16,
    height: 72,
    borderRadius: 18,
    backgroundColor: "#0d1113",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#1d2b2f",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "#9aa0a3",
  },
  navActive: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#122421",
  },
  navActiveText: {
    color: "#cdf533",
    fontWeight: "700",
  },
});
