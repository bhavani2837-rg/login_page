import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function BodhaLogoCode() {
  return (
    <View style={styles.logoBox}>
      <Text style={styles.logoText}>B</Text>

      {/* Curve line like logo (approx) */}
      <View style={styles.curve} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoBox: {
    width: 120,
    height: 120,
    borderRadius: 26,
    backgroundColor: "#6B2BBE",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    position: "relative",
  },

  logoText: {
    fontSize: 70,
    fontWeight: "900",
    color: "white",
    marginTop: -8,
  },

  curve: {
    width: 70,
    height: 4,
    backgroundColor: "white",
    borderRadius: 10,
    position: "absolute",
    bottom: 40,
    left: 30,
    transform: [{ rotate: "-20deg" }],
    opacity: 0.9,
  },
});
