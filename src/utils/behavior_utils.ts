import { Platform } from 'react-native'


export const BEHAVIOR_KEYBOARD = Platform.OS == 'ios' ? 'padding' : 'height'
