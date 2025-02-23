import { createI18n } from 'vue-i18n';

import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';

// Create an i18n instance
const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: 'en-US', // Default locale
  messages: {
    'en-US': en,
    'es-ES': es,
    'fr-FR': fr,
    'de-DE': de,
  },
});

export default i18n;