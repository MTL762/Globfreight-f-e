'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function useTablePagination() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const oldSearchParams: any = {};
	searchParams.forEach((value, key) => {
		oldSearchParams[key] = value;
	});
	return {
		page: searchParams.get('page')
			? parseInt(searchParams.get('page') as string)
			: 1,
		per_page: searchParams.get('limit') || searchParams.get('per_page')
			? parseInt((searchParams.get('limit') || searchParams.get('per_page')) as string)
			: 15,
		setPage: (page: number) => {
			router.push(
				`?${new URLSearchParams({ ...oldSearchParams, page }).toString()}`,
			);
		},
		setPer_page: (per_page: number) => {
			router.push(
				`?${new URLSearchParams({ ...oldSearchParams, limit: per_page, per_page }).toString()}`,
			);
		},
	};
}
