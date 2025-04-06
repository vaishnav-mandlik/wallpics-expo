import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Intro = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/BgImage.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.topSection}></View>
        <LinearGradient
          colors={[
            "transparent",
            "rgba(0,0,0,0.7)",
            "rgba(0,0,0,0.9)",
            "rgba(0,0,0,1)",
          ]}
          style={styles.bottomSection}
          locations={[0, 0.4, 0.6, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={styles.innerContent}>
            <Text style={styles.title}>WallPics</Text>
            <Text style={styles.subtitle}>Set Wallpaper or Download it.</Text>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  await AsyncStorage.setItem("isOnboarded", "true");
                  navigation.navigate("Home");
                }}
              >
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  topSection: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContent: {
    marginBottom: "-40%",
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "400",
  },
  subtitle: {
    textAlign: "center",
    color: "#D1D5DB",
    fontSize: 20,
    fontWeight: "300",
    marginTop: 8,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginTop: 32,
    backgroundColor: "#1E3A8A",
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "400",
  },
});

export default Intro;
