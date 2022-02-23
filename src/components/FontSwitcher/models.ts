export interface FontSwitcherState {
  fontSize: FontSize
  cb?: (success: boolean) => void
}
export enum FontSize {
  DEFAULT = 'middle',
  BIG = 'large',
}
