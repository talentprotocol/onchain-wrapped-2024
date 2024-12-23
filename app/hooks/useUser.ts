"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { UserModel } from "@/models/user.model";

export function useGetUser() {
  const [user, setUser] = useState<UserModel>();

  const router = useRouter();
  const params = useParams();
  const talentId = params.id;

  const fetchUser = useCallback(async () => {
    const result = await fetch(`/api/users/${talentId}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    const data = await result.json();

    if (result.status == 404) {
      router.push("/");
    }

    const user = data.user;
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }, [router, talentId]);

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (!talentId) {
      return router.push("/");
    }

    if (!localStorageUser?.talent_id || talentId != localStorageUser.talent_id?.toString()) {
      fetchUser();
    }
    setUser(localStorageUser);
  }, [fetchUser, router, talentId]);

  return user;
}
