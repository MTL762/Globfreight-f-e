import { getLocale } from "next-intl/server";
import { routesKey } from "../routes";

export async function handleLinkServer(link: routesKey) {
	const locale = await getLocale();
	return `/${locale}${link}`;
}
