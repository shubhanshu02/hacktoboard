import { CapacitorConfig } from '@capacitor/cli';
import { config as envConfig } from 'dotenv';

envConfig();

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'hacktoboard',
  webDir: 'build',
  bundledWebRuntime: false,
};

export default config;
