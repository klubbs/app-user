import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Klubbs",
  owner: "klubbs",
  slug: "klubbs",
  scheme: 'klubbs',
  icon: './assets/images/icon.png',
  orientation: "portrait",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#282A30"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  experiments: {
    "turboModules": true
  },
  version: "0.0.6",
  ios: {
    supportsTablet: false,
    bundleIdentifier: "app.klubbs.user",
    buildNumber: "0.0.14",
    //https://github.com/expo/expo-cli/issues/4253
    // bitcode: "Debug",
    infoPlist: {
      NSLocationAlwaysAndWhenInUseUsageDescription: "Isso nos permite usar a localização para fornecer certos recursos como localização de estabelecimentos próximos.",
      NSLocationWhenInUseUsageDescription: "Isso nos permite usar a localização para fornecer certos recursos como localização de estabelecimentos próximos.",
    }
  },
  android: {
    package: "app.klubbs.user",
    permissions: ['CAMERA', 'ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION'],
    versionCode: 11,
    adaptiveIcon: {
      foregroundImage: './assets/images/icon.png',
      backgroundColor: "#1F1F1F"
    }
  },
  extra: {
    ENVIRONMENT_API_URL: process.env.ENVIRONMENT_API_URL
  }
});

