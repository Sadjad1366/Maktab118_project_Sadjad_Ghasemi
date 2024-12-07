"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (!token) {
      router.push("/"); // Redirect to home page if no token
    } else {
      setIsAuthorized(true); // User is authorized
    }
  }, [router]);

  if (!isAuthorized) {
    return <p>در حال بارگذاری...</p>; // Loading state while checking authorization
  }

  return <>{children}</>;
};

export default AdminGuard;
