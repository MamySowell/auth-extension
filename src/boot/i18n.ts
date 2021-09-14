import { boot } from "quasar/wrappers";
import enUS from "../i18n/en-US";
import frFR from "../i18n/fr-FR";
export default boot(({ app }) => {
  const { getLocaleMessage, setLocaleMessage } = app["__VUE_I18N__"].global;
  const enLocale = getLocaleMessage("en-US");
  const frLocale = getLocaleMessage("fr-FR");
  setLocaleMessage("en-US", { ...enLocale, ...enUS });
  setLocaleMessage("fr-FR", { ...frLocale, ...frFR });
});
