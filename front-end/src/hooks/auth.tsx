import React, { createContext, useCallback, useState, useContext } from "react";
import api from '../services/api'

interface ISignInCredentials {
  email: string;
  password: string;
};

interface IAuthState {
  token: string;
  user: object;
};

interface IAuthContent {
  user: object;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
};

const AuthContent = createContext<IAuthContent>({} as IAuthContent);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user)
      return { token, user: JSON.parse(user) };

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }: ISignInCredentials) => {
    const response = await api.post('sessions', {
      email,
      password
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContent.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContent.Provider>
  );
};

export default function useAuth(): IAuthContent {
  const context = useContext(AuthContent);

  if (!context)
    throw new Error('useAuth must be used within an AutheProvider');

  return context;
};