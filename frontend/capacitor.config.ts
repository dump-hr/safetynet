import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'hr.safetynet.app',
  appName: 'safetynet',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
