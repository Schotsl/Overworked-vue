import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.sjorsvanholst.overworked",
  appName: "Overworked",
  webDir: "dist",
  bundledWebRuntime: false,
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["apple.com", "github.com", "google.com"],
    },
    SplashScreen: {
      launchAutoHide: false,
    },
  },
};

export default config;
