import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [mobile, setMobile] = useState("");

  return (
    <ImageBackground
      source={require("../../assets/images/pagebg.jpeg")}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* LOGO + TITLE */}
      <View style={styles.topSection}>
        <Image
          source={require("../../assets/images/bicon.png")}
          style={styles.logo}
        />

        <Text style={styles.brandText}>BODHA</Text>
        <Text style={styles.subBrandText}>CIVILS PREP</Text>
      </View>

      {/* LOGIN CARD */}
      <View style={styles.card}>
        <Text style={styles.label}>Mobile Number</Text>

        {/* INPUT */}
        <View style={styles.inputRow}>
          <View style={styles.countryBox}>
            <Text style={styles.countryText}>+91</Text>
          </View>

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

        {/* BUTTON */}
        <TouchableOpacity activeOpacity={0.9} style={styles.btnOuter}>
          <LinearGradient
            colors={["#5A1A9E", "#8B33D6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Send OTP</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* SECURE TEXT */}
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
  bg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  topSection: {
    alignItems: "center",
    marginBottom: 25,
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },

  brandText: {
    fontSize: 42,
    fontWeight: "900",
    color: "#4B1B78",
    letterSpacing: 1,
  },

  subBrandText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4B1B78",
    letterSpacing: 2,
    marginTop: 3,
  },

  card: {
    width: width - 35,
    backgroundColor: "rgba(255,255,255,0.93)",
    borderRadius: 26,
    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F0FA",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0D3F2",
    marginBottom: 20,
  },

  countryBox: {
    width: 70,
    height: 52,
    backgroundColor: "#EDE4FA",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#D3C2EE",
  },

  countryText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#5A1A9E",
  },

  input: {
    flex: 1,
    height: 52,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#333",
  },

  btnOuter: {
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#5A1A9E",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
    marginBottom: 16,
  },

  btn: {
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  btnText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#fff",
  },

  secureRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  secureText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
});
