module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // ...other plugins if you have any,
      "react-native-reanimated/plugin", // This must be listed last
    ],
  };
};
