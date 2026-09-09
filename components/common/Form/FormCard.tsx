import { useLocale } from "next-intl";
import React, { useState } from "react";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import type { CardConfig, FormInput, FormLangs } from "./CustomFormTypes.types";
import FormCardContainer from "./FormCardContainer";
import FormCardTitle from "./FormCardTitle.layout";
import FormInputContainer from "./FormInputContainer";
import InputLangSwitcher from "./InputLangSwitcher";
import { renderInputComponent } from "./inputs-render";


export default function FormCard<T extends FieldValues>({
  cardId,
  cardInputs,
  cardConfig,
  control,
  changeLang,
  defaultConfig
}: // errors,
  {
    cardId: string | number;
    cardInputs: FormInput[];
    cardConfig?: CardConfig[];
    defaultConfig?: CardConfig;
    control: Control<T>;
    // errors: FieldErrors;
    changeLang?: FormLangs;
  }): JSX.Element {
  let cardWidthObj = cardConfig?.find(cw => cw.id === cardId);
  if ((cardWidthObj?.id == "default" || cardWidthObj == undefined) && defaultConfig) {
    cardWidthObj = defaultConfig;
  }
  const colSpan = cardWidthObj ? cardWidthObj.width : 6;
  let cardTitle;
  if (cardConfig) {
    cardTitle = cardWidthObj;
  }

  const locale = useLocale();
  const getInitialLang = (loc: string): FormLangs => {
    const map: Record<string, FormLangs> = {
      ar: "Ar",
      en: "En",
      nl: "Nl",
      fr: "Fr",
      de: "De"
    };
    return map[loc] || "En";
  };
  const [selectedLang, setSelectedLang] = useState<FormLangs>(getInitialLang(locale));




  return (
    <FormCardContainer width={cardWidthObj?.width ?? colSpan} index={cardId}>
      {cardTitle?.title && (
        <FormCardTitle icon={cardTitle?.icon} title={cardTitle.title} description={cardTitle.description} />
      )}
      {cardTitle?.multiLang && (
        <InputLangSwitcher
          selectedLang={selectedLang}
          changeLang={changeLang}
          setSelectedLang={setSelectedLang}
        />
      )}


      {cardInputs.map((item: FormInput, index: number) => {
        const inputWidth = item.width ?? 3;
        const isMultiLang = item.multiLang && cardTitle?.multiLang;

        return (
          <React.Fragment key={item.name}>
            {!item.isHidden && (
              <FormInputContainer width={inputWidth} className={item.inputClassName} index={index}>
                {isMultiLang ? (
                  <>
                    {(["Ar", "En", "Nl", "Fr", "De"] as const).map(lang => (
                      <div key={`${item.name}${lang}`}>
                        <div
                          style={{
                            display: selectedLang === lang ? "block" : "none"
                          }}
                        >
                          <Controller
                            name={`${item.name}${lang}` as Path<T>}
                            control={control}
                            render={({ field, fieldState: { error } }) => {
                              return renderInputComponent({
                                errors: { [field.name]: error },
                                item: {
                                  ...item,
                                  name: `${item.name}${lang}`
                                },
                                field
                              });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <Controller
                    name={item.name as Path<T>}
                    control={control}
                    render={({ field, formState: { errors } }) =>
                      renderInputComponent({
                        errors: errors,
                        item,
                        field
                      })
                    }
                  />
                )}
              </FormInputContainer>
            )}
          </React.Fragment>
        );
      })}
    </FormCardContainer>
  );
}
