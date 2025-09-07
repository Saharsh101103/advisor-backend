import { AuthProvider } from "@/lib/types/generated";
import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      provider: AuthProvider;
      accessToken?: string;
      refreshToken?: string;
    }
  }
}
