import { SetThemeAction, ResetThemeAction } from '.';
import { Theme } from '../models';

const THEME_STORAGE_KEY: string = 'theme';

export const loadTheme = () => {
  const theme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return new SetThemeAction((theme as Theme) || Theme.DEFAULT);
};

export const changeTheme = (theme: Theme) => {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  return new SetThemeAction(theme);
};

export const resetTheme = () => {
  window.localStorage.removeItem(THEME_STORAGE_KEY);
  return new ResetThemeAction();
};
