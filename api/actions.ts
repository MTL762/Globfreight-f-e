"use server";
import { REFRESH_TOKEN, TOKEN } from "@/utils/config";
import { cookies } from "next/headers";

const cookieOptions = {
  httpOnly: false,
  secure: false,
  sameSite: "lax",
  path: "/",
} as const;

export async function setRefreshToken(refreshToken: string) {
  const c = await cookies();
  c.set(REFRESH_TOKEN, refreshToken, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });
  console.log(c.getAll(), "das2das2das2d",refreshToken);

}

export async function removeToken() {
  const c = await cookies();
  c.delete(TOKEN);
  c.delete(REFRESH_TOKEN);
}

export async function setToken(token: string) {
  const c = await cookies();
  c.set(TOKEN, token, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 7 // 7 days (Matching session duration better)
  });
  console.log(c.getAll(), "das2das2das2d",token);
}

// export async function setAccountType(roleId: 1 | 2 | 3 | 4) {
//   (await cookies()).set(ACCOUNT_TYPE, roleId?.toString());
// }
// export async function getAccountType(): Promise<RoleKey> {
//   "use server";
//   const roleId = (await cookies()).get(ACCOUNT_TYPE)?.value as "1" | "2" | "3" | "4" | undefined;
//   return roleId == "1" ? "Admin" : roleId == "2" ? "Teacher" : roleId == "3" ? "Student" : "Parent";
// }
