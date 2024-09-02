import React, { createContext, useState, useEffect, useContext } from "react";

interface AuthContextProps {
  authToken: string | null;
  setAuthToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );

  useEffect(() => {
    if (authToken) return localStorage.setItem("authToken", authToken);

    localStorage.removeItem("authToken");
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
