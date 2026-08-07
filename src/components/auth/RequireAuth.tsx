"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";

type RequireAuthProps = {
  children: ReactNode;
  role?: "ADMIN" | "STUDENT";
};

export function RequireAuth({ children, role }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isInitializing } = useAuth();

  useEffect(() => {
    if (isInitializing) return;
    if (!user) {
      router.replace("/login");
      return;
    }

    if (!user.profileCompleted && pathname !== "/complete-profile") {
      router.replace("/complete-profile");
      return;
    }

    if (role && user.role !== role) {
      router.replace(user.role === "ADMIN" ? "/admin/subjects" : "/subjects");
    }
  }, [isInitializing, user, role, router, pathname]);

  if (isInitializing) {
    return <LoadingOverlay label="Restoring your session" />;
  }

  if (!user || (!user.profileCompleted && pathname !== "/complete-profile") || (role && user.role !== role)) {
    return <LoadingOverlay label="Redirecting" />;
  }

  return children;
}
