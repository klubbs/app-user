import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Klubbs',
  owner: 'klubbs',
  slug: 'klubbs',
  scheme: 'klubbs',
  orientation: 'portrait',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#282A30',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  version: '0.0.8',
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'app.klubbs.user',
    buildNumber: '0.0.18',
    icon: './assets/images/ios-icon.png',
    infoPlist: {
      NSLocationAlwaysAndWhenInUseUsageDescription:
        'Isso nos permite usar a localização para fornecer certos recursos como localização de estabelecimentos próximos.',
      NSLocationWhenInUseUsageDescription:
        'Isso nos permite usar a localização para fornecer certos recursos como localização de estabelecimentos próximos.',
    },
  },
  android: {
    package: 'app.klubbs.user',
    permissions: ['CAMERA', 'ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION'],
    versionCode: 15,
    adaptiveIcon: {
      foregroundImage: './assets/images/android-icon.png',
      backgroundColor: '#1F1F1F',
    },
  },
  extra: {
    KLUBBS_API_URL: process.env.ENVIRONMENT_KLUBBS_API_URL,
    KLUBBS_AUTHZN_URL: process.env.ENVIRONMENT_KLUBBS_AUTHZN_URL,
    eas: {
      projectId: process.env.ENVIRONMENT_PROJECT_EAS_ID,
    },
  },
});
