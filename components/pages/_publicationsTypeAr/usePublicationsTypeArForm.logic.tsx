
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { PublicationsTypeArInputs } from "./publicationsTypeAr.inputs";
import { PublicationsTypeArSchema , type PublicationsTypeArType } from "./publicationsTypeAr.schema";

export default function usePublicationsTypeArLogic({ data }: { data?: PublicationsTypeArType }) {
	const t = useTranslations();
	const inputs = PublicationsTypeArInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<PublicationsTypeArType>({
		mode: "onSubmit",
		resolver: zodResolver(PublicationsTypeArSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as PublicationsTypeArType,
	});

	const onSubmit = async (formData: PublicationsTypeArType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['publicationTypesAr'],
			reset: reset,
			redirectLink: "publicationsTypeAr",
			t,
		});
	};
        
              const formSubmit = handleSubmit(onSubmit);

	 return {
    
    control,
    inputs,
    formSubmit,
    t
  };
}

  