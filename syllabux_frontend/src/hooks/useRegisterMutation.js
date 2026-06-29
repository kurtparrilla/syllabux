import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/authService";

export function useRegisterMutation(options = {}) {
  return useMutation({
    mutationFn: registerUser,
    ...options,
  });
}
