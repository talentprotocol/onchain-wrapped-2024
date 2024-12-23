"use client";

import { UserModel } from "@/models/user.model";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useGetUser() {
  const params = useParams();
  const talentId = params.id;
  const router = useRouter();
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (!talentId) {
      return router.push("/");
    }

    console.log("localStorageUser", localStorageUser);
    if (!localStorageUser || talentId != localStorageUser.talent_id.toString()) {
      fetchUser();
    }
    setUser(localStorageUser);
  }, []);

  const fetchUser = async () => {
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
  };

  return user;
}
