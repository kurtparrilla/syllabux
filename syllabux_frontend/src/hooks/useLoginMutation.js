import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../auth/authContext";

export function useLoginMutation(options = {}) {
  const { login } = useAuth();

  return useMutation({
    mutationFn: login,
    ...options,
  });
}
