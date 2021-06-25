import 'dotenv/config';


export default {
  expo: {
    name: "gaba-club-app",
    slug: "gaba-club-app",
    orientation: "portrait",
    icon: "",
    splash: {
      image: "",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    android: {
      adaptiveIcon: {
        foregroundImage: "",
        backgroundColor: "#FFFFFF"
      }
    },
    version: "1.0.0",
    ios: {
      supportsTablet: true
    },
    extra: {
      ENVIRONMENT_API_EARTH: process.env.ENVIRONMENT_API_EARTH,
    }
  }
}
