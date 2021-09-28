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
    image: "",
    resizeMode: "contain",
    backgroundColor: "#2D2F35"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  experiments: {
    "turboModules": true
  },
  version: "0.0.1",
  ios: {
    supportsTablet: false,
    bundleIdentifier: "app.klubbs.user",
    buildNumber: "0.0.1",
    infoPlist: {

    }
  },
  android: {
    package: "app.klubbs.user",
    versionCode: 1
  },
  extra: {
    ENVIRONMENT_API_EARTH: process.env.ENVIRONMENT_API_EARTH
  }
});

