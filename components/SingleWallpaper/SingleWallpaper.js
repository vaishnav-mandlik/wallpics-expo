import React, { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  ToastAndroid,
  ActivityIndicator,
  Share,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import ManageWallpaper from "react-native-manage-wallpaper";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetContent from "./BottomSheetContent";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const SingleWallpaper = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { image } = route.params;
  const [settingWallpaper, setSettingWallpaper] = useState(false);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["24%"], []);

  const callback = (res) => {
    ToastAndroid.showWithGravity(
      "Wallpaper set successfully",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const downloadImage = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      try {
        const uri = image;
        const fileUri = FileSystem.documentDirectory + uri.split("/").pop();
        const { uri: downloadedUri } = await FileSystem.downloadAsync(
          uri,
          fileUri
        );
        const asset = await MediaLibrary.createAssetAsync(downloadedUri);
        await MediaLibrary.createAlbumAsync("WallPics", asset, false);
        ToastAndroid.showWithGravity(
          "Wallpaper downloaded in WallPics folder",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      } catch (error) {
        ToastAndroid.showWithGravity(
          "Something went wrong, please try again",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    } else {
      ToastAndroid.showWithGravity(
        "Please grant permission to download image",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  const shareWallpaper = async () => {
    try {
      Share.share({
        message: image,
      });
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Something went wrong, please try again",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  const setWallpic = async (uri, type) => {
    setSettingWallpaper(true);
    try {
      ManageWallpaper.setWallpaper(
        {
          uri,
        },
        callback,
        type
      );
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Something went wrong, please try again",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
    setSettingWallpaper(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}
      >
        <Entypo name="chevron-left" size={35} color="#F1B022" />
        <Text style={styles.headerText}>Explore</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={downloadImage}>
          <AntDesign name="clouddownloado" size={45} color="#707070" />
        </TouchableOpacity>
        {settingWallpaper ? (
          <ActivityIndicator size="large" color="#707070" />
        ) : (
          <TouchableOpacity onPress={openBottomSheet}>
            <MaterialIcons name="now-wallpaper" size={38} color="#707070" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={shareWallpaper}>
          <AntDesign name="sharealt" size={38} color="#707070" />
        </TouchableOpacity>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        animateOnMount={false}
        index={-1}
        backgroundStyle={{
          backgroundColor: "#25262A",
          borderColor: "#707070",
          borderWidth: 2,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#F1B022",
          borderColor: "#707070",
          borderWidth: 2,
        }}
      >
        <BottomSheetContent
          image={image}
          setWallpic={setWallpic}
          closeBottomSheet={closeBottomSheet}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25262A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  headerText: {
    color: "#F1B022",
    fontSize: 20,
    fontWeight: "600",
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 50,
      },
    }),
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 40,
    marginHorizontal: "8%",
    backgroundColor: "#1c2023",
    paddingVertical: 10,
  },
});

export default SingleWallpaper;
