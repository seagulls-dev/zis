export interface ThemeSwitcherState {
  theme: Theme;
  cb?: (success: boolean) => void;
}
export enum Theme {
  DEFAULT = 'DEFAULT',
  DARK = 'DARK',
}
