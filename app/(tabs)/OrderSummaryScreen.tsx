// OrderSummaryScreen.tsx
import { LinearGradient } from "expo-linear-gradient";
import React, { JSX, useState } from "react";
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

const assets = {
  PreviousIcon: require("../../assets/Previous Arrow.png"),
  productImage: require("../../assets/CardShoe.png"),
  DeleteIcon: require("../../assets/Delete Cart.png"),
  dropdownIcon: require("../../assets/dropdown.png"),
  badge: require("../../assets/badge.png"),
  nextArrow: require("../../assets/Next Arrow.png"),
  Phonepe: require("../../assets/phonepe.png"),
};

export default function OrderSummaryScreen(): JSX.Element {
  const paymentOptions = [
    { id: "phonepe", label: "PhonePe UPI", icon: assets.Phonepe },
    {
      id: "gpay",
      label: "Google Pay",
      icon: require("../../assets/placeholder.png"),
    },
    {
      id: "amazon",
      label: "Amazon Pay",
      icon: require("../../assets/placeholder.png"),
    },
    { id: "upi", label: "UPI", icon: require("../../assets/placeholder.png") },
    {
      id: "credit",
      label: "Credit Card",
      icon: require("../../assets/placeholder.png"),
    },
    {
      id: "debit",
      label: "Debit Card",
      icon: require("../../assets/placeholder.png"),
    },
  ];

  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0]);
  const [payOpen, setPayOpen] = useState(false);
  const [addrOpen, setAddrOpen] = useState(false);
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Image
            source={assets.PreviousIcon}
            style={styles.headerIcon}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Cart</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Order Summary</Text>
      <View style={styles.separator} />

      {/* Product row */}
      <View style={styles.productRow}>
        <Image
          source={assets.productImage}
          style={styles.productImage}
          resizeMode="cover"
        />

        {/* Right column with details */}
        <View style={styles.productDetails}>
          <View style={styles.titleRow}>
            <Text style={styles.brandText}>Nike</Text>

            <View style={styles.titleRight}>
              <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.7}>
                <Image
                  source={assets.DeleteIcon}
                  style={styles.deleteIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Qty & Size row */}
          <View style={styles.controlsRow}>
            <View style={styles.control}>
              <Text style={styles.controlText}>Qty 1</Text>
              <TouchableOpacity style={styles.chevWrapper}>
                <Image
                  source={assets.dropdownIcon}
                  style={styles.chev}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.control}>
              <Text style={styles.controlText}>Size: 42</Text>
              <TouchableOpacity style={styles.chevWrapper}>
                <Image
                  source={assets.dropdownIcon}
                  style={styles.chev}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Delivery & Price */}
          <View style={styles.deliveryPriceRow}>
            <Text style={styles.deliveryText}>Deliver In 7 Days</Text>
            <Text style={styles.priceText}>₹ 1,999</Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.dashedDivider} />

      {/* Bill Details block */}
      <View style={styles.billBlock}>
        <View style={styles.billHeader}>
          <Text style={styles.billTitle}>Bill Details</Text>
          <TouchableOpacity style={styles.chevBtn} activeOpacity={0.7}>
            <Image
              source={assets.dropdownIcon}
              style={styles.chevSmall}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Example bill rows (uncomment / adapt as needed) */}
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Item total</Text>
          <Text style={styles.billValue}>₹ 1,999</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Delivery</Text>
          <Text style={styles.billValue}>₹ 0</Text>
        </View>
        <View style={[styles.billRow, styles.billRowBold]}>
          <Text style={styles.billLabel}>Total</Text>
          <Text style={styles.billValue}>₹ 1,999</Text>
        </View>
      </View>

      {/* Billing details container */}
      <View style={styles.billingDetailsContainer}>
        {/* Delivery title row: icon + title + dropdown */}
        <View style={styles.deliveryTitleRow}>
          <Image
            source={require("../../assets/Delivery address.png")}
            style={styles.deliveryIcon}
            resizeMode="contain"
          />

          <Text style={styles.deliveryTitle}>Delivery address</Text>

          <TouchableOpacity
            style={styles.titleDropdownTouch}
            activeOpacity={0.75}
            onPress={() => setAddrOpen((v) => !v)}
          >
            <Image
              source={assets.dropdownIcon}
              style={[
                styles.titleDropdownIcon,
                addrOpen && styles.dropdownOpen,
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Address summary / details (toggle) */}

        {addrOpen && (
          <View style={styles.addressContainer}>
            <Text
              numberOfLines={addrOpen ? undefined : 2}
              style={styles.addressText}
            >
              John Doe H/no 23-256 1st cross 24th Main HSR Layout Sector 1
              Bangalore Karnataka 560045
            </Text>

            <View style={styles.addressDetails}>
              <Text style={styles.addressDetailLine}>Receiver: John Doe</Text>
              <Text style={styles.addressDetailLine}>
                Phone: +91 98765 43210
              </Text>
              <Text style={styles.addressDetailLine}>
                Landmark: Opposite Central Park
              </Text>
              {/* add more fields as required */}
            </View>
          </View>
        )}

        {/* Pay area inside the same card */}
        {/* Pay area inside the same card */}
        <View style={styles.payRow}>
          <View style={styles.payLeft}>
            {/* Payment Icon Box */}
            <View style={styles.paymentIconBox}>
              <Image
                source={selectedPayment.icon}
                style={styles.paymentIcon}
                resizeMode="contain"
              />
            </View>

            {/* Text + Dropdown */}
            <View style={styles.payTextBlock}>
              <View style={styles.payTitleRow}>
                <Text style={styles.payingViaLabel}>PAYING VIA</Text>

                <TouchableOpacity
                  style={styles.payDropdownTouch}
                  activeOpacity={0.75}
                  onPress={() => setPayOpen((v) => !v)}
                >
                  <Image
                    source={assets.dropdownIcon}
                    style={[
                      styles.payDropdownIcon,
                      payOpen && styles.dropdownOpen,
                    ]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.payMethod}>{selectedPayment.label}</Text>
            </View>
          </View>

          {/* Pay Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.payButtonWrapper}
          >
            <LinearGradient
              colors={["#E7C140", "#CC8912"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.payButton}
            >
              <Text style={styles.payButtonText}>Pay ₹2659.00</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ▼ Dropdown Menu */}
        {payOpen && (
          <View style={styles.dropdownMenu}>
            {paymentOptions.map((opt) => (
              <TouchableOpacity
                key={opt.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedPayment(opt);
                  setPayOpen(false);
                }}
              >
                <Image source={opt.icon} style={styles.dropdownIconImg} />
                <Text style={styles.dropdownItemLabel}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

/* Styles */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#12151d",
  },
  contentContainer: {
    paddingBottom: 40,
    paddingTop: 8,
    flexGrow: 1,
  },

  /* HEADER */
  headerRow: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    opacity: 0.95,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 16,
    marginTop: 30,
    marginBottom: 10,
    opacity: 0.95,
  },

  /* PRODUCT ROW */
  productRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "flex-start",
    marginBottom: 12,
  },
  productImage: {
    width: 70,
    height: 50,
    borderRadius: 10,
    marginRight: 16,
    marginTop: 24,
  },
  productDetails: {
    flex: 1,
    paddingRight: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  brandText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 12,
  },
  titleRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  deleteBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    width: 40,
    height: 40,
    opacity: 0.95,
    marginLeft: 16,
  },

  /* controls (qty / size) */
  controlsRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 10,
    minWidth: 100,
    justifyContent: "space-between",
  },
  controlText: {
    color: "#fff",
    fontSize: 13,
  },
  chevWrapper: {
    marginLeft: 8,
  },
  chev: {
    width: 14,
    height: 14,
    tintColor: "rgba(255,255,255,0.9)",
  },

  /* Delivery & Price */
  deliveryPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deliveryText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    marginLeft: 12,
  },
  priceText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* Divider */
  dashedDivider: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 24,
    borderBottomWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#546265",
    width: "90%",
  },

  separator: {
    height: 2,
    backgroundColor: "#546265",
    width: "100%",
    marginBottom: 12,
    marginVertical: 0, // no gap
  },

  /* BILL DETAILS */
  billBlock: {
    marginHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.02)",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  billHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  billTitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  chevBtn: {
    marginLeft: 8,
    marginTop: -2,
  },
  chevSmall: {
    width: 12,
    height: 12,
    tintColor: "rgba(255,255,255,0.8)",
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  billRowBold: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.03)",
    marginTop: 6,
    paddingTop: 8,
  },
  billLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
  },
  billValue: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  /* Billing details container */
  billingDetailsContainer: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: "#1A222B",
    padding: 12,
    borderRadius: 8,
  },

  /* Delivery title row */
  deliveryTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 8,
  },
  deliveryIcon: {
    width: 22,
    height: 22,
    opacity: 0.95,
  },
  deliveryTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    flex: 1,
  },
  titleDropdownTouch: {
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  titleDropdownIcon: {
    width: 14,
    height: 14,
    tintColor: "rgba(255,255,255,0.8)",
    transform: [{ rotate: "0deg" }],
  },
  dropdownOpen: {
    transform: [{ rotate: "180deg" }],
  },

  /* address summary + details */
  addressContainer: {
    backgroundColor: "transparent",
    paddingVertical: 6,
  },
  addressText: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 18,
  },
  addressDetails: {
    marginTop: 8,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 6,
  },
  addressDetailLine: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginBottom: 4,
  },

  /* payment row */
  /* Payment Row */
  payRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  payLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  paymentIconBox: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  paymentIcon: {
    width: 26,
    height: 26,
  },

  payTextBlock: {
    flexDirection: "column",
  },

  payTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  payingViaLabel: {
    color: "#999",
    fontSize: 10,
    marginRight: 6,
  },

  payDropdownTouch: {
    padding: 4,
  },

  payDropdownIcon: {
    width: 12,
    height: 12,
  },

  // dropdownOpen: {
  //   transform: [{ rotate: "180deg" }],
  // },

  payMethod: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },

  /* Pay Button */
  payButtonWrapper: {
    marginLeft: 10,
  },

  payButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  payButtonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 14,
  },

  /* Dropdown List */
  dropdownMenu: {
    marginTop: 6,
    backgroundColor: "#1A1D24",
    borderRadius: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  dropdownIconImg: {
    width: 22,
    height: 22,
    marginRight: 10,
  },

  dropdownItemLabel: {
    color: "#fff",
    fontSize: 14,
  },

  // payRow: {
  //   marginTop: 14,
  //   width: "100%",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   marginBottom: 24,
  // },
  // payLeft: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   flex: 1,
  // },
  // paymentIconBox: {
  //   width: 44,
  //   height: 44,
  //   borderRadius: 8,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginRight: 10,
  //   overflow: "hidden",
  // },
  // paymentIcon: {
  //   width: 32,
  //   height: 32,
  // },
  // payTextBlock: {
  //   flex: 1,
  //   justifyContent: "center",
  // },
  // payTitleRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "flex-start",
  // },
  // payDropdownTouch: {
  //   padding: 6,
  //   marginLeft: 8,
  // },
  // payDropdownIcon: {
  //   width: 12,
  //   height: 12,
  //   tintColor: "rgba(255,255,255,0.8)",
  // },
  // payMethod: {
  //   color: "#fff",
  //   fontSize: 13,
  //   marginTop: 4,
  //   fontWeight: "600",
  // },
  // payButtonWrapper: {
  //   marginLeft: 12,
  //   borderRadius: 10,
  //   shadowColor: "#000",
  //   shadowOpacity: 0.3,
  //   shadowRadius: 6,
  //   shadowOffset: { width: 0, height: 3 },
  //   elevation: 6, // Android shadow
  // },

  // payButton: {
  //   paddingHorizontal: 18,
  //   paddingVertical: 12,
  //   borderRadius: 10,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   minWidth: 130,
  // },

  // payButtonText: {
  //   color: "#12151d",
  //   fontWeight: "700",
  //   fontSize: 14,
  // },

  // payingViaLabel: {
  //   color: "rgba(255,255,255,0.8)",
  //   fontSize: 11,
  //   fontWeight: "700",
  // },

  purpleDecor: {
    position: "absolute",
    right: 18,
    bottom: -10,
    width: 44,
    height: 44,
    opacity: 0.95,
  },

  bottomCard: {
    marginTop: 20,
    marginHorizontal: 16,
    height: 44,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
});
