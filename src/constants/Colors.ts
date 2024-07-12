/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// // Light
// const tintColorLight = "#1672EC";
// const secondaryColorLight_1 = "#2AB930";
// const secondaryColorLight_2 = "#F0D042";
// // dark
// const tintColorDark = "#fff";
// const secondaryColorDark_1 = "#2AB930";
// const secondaryColorDark_2 = "#F0D042";

// export const Colors = {
//   light: {
//     title: "#082853",
//     text: "#11181C",
//     background: "#fff",
//     tint: tintColorLight,
//     secondary_1: secondaryColorLight_1,
//     secondary_2: secondaryColorLight_2,
//     icon: "#9DB2CE",
//     tabIconDefault: "#9DB2CE",
//     tabIconSelected: "#fff",
//   },
//   dark: {
//     title: "#fff",
//     text: "#ECEDEE",
//     background: "#151718",
//     tint: tintColorDark,
//     secondary_1: secondaryColorDark_1,
//     secondary_2: secondaryColorDark_2,
//     icon: "#9BA1A6",
//     tabIconDefault: "#9BA1A6",
//     tabIconSelected: tintColorDark,
//   },
// };

// TYPES
type TintColor = {
  default: string;
  accent_1: string;
  accent_2: string;
};
export type BackgroundColor = {
  system: string;
  default: string;
  accent_1: string;
  accent_2: string;
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
  tabIconDefault: {
    default: string;
  };
  tabIconSelected: {
    default: string;
  };
};

// Light
const tintColorLight: TintColor = {
  default: "#1672EC", // blue
  accent_1: "#2AB930", // green
  accent_2: "#F0D042", // yellow
};
// dark
const tintColorDark: TintColor = {
  ...tintColorLight,
  default: "#000",
};

export const Colors: { light: ThemeColor; dark: ThemeColor } = {
  light: {
    text: {
      default: "#11181C",
      title: "#082853",
    },
    background: {
      system: "#fff",
      default: tintColorLight.default,
      accent_1: tintColorDark.accent_1,
      accent_2: tintColorLight.accent_2,
      white: "#fff",
    },
    tint: tintColorLight,
    icon: { default: "#9DB2CE" },
    tabIconDefault: { default: "#9DB2CE" },
    tabIconSelected: { default: "#fff" },
  },
  dark: {
    text: {
      default: "#ECEDEE",
      title: "#fff",
    },
    background: {
      system: "#151718",
      default: tintColorLight.default,
      accent_1: tintColorDark.accent_1,
      accent_2: tintColorLight.accent_2,
      white: "#fff",
    },
    tint: tintColorDark,
    icon: { default: "#9DB2CE" },
    tabIconDefault: { default: "#9DB2CE" },
    tabIconSelected: { default: "#fff" },
  },
};
