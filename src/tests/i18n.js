import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import appLoading from '../../public/static/locales/de/app-loading.json';
import common from '../../public/static/locales/de/common.json';
import landing from '../../public/static/locales/de/landing.json';
const resources = {
  de: {
    'app-loading': appLoading,
    common: common,
    landing: landing,
  },
};

i18n.use(initReactI18next).init({ fallbackLng: 'de', lng: 'de', resources });

const t = i18n.t.bind(i18n);

export { i18n, t };
