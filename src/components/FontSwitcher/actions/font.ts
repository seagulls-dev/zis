import { SetFontAction, ResetFontAction } from '.'
import { FontSize } from '../models'

const FONT_STORAGE_KEY: string = 'font'

export const loadFont = () => {
  const font = window.localStorage.getItem(FONT_STORAGE_KEY)
  return new SetFontAction((font as FontSize) || FontSize.DEFAULT)
}

export const changeFont = (font: FontSize) => {
  window.localStorage.setItem(FONT_STORAGE_KEY, font)
  return new SetFontAction(font)
}

export const resetFont = () => {
  window.localStorage.removeItem(FONT_STORAGE_KEY)
  return new ResetFontAction()
}
