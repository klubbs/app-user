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
  version: "0.0.3",
  ios: {
    supportsTablet: false,
    bundleIdentifier: "app.klubbs.user",
    buildNumber: "0.0.7",
    infoPlist: {
      NSLocationAlwaysAndWhenInUseUsageDescription: "Isso nos permite usar a localização para fornecer certos recursos como localização de estabelecimentos próximos.",
      NSLocationWhenInUseUsageDescription: "Isso nos permite usar a localização para fornecer certos recursos como localização de estabelecimentos próximos.",
    }
  },
  android: {
    package: "app.klubbs.user",
    versionCode: 1
  },
  extra: {
    ENVIRONMENT_API_URL: process.env.ENVIRONMENT_API_URL
  }
});

