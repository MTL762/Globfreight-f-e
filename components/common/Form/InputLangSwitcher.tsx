import { useEffect } from "react";
import { FORM_LANGUAGES, type FormLangs } from "./CustomFormTypes.types";

const styles = {
  languageButton: {
    padding: "5px 10px",
    margin: "0 5px",
    border: "none",
    borderBottom: "2px solid transparent",
    backgroundColor: "transparent",
    cursor: "pointer"
  },
  activeButton: {
    borderBottom: "2.5px solid red"
  }
};

export default function InputLangSwitcher({
  selectedLang,
  setSelectedLang,
  changeLang
}: {
  selectedLang: FormLangs;
  changeLang?: FormLangs;
  hideDefault?: boolean;
  setSelectedLang: (lang: FormLangs) => void;
}) {
  const handleLangChange = (lang: FormLangs) => {
    setSelectedLang(lang);
  };
  useEffect(() => {
    if (changeLang === "changeToAr") {
      handleLangChange("Ar");
    } else if (changeLang === "changeToEn") {
      handleLangChange("En");
    } else if (changeLang === "changeToNl") {
      handleLangChange("Nl");
    } else if (changeLang === "changeToFr") {
      handleLangChange("Fr");
    } else if (changeLang === "changeToDe") {
      handleLangChange("De");
    } else if (changeLang === "changeToDefault") {
      handleLangChange("default");
    }
  }, [changeLang]);
  return (
    <div className="col-span-12 mt-2">
      {FORM_LANGUAGES.map(lang => (
        <button
          type="button"
          key={lang.key}
          data-testid={`lang-${lang.key}`}
          onClick={() => handleLangChange(lang.key as FormLangs)}
          style={{
            ...styles.languageButton,
            ...(selectedLang === lang.key ? styles.activeButton : {})
          }}
        >
          {lang.label}
        </button>
      ))}
      <hr />
    </div>
  );
}

