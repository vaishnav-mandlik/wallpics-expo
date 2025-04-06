import { View, StyleSheet, FlatList, ToastAndroid, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  fetchCategories,
  fetchWallpaperImages,
  getCategoryId,
} from "../../sanity";
import CategoryListUi from "./CategoryListUi";
import Wallpaper from "./Wallpaper";
import WallpaperSkeleton from "../Skeleton/WallpaperSkeleton";

const Category = () => {
  const [CategoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState(
    CategoryList[0]?.name || "Nature"
  );
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const data = await fetchCategories();
      setCategoryList(data);
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Something went wrong, please try again",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  const fetchWallpaper = async () => {
    try {
      const id = await getCategoryId(activeCategory);
      const data = await fetchWallpaperImages(id?._id);
      setData(data);
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Something went wrong, please try again",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  useLayoutEffect(() => {
    getData();
    fetchWallpaper();
  }, [activeCategory]);

  const handleCategoryPress = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <View style={styles.cardContainer}>
      <View>
        <FlatList
          data={CategoryList}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name.toString() + Math.random()}
          renderItem={({ item }) => (
            <CategoryListUi
              item={item}
              isActive={item.name === activeCategory}
              onPress={handleCategoryPress}
            />
          )}
        />
      </View>

      {!data && (
        <View>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
            numColumns={3}
            renderItem={({ item }) => <WallpaperSkeleton />}
          />
        </View>
      )}

      <View style={styles.wallpaperWrapper}>
        {data && data.length > 0 && (
          <FlatList
            data={data}
            numColumns={3}
            renderItem={({ item }) => <Wallpaper item={item} />}
          />
        )}

        {data && data.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Wallpaper not found</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "#E8EBEC",
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  cardContainer: {
    flex: 1,
  },
  wallpaperWrapper: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default Category;
