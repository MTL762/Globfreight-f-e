import { fetchHelper } from "./fetch";

export default async function getPermissions(): Promise<Set<Permission>> {
  "use server";
  const  permissions
  = await fetchHelper({
    endPoint: ['myPermissions'],
    method: "GET",
    locale: "en",
    isLocalized: true,
    cache: "force-cache"
  });
  const output = permissions?.permissions
  console.log(output,'sad2dws')

  return new Set(output) as Set<Permission>;
}
