// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

module.exports = getDefaultConfig(__dirname);

module.exports = (() => {
  const defaultConfig = getDefaultConfig(__dirname);
  const { assetExts } = defaultConfig.resolver;
  defaultConfig.resolver.assetExts.push("hcscript");
  defaultConfig.transformer.assetPlugins = ["expo-asset/tools/hashAssetFiles"];
  return {
    resolver: {
      // Add .bin to assetExts.
      assetExts: [...assetExts, "bin"],
    },
  };
})();
