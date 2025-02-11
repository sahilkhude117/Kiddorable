// contexts/UserContext.tsx
"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

// Define the shape of the user info
interface UserInfo {
  purchases: {
    id: string;
  }[];
}

// Define the shape of the context value
interface UserContextType {
  userInfo: UserInfo | null; // Can be null if not authenticated or loading
  loading: boolean;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`)
        .then((res) => {
          setUserInfo(res.data.userInfo);
        })
        .catch((err) => {
          console.error('Failed to fetch user info:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [status]);

  return (
    <UserContext.Provider value={{ userInfo, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};