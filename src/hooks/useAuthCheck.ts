import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../store";
// import { User } from "../types/user";
import { setProfile } from "../store/slices/user";
import useApiRequest from "./useApiRequest";
import type { RootState } from "@/store";
import type { User } from "@/types/user";
export const useAuthCheck = () => {
   const api = useApiRequest();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.userData);
  const [user, setUser] = useState<{ token: string; role: string | undefined; } | null>(null);
  const [loading, setLoading] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  let debounceTimeout: NodeJS.Timeout;

  useEffect(() => {
    const checkAuth = async () => {
      const token = profile.token
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Cancel any ongoing request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create a new abort controller for the current request
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        let role: string | undefined;
        if (profile && profile.role) {
          role = profile.role;
        } else {
          // Fetch user profile with the abort signal
          const response = await api.get<User>("/users/profile", {
            signal: abortController.signal,
          });
          dispatch(setProfile({token, role: response.data?.role, user: response.data }));
          role = response.data?.role;
        }

        setUser({ token, role });
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Invalid JWT Token", error);
        }
      } finally {
        setLoading(false);
      }
    };

    // Debounce the API call
    debounceTimeout = setTimeout(() => {
      checkAuth();
    }, 100); // 1500ms debounce delay

    // Cleanup on unmount or dependency change
    return () => {
      clearTimeout(debounceTimeout);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [dispatch, profile]);

  return { user, loading };
};
