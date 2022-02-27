import {
  DefaultTheme as DefaultLightTheme,
  DarkTheme as DefaultDarkTheme,
} from "@react-navigation/native";
import { TintColorDark, TintColorLight, Dark, Light } from "./Colors";

export const DarkTheme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    primary: Dark.background,
    background: Dark.background,
    text: Dark.text,
    border: TintColorDark,
  },
};

export const LightTheme = {
  ...DefaultLightTheme,
  colors: {
    ...DefaultLightTheme.colors,
    primary: Light.background,
    background: Light.background,
    text: Light.text,
    border: TintColorLight,
  },
};
