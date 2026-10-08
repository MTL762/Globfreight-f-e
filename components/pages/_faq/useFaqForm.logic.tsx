
"use client";

import { extractFormDefaultInputs } from "@/utils/extractFormDefaultInputs";
import { extractFormNameInputs } from "@/utils/extractFormNameInputs";
import { FormAction } from "@/utils/FormActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { FaqInputs } from "./faq.inputs";
import { FaqSchema, type FaqType } from "./faq.schema";
import useFormErrorLang from "@/components/common/Form/hooks/useFormErrorLang";

export default function useFaqLogic({ data }: { data?: any }) {
	const t = useTranslations();
	const inputs = FaqInputs();
	console.log(data, 'sa')
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<FaqType>({
		mode: "onSubmit",
		resolver: zodResolver(FaqSchema(t)),
		defaultValues: {
			...extractFormDefaultInputs(inputs, data),
			answerAr: data?.answer?.ar,
			answerEn: data?.answer?.en,
			questionAr: data?.question?.ar,
			questionEn: data?.question?.en,
			answerNl: data?.answer?.nl,
			answerFr: data?.answer?.fr,
			answerDe: data?.answer?.de,
			questionNl: data?.question?.nl,
			is_active: data?.is_active == true,
			questionFr: data?.question?.fr,
			questionDe: data?.question?.de,
		} as FaqType,
	});

	const onSubmit = async (formData: FaqType) => {
		await FormAction({
			data,
			formData: extractFormNameInputs({ inputs, data: formData }),
			endpoint: ['adminFaqItems'],
			reset: reset,
			redirectLink: "faq",
			t,
		});
	};
	const { lang } = useFormErrorLang({
		errors,
		name: ['question', 'answer']
	})
	const formSubmit = handleSubmit(onSubmit);

	return {
		lang,
		control,
		inputs,
		formSubmit,
		t
	};
}

