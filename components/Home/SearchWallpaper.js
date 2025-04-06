import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import Wallpaper from "./Wallpaper";

const SearchWallpaper = (data) => {
  return (
    <View style={styles.container}>
      {data.data && data.data.length > 0 && (
        <FlatList
          data={data.data}
          numColumns={3}
          renderItem={({ item }) => <Wallpaper item={item} />}
        />
      )}
      {data.data && data.data.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Wallpaper not found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default SearchWallpaper;
