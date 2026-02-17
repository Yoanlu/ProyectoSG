import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";
import packageJson from "../../package.json";

let clavesSinTraduccion = [];

i18n.use(Backend)
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
        fallbackLng: "es",
        ns: ["translations"],
        load: "languageOnly",
        defaultNS: "translations",
        debug: false,
        interpolation: {
            escapeValue: false // not needed for react!!
        },

        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json?v=" + (process.env.NODE_ENV !== "production" ? new Date().getTime() : packageJson.version)
            // requestOptions: {
            //     cache: 'no-store',
            // },
        },

        react: {
            wait: global.screen.height > 0 ? true : false
        },

        saveMissing: true,

        parseMissingKeyHandler: function(key, defaultValue) {
            let valor = defaultValue || key;
            if (process.env.NODE_ENV === "production") {
                return valor;
            }

            if (clavesSinTraduccion.includes(key)) {
                return "*[" + valor + "]*";
            }

            return valor;
        },

        missingKeyHandler: function(lng, ns, key, fallbackValue, updateMissing, options) {
            if (process.env.NODE_ENV === "production") {
                return;
            }

            if ("tDescription" in options && options["tDescription"] === "auto") {
                // Si es una traducción automática, no tiene porque existir
                return;
            }

            if (!clavesSinTraduccion.includes(key)) {
                clavesSinTraduccion.push(key);
            }

            console.warn(`No existe la traducción '${key}' (${lng}/${ns})`);
        }
    });

export default i18n;
