import { createI18n } from 'vue-i18n';
import { supportedLocales } from './locales/supported-locales';

import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';

// Get the user's language
const userLocale = navigator.language;

// Use the user's language if supported, otherwise fall back to 'en-US'
const locale = supportedLocales.includes(userLocale) ? userLocale : 'en-US';

// Create an i18n instance
const i18n = createI18n({
  legacy: false, // Use Composition API
  locale, // Set the detected or fallback locale
  messages: {
    'en-US': en,
    'es-ES': es,
    'fr-FR': fr,
    'de-DE': de,
  },
});

export default i18n;