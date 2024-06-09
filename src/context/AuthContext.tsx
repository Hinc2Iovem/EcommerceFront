import { ReactNode, createContext, useState } from "react";

type AuthContextTypes = {
  auth: {
    accessToken: string;
  };
  setAuth: React.Dispatch<React.SetStateAction<{ accessToken: string }>>;
};

const AuthContext = createContext({} as AuthContextTypes);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({ accessToken: "" });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
