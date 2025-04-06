import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TYPE } from "react-native-manage-wallpaper";

const BottomSheetContent = ({ image, closeBottomSheet, setWallpic }) => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            setWallpic(image, TYPE.HOME);
            closeBottomSheet();
          }}
        >
          <AntDesign name="home" size={35} color="#707070" />
          <Text style={styles.text}>Home Screen</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            setWallpic(image, TYPE.LOCK);
            closeBottomSheet();
          }}
        >
          <AntDesign name="lock" size={35} color="#707070" />
          <Text style={styles.text}>Lock Screen</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          setWallpic(image, TYPE.BOTH);
          closeBottomSheet();
        }}
      >
        <AntDesign name="mobile1" size={35} color="#707070" />
        <Text style={styles.text}>Both Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#707070",
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "600",
  },
});

export default BottomSheetContent;
