import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Lang = 'en' | 'vi'

type LanguageState = {
  lang: Lang
  translations: Record<Lang, { title: string; body: string; academy: string; vi: string; en: string }>
}

const initialState: LanguageState = {
  lang: 'en',
  translations: {
    en: {
      title: 'List Favorites User',
      body:
        'This is a simple demonstration of managing languages in React Native using Redux Toolkit.',
      academy: 'Rikkei Academy',
      vi: 'Vietnamese',
      en: 'English',
    },
    vi: {
      title: 'Danh sách tài khoản yêu thích',
      body:
        'Đây là ví dụ đơn giản về quản lý ngôn ngữ trong React Native bằng Redux Toolkit.',
      academy: 'Học viện Rikkei',
      vi: 'Tiếng Việt',
      en: 'English',
    },
  },
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Lang>) => {
      state.lang = action.payload
    },
    toggleLanguage: (state) => {
      state.lang = state.lang === 'en' ? 'vi' : 'en'
    },
  },
})

export const { setLanguage, toggleLanguage } = languageSlice.actions
export default languageSlice.reducer

export const selectLang = (s: { language: LanguageState }) => s.language.lang
export const selectT = (s: { language: LanguageState }) => s.language.translations[s.language.lang]
export const selectAllTranslations = (s: { language: LanguageState }) => s.language.translations
