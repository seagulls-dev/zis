import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from 'i18next-http-backend'
import moment from "moment"
import { initReactI18next } from "react-i18next"


// En is default locale for moment so we dont need to import it
import 'moment/locale/cs'

export const DEFAULT_LANGUAGE = 'en'
export const SUPPORTED_LANGUAGES = ['en', 'cs']

const options: i18n.InitOptions = {
  fallbackLng: DEFAULT_LANGUAGE,
  ns: ["common"],
  defaultNS: "common",
  backend: {
    loadPath: `/translations/{{ns}}.{{lng}}.json`,
    crossDomain: true
  },
  whitelist: SUPPORTED_LANGUAGES,
  debug: false, //process.env.NODE_ENV === "development" ? true : false,

  appendNamespaceToMissingKey: false,
  parseMissingKeyHandler: key => `?_${key}_?`,

  interpolation: {
    escapeValue: false
  },

  react: {
    wait: true,
    bindI18n: "languageChanged loaded",
    bindStore: "added removed",
    nsMode: "default"
  }
}

const instance = i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(options, x => {
    moment.locale(i18n.language)
  })

export default instance
