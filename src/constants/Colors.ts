/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// TYPES
export type TintColor = {
  default: string;
  accent_1: string;
  accent_2: string;
  accent_3: string;
  accent_4: string;
  white: string; // White
  system: string;
};
export type BackgroundColor = {
  system: string;
  default: string;
  accent_1: string;
  accent_2: string;
  accent_3: string;
  accent_4: string;
  white: string;
};
export type ThemeColor = {
  text: {
    default: string;
    title: string;
  };
  background: BackgroundColor;

  tint: TintColor;
  icon: {
    default: string;
  };
  tabBackground: {
    default: string;
  };
  tabIconDefault: {
    default: string;
  };
  tabIconSelected: {
    default: string;
  };
  tabShopBackground: {
    default: string;
  };
};

const tintColors: TintColor = {
  default: "#1672EC", // blue
  accent_1: "#2AB930", // green
  accent_2: "#F0D042", // yellow
  accent_3: "#A1A1A1", // grey
  accent_4: "#082853", // Dark blue
  white: "#ffffff", // White
  system: "#000000",
};

export const Colors: { light: ThemeColor; dark: ThemeColor } = {
  light: {
    text: {
      default: "#11181C",
      title: "#082853",
    },
    background: {
      system: "#fff",
      default: tintColors.default,
      accent_1: tintColors.accent_1,
      accent_2: tintColors.accent_2,
      accent_3: tintColors.accent_3,
      accent_4: tintColors.accent_4,
      white: tintColors.white,
    },
    tint: tintColors,
    icon: { default: "#9DB2CE" },
    tabBackground: { default: tintColors.default },
    tabIconDefault: { default: "#9DB2CE" },
    tabIconSelected: { default: "#fff" },
    tabShopBackground: { default: tintColors.default },
  },
  dark: {
    text: {
      default: "#CCC",
      title: "#fff",
    },
    background: {
      system: "#151718",
      default: tintColors.default,
      accent_1: tintColors.accent_1,
      accent_2: tintColors.accent_2,
      accent_3: tintColors.accent_3,
      accent_4: tintColors.accent_4,
      white: tintColors.white,
    },
    tint: tintColors,
    icon: { default: "#9DB2CE" },
    tabBackground: { default: "#131516" },
    tabIconDefault: { default: "#9DB2CE" },
    tabIconSelected: { default: tintColors.default },
    tabShopBackground: { default: "#000" },
  },
};
