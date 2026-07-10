import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.foodtheotherlove.app',
  appName: 'Food: The Other Love Language',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
