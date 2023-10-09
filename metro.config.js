const { getDefaultConfig } = require("expo/metro-config");

module.exports = getDefaultConfig(__dirname);

module.exports = (() => {
  const defaultConfig = getDefaultConfig(__dirname);
  const { assetExts, sourceExts } = defaultConfig.resolver;
  return {
    resolver: {
      // Add .bin to assetExts.
      assetExts: [assetExts, "txt", "xml", "png", "jpg", "pb", "tflite", "bin"],
      sourceExts: [
        ...sourceExts,
        "txt",
        "xml",
        "png",
        "jpg",
        "pb",
        "tflite",
        "bin",
      ],
    },
  };
})();
