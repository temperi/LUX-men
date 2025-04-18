
import { useState } from "react";

export const useAdminAuth = () => {
  const [isAdmin] = useState(true); // Always return true
  const [isLoading] = useState(false);
  const [userId] = useState<string | null>(null);

  return { isAdmin, isLoading, userId };
};
