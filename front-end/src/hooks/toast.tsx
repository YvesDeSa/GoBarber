import React, { createContext, useCallback, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { ToastContainer } from "../components/ToastContainer";

interface IToastContextData {
  addToast(message: Omit<IToastMessage, 'id'>): void;
  removeToast(id: string): void;
};

export interface IToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
};

const ToastContext = createContext<IToastContextData>({} as IToastContextData);

export const ToastProvider: React.FC = ({ children }) => {

  const [messages, setMessages] = useState<IToastMessage[]>([]);

  const addToast = useCallback(({ title, type, description }: Omit<IToastMessage, 'id'>) => {
    const id = uuidV4();

    const toast = {
      id,
      title,
      type,
      description
    };

    setMessages(state => [...state, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }} >
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export function useToast(): IToastContextData {
  const context = useContext(ToastContext);

  if (!context)
    throw new Error('useToast must be used within an ToastProvider');

  return context;
};