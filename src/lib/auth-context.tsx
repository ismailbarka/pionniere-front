"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { API_URL, getErrorMessage, request } from "./api";
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
  authFetch: (path: string, options?: RequestInit) => Promise<Response>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const refreshPromiseRef = useRef<Promise<string | null> | null>(null);

  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    [token],
  );

  const persistSession = useCallback((accessToken: string, refreshToken: string, nextUser: User) => {
    setToken(accessToken);
    setUser(nextUser);
    window.localStorage.setItem("edu_token", accessToken);
    window.localStorage.setItem("edu_refresh_token", refreshToken);
    window.localStorage.setItem("edu_user", JSON.stringify(nextUser));
  }, []);

  const clearSession = useCallback(() => {
    window.localStorage.removeItem("edu_token");
    window.localStorage.removeItem("edu_refresh_token");
    window.localStorage.removeItem("edu_user");
    setToken("");
    setUser(null);
    setMessage("");
  }, []);

  const logout = useCallback(() => {
    const refreshToken = window.localStorage.getItem("edu_refresh_token");
    if (refreshToken) {
      void fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }).catch(() => undefined);
    }
    clearSession();
    router.push("/login");
  }, [clearSession, router]);

  const refreshAccessToken = useCallback(async () => {
    if (refreshPromiseRef.current) return refreshPromiseRef.current;

    const refreshToken = window.localStorage.getItem("edu_refresh_token");
    if (!refreshToken) return null;

    refreshPromiseRef.current = (async () => {
      try {
        const data = await request<{
          accessToken: string;
          refreshToken: string;
          user: User;
        }>("/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });
        persistSession(data.accessToken, data.refreshToken, data.user);
        return data.accessToken;
      } catch {
        clearSession();
        router.replace("/login");
        return null;
      } finally {
        refreshPromiseRef.current = null;
      }
    })();

    return refreshPromiseRef.current;
  }, [clearSession, persistSession, router]);

  const authFetch = useCallback(
    async (path: string, options: RequestInit = {}) => {
      const headers = new Headers(options.headers);
      const currentToken = window.localStorage.getItem("edu_token") || token;
      if (currentToken) headers.set("Authorization", `Bearer ${currentToken}`);
      if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");

      let response = await fetch(`${API_URL}${path}`, { ...options, headers });
      if (response.status !== 401 || path === "/auth/refresh") return response;

      const nextToken = await refreshAccessToken();
      if (!nextToken) return response;

      const retryHeaders = new Headers(options.headers);
      retryHeaders.set("Authorization", `Bearer ${nextToken}`);
      if (options.body && !retryHeaders.has("Content-Type")) retryHeaders.set("Content-Type", "application/json");
      response = await fetch(`${API_URL}${path}`, { ...options, headers: retryHeaders });
      return response;
    },
    [refreshAccessToken, token],
  );

  const apiRequest = useCallback(
    async <T,>(path: string, options: RequestInit = {}) => {
      const response = await authFetch(path, options);
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        const text = Array.isArray(data?.message) ? data.message.join(", ") : data?.message;
        throw new Error(text || "Request failed");
      }
      return data as T;
    },
    [authFetch],
  );

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
          refreshToken: string;
          requiresPlacementTest: boolean;
          profileCompleted: boolean;
          nextStep: string;
          user: User;
        }>("/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        persistSession(data.accessToken, data.refreshToken, data.user);
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
          refreshToken: string;
          requiresPlacementTest: boolean;
          profileCompleted: boolean;
          nextStep: string;
          user: User;
        }>("/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });

        persistSession(data.accessToken, data.refreshToken, data.user);
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
        const response = await authFetch("/auth/complete-profile", {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify({ username, schoolLevel }),
        });
        const data = await response.json().catch(() => null) as {
          profileCompleted: boolean;
          requiresPlacementTest: boolean;
          nextStep: string;
          user: User;
        };
        if (!response.ok) throw new Error(data?.user ? "Unable to complete profile" : "Unable to complete profile");

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
    [authFetch, authHeaders, token, routeAfterLogin],
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
      const savedRefreshToken = window.localStorage.getItem("edu_refresh_token");

      if (!savedToken || !savedUser || !savedRefreshToken) {
        if (savedToken || savedUser) clearSession();
        if (active) setIsInitializing(false);
        return;
      }

      let parsedUser: User;
      try {
        parsedUser = JSON.parse(savedUser) as User;
      } catch {
        clearSession();
        if (active) setIsInitializing(false);
        return;
      }
      if (!active) return;
      try {
        const refreshedToken = await refreshAccessToken();
        if (!refreshedToken || !active) return;
        const refreshedUser = JSON.parse(window.localStorage.getItem("edu_user") || JSON.stringify(parsedUser)) as User;
        setToken(refreshedToken);
        setUser(refreshedUser);

        if (!refreshedUser.profileCompleted) {
          router.replace("/complete-profile");
        } else if (refreshedUser.role === "ADMIN") {
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
  }, [clearSession, refreshAccessToken, router]);

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
      authFetch,
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
      authFetch,
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
