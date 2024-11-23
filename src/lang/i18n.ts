// src/i18n.ts
import { createI18n } from 'vue-i18n';
import en from "./en.json";
import vi from "./vi.json";

const messages = {
  en,
  vi
};

const i18n = createI18n({
  locale: 'vi',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
