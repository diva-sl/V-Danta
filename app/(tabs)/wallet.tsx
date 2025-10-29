// app/(tabs)/wallet.tsx
import { StyleSheet, Text, View } from "react-native";

export default function WalletScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>💳 Wallet Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#12151d",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
