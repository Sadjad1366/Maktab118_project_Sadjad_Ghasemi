"use client";

import { useRouter } from "@/i18n/routing";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const role = Cookies.get('role')

    if (role !== "ADMIN") {
      router.push("/not-found");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return <p>در حال بارگذاری...</p>;
  }

  return <>{children}</>;
};

export default AdminGuard;
