import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.tunombre.garitas",
  appName: "Garitas Tijuana",
  webDir: "out",
  plugins: {
    CapacitorHttp: { enabled: true },
  },
};

export default config;
