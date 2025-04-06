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
  console.log(image, "image");

  //  (NOBRIDGE) LOG  https://cdn.sanity.io/images/p5dipqdz/production/3fd7b4275e45076768d346ec51c3aa526144cd5f-3804x5705.jpg image

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
    <View className="flex-1 bg-[#25262A]">
      <TouchableOpacity
        className="flex-row items-center p-3"
        onPress={() => navigation.goBack()}
      >
        <Entypo name="chevron-left" size={35} color="#F1B022" />
        <Text className="text-[#F1B022] text-xl font-semibold">Explore</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} className="w-full h-full rounded-3xl" />
      </View>
      <View className="flex-row justify-around items-center border border-[#707070] rounded-2xl mb-10 mx-[8%] bg-[#1c2023]">
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
  imageContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
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
});

export default SingleWallpaper;
