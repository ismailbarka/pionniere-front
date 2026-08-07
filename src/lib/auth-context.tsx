"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { getErrorMessage, request } from "./api";
import type { Status, User } from "./types";

type AuthContextValue = {
  token: string;
  user: User | null;
  status: Status;
  message: string;
  isInitializing: boolean;
  isBusy: boolean;
  authHeaders: Record<string, string>;
  setMessage: (message: string) => void;
  setStatus: (status: Status) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  completeProfile: (username: string, schoolLevel: number) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  logout: () => void;
  apiRequest: <T>(path: string, options?: RequestInit) => Promise<T>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);

  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    [token],
  );

  const apiRequest = useCallback(
    async <T,>(path: string, options: RequestInit = {}) => {
      return request<T>(path, options);
    },
    [],
  );

  const persistSession = useCallback((accessToken: string, nextUser: User) => {
    setToken(accessToken);
    setUser(nextUser);
    window.localStorage.setItem("edu_token", accessToken);
    window.localStorage.setItem("edu_user", JSON.stringify(nextUser));
  }, []);

  const clearSession = useCallback(() => {
    window.localStorage.removeItem("edu_token");
    window.localStorage.removeItem("edu_user");
    setToken("");
    setUser(null);
    setMessage("");
  }, []);

  const logout = useCallback(() => {
    clearSession();
    router.push("/login");
  }, [clearSession, router]);

  const routeAfterLogin = useCallback(
    async (_accessToken: string, nextUser: User, _requiresPlacementTest: boolean, nextStep: string) => {
      if (!nextUser.profileCompleted || nextStep === "complete-profile") {
        router.push("/complete-profile");
        return;
      }

      if (nextStep === "admin" || nextUser.role === "ADMIN") {
        router.push("/admin/subjects");
        return;
      }

      router.push("/subjects");
    },
    [router],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      setStatus("loading");
      setMessage("");

      try {
        const data = await request<{
          accessToken: string;
          requiresPlacementTest: boolean;
          profileCompleted: boolean;
          nextStep: string;
          user: User;
        }>("/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        persistSession(data.accessToken, data.user);
        await routeAfterLogin(
          data.accessToken,
          data.user,
          data.requiresPlacementTest,
          data.nextStep,
        );
      } catch (error) {
        setMessage(getErrorMessage(error));
        throw error;
      } finally {
        setStatus("idle");
      }
    },
    [persistSession, routeAfterLogin],
  );

  const register = useCallback(
    async (email: string, password: string) => {
      setStatus("loading");
      setMessage("");

      try {
        const res = await request<{ message: string }>("/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        setMessage(res.message);
      } catch (error) {
        setMessage(getErrorMessage(error));
        throw error;
      } finally {
        setStatus("idle");
      }
    },
    [],
  );

  const googleLogin = useCallback(
    async (idToken: string) => {
      setStatus("loading");
      setMessage("");

      try {
        const data = await request<{
          accessToken: string;
          requiresPlacementTest: boolean;
          profileCompleted: boolean;
          nextStep: string;
          user: User;
        }>("/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });

        persistSession(data.accessToken, data.user);
        await routeAfterLogin(
          data.accessToken,
          data.user,
          data.requiresPlacementTest,
          data.nextStep,
        );
      } catch (error) {
        setMessage(getErrorMessage(error));
        throw error;
      } finally {
        setStatus("idle");
      }
    },
    [persistSession, routeAfterLogin],
  );

  const completeProfile = useCallback(
    async (username: string, schoolLevel: number) => {
      setStatus("loading");
      setMessage("");

      try {
        const data = await request<{
          profileCompleted: boolean;
          requiresPlacementTest: boolean;
          nextStep: string;
          user: User;
        }>("/auth/complete-profile", {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify({ username, schoolLevel }),
        });

        setUser(data.user);
        window.localStorage.setItem("edu_user", JSON.stringify(data.user));

        await routeAfterLogin(
          token,
          data.user,
          data.requiresPlacementTest,
          data.nextStep,
        );
      } catch (error) {
        setMessage(getErrorMessage(error));
        throw error;
      } finally {
        setStatus("idle");
      }
    },
    [authHeaders, token, routeAfterLogin],
  );

  const resendVerification = useCallback(
    async (email: string) => {
      setStatus("loading");
      setMessage("");
      try {
        const res = await request<{ message: string }>("/auth/resend-verification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        setMessage(res.message);
      } catch (error) {
        setMessage(getErrorMessage(error));
        throw error;
      } finally {
        setStatus("idle");
      }
    },
    [],
  );

  useEffect(() => {
    let active = true;

    void (async () => {
      const savedToken = window.localStorage.getItem("edu_token");
      const savedUser = window.localStorage.getItem("edu_user");

      if (!savedToken || !savedUser) {
        if (active) setIsInitializing(false);
        return;
      }

      const parsedUser = JSON.parse(savedUser) as User;
      if (!active) return;
      setToken(savedToken);
      setUser(parsedUser);

      try {
        if (!parsedUser.profileCompleted) {
          router.replace("/complete-profile");
        } else if (parsedUser.role === "ADMIN") {
          router.replace("/admin/subjects");
        } else {
          router.replace("/subjects");
        }
      } finally {
        if (active) setIsInitializing(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [router]);

  const value = useMemo(
    () => ({
      token,
      user,
      status,
      message,
      isInitializing,
      isBusy: status === "loading",
      authHeaders,
      setMessage,
      setStatus,
      login,
      register,
      googleLogin,
      completeProfile,
      resendVerification,
      logout,
      apiRequest,
    }),
    [
      token,
      user,
      status,
      message,
      isInitializing,
      authHeaders,
      login,
      register,
      googleLogin,
      completeProfile,
      resendVerification,
      logout,
      apiRequest,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
