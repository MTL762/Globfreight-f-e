
 "use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { PublicationArInputs } from "./publicationAr.inputs";
import { PublicationArSchema , type PublicationArType } from "./publicationAr.schema";

export default function usePublicationArLogic({ data }: { data?: PublicationArType }) {
	const t = useTranslations();
	const inputs = PublicationArInputs();
	const {
		control,
		
		handleSubmit,
		reset,
	} = useForm<PublicationArType>({
		mode: "onSubmit",
		resolver: zodResolver(PublicationArSchema(t)),
		defaultValues: extractFormDefaultInputs(inputs, data) as PublicationArType,
	});

	const onSubmit = async (formData: PublicationArType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({inputs, data:formData}),
			endpoint: ['publicationsAr'],
			reset: reset,
			redirectLink: "publicationAr",
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

  