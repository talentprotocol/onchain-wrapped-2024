"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const saveToken = (token: string) => {
  localStorage.setItem("auth_token", token);
};

export default function Page() {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const pathname = usePathname();

  useQuery({
    queryKey: ["refresh_token", pathname, urlSearchParams],
    queryFn: async () => {
      const result = await fetch("/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          AUTHORIZATION: `Bearer ${urlSearchParams.get("auth_token") || ""}`
        }
      });

      const data = await result.json();
      const token = data?.authToken?.token;

      if (!token) {
        router.push("/");
      }

      saveToken(token);
      router.push(`/loading_wrapped/${data.user.talent_id}`);

      return token;
    },
    enabled:
      ["/login_callback"].includes(pathname) && urlSearchParams.has("auth_token") && !!urlSearchParams.get("auth_token")
  });

  return <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />;
}
