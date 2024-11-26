import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

type User = Models.Document;

type GlobalContextType = {
  user?: User | null;
  setUser?: (user: any) => void;
  isAuthenticated?: boolean;
  setIsAuthenticated?: (isAuthenticated: boolean) => void;
  isLoading?: boolean;
  setIsLoading?: (isLoading: boolean) => void;
};

export const GlobalContext = createContext<GlobalContextType>({});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  // states
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user) {
          setIsAuthenticated(true);
          setUser(user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
