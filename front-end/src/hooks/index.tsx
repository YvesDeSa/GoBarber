import React from "react";

import { AuthProvider } from "./auth";
import { ToastProvider } from "./toast";

export const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  );
}; 