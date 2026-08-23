import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormInput } from "./CustomFormTypes.types";
import FormCard from "./FormCard";
import { Control } from "react-hook-form";

export default function CustomGeneratedInputs({
    fields,
    append,
    name,
    remove,
    minRequired = 0,
    control,
    generatedInputs,
    appendKey,
}: {
    minRequired?: number;
    generatedInputs: FormInput[];
    fields: Array<{ id: string }>;
    append: () => void;
    remove: (index: number) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    appendKey?: string;
    name: string;
}): JSX.Element {
    const t = useTranslations();
    return (
        <>
            {fields.map((item, index) => {
                const cardInputs = generatedInputs.map(input => {
                    return {
                        ...input,
                        name: `${name}.${index}.${input.name}`,
                        label: input?.label || t(`${input?.name}`),
                        id: `${name}.${index}.${input.name}`,
                        defaultValue: input?.defaultValue || t(`${input?.name}`),
                        placeholder: input?.placeholder || t(`${input?.name}`)
                    };
                });

                return (
                    <div className="mb-2" key={item.id}>
                        <div>
                            <FormCard
                                cardConfig={[
                                    {
                                        id: item.id,
                                        title: (
                                            <div>
                                                {minRequired < index + 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="btn btn-danger"
                                                    >
                                                        <X />
                                                    </button>
                                                )}
                                            </div>
                                        ),
                                        width: 6,
                                        multiLang: false
                                    }
                                ]}
                                cardInputs={cardInputs}
                                cardId={item.id}
                                control={control}
                            />
                        </div>
                    </div>
                );
            })}
            <button
                className="btn bg-primary text-white hover:bg-Secondary active:bg-Secondary border border-primary px-3 py-1 my-3 mx-1 rounded"
                type="button"
                onClick={append}
            >
                {appendKey ? t(`${appendKey}`) : t("append")}
            </button>
        </>
    );
}
