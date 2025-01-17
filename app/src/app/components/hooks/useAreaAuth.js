"use client";
import { useLayoutEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import authService from "@/services/authService";

const AREA_TYPES = {
  LANDING: "landing",
  AUTH: "auth",
  PROTECTED: "protected",
};

const useAreaAuth = (area) => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  useLayoutEffect(() => {
    if (!Object.values(AREA_TYPES).includes(area)) {
      console.error(`Invalid area type: ${area}`);
      return;
    }

    const isAuthenticated = authService.isAuthenticated();
    const user = authService.getCurrentUser()?.user;

    setAuthState({ isAuthenticated, user });
    setMounted(true);

    switch (area) {
      case AREA_TYPES.LANDING:
        if (pathname === "/") {
          router.replace(isAuthenticated ? "/main" : "/login");
        }
        break;

      case AREA_TYPES.AUTH:
        if (["/login", "/register"].includes(pathname)) {
          if (isAuthenticated) {
            router.replace("/main");
          }
        }
        break;

      case AREA_TYPES.PROTECTED:
        if (!isAuthenticated) {
          router.replace("/login");
        }
        break;
    }
  }, [area, router, pathname]);

  // Don't render anything until we've performed our authentication check
  if (!mounted) return { isAuthenticated: false, user: null };

  return authState;
};

export default useAreaAuth;
