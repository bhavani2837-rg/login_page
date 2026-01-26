import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Gradient for the "Send OTP" button
import { LinearGradient } from "expo-linear-gradient";

// Icon for "Secure & Encrypted Login"
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Screen width used to make responsive UI
const { width } = Dimensions.get("window");

export default function HomeScreen() {
  // State: stores mobile number entered by the user
  const [mobile, setMobile] = useState("");

  return (
    // Full screen background image
    <ImageBackground
      source={require("../../assets/images/pagebg.jpeg")}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* ===========================
          TOP SECTION (Logo + Title)
         =========================== */}
      <View style={styles.topSection}>
        {/* Logo */}
        <Image
          source={require("../../assets/images/bicon.png")}
          style={styles.logo}
        />

        {/* Brand Text */}
        <Text style={styles.brandText}>BODHA</Text>

        {/* Subtitle */}
        <Text style={styles.subBrandText}>CIVILS PREP</Text>
      </View>

      {/* ===========================
          LOGIN CARD SECTION
         =========================== */}
      <View style={styles.card}>
        {/* Label */}
        <Text style={styles.label}>Mobile Number</Text>

        {/* ===========================
            INPUT BOX ( +91 + TextInput )
           =========================== */}
        <View style={styles.inputRow}>
          {/* Country Code Box */}
          <View style={styles.countryBox}>
            <Text style={styles.countryText}>+91</Text>
          </View>

          {/* Mobile Number Input */}
          <TextInput
            value={mobile}
            onChangeText={setMobile}
            placeholder="Enter mobile number"
            placeholderTextColor="#8F8F8F"
            keyboardType="number-pad"
            maxLength={10}
            style={styles.input}
          />
        </View>

        {/* ===========================
            SEND OTP BUTTON
           =========================== */}
        <TouchableOpacity activeOpacity={0.9} style={styles.btnOuter}>
          <LinearGradient
            colors={["#5A1A9E", "#8B33D6"]} // Purple gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Send OTP</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* ===========================
            SECURE LOGIN TEXT
           =========================== */}
        <View style={styles.secureRow}>
          <MaterialCommunityIcons
            name="shield-check"
            size={20}
            color="#1E8E3E"
          />
          <Text style={styles.secureText}>Secure & Encrypted Login</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  /* Full screen background container */
  bg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  /* Top logo + title area */
  topSection: {
    alignItems: "center",
    marginBottom: 25,
  },

  /* App logo image */
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },

  /* "BODHA" text */
  brandText: {
    fontSize: 42,
    fontWeight: "900",
    color: "#4B1B78",
    letterSpacing: 1,
  },

  /* "CIVILS PREP" text */
  subBrandText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4B1B78",
    letterSpacing: 2,
    marginTop: 3,
  },

  /* White rounded card */
  card: {
    width: width - 35,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 30,
    padding: 22,

    // Shadow (Android + iOS)
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },

  /* Mobile Number label */
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },

  /* Input row container (+91 box + input field) */
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F0FA",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0D3F2",
    marginBottom: 20,
  },

  /* +91 box */
  countryBox: {
    width: 70,
    height: 52,
    backgroundColor: "#EDE4FA",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#D3C2EE",
  },

  /* +91 text */
  countryText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#5A1A9E",
  },

  /* Mobile number input */
  input: {
    flex: 1,
    height: 52,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#333",
  },

  /* Outer button wrapper (shadow + rounded corners) */
  btnOuter: {
    borderRadius: 22,
    overflow: "hidden",

    shadowColor: "#5A1A9E",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 9,

    marginBottom: 16,
  },

  /* Gradient button area */
  btn: {
    height: 52,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Button text (Reduced size for clean look) */
  btnText: {
    fontSize: 17, // reduced from 20
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },

  /* Secure line row */
  secureRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  /* Secure text */
  secureText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
});
