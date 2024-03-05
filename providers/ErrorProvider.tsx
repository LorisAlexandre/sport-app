"use client";

import { ToastError } from "@/components/ui/ToastError";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ErrorContextType {
  message?: string;
  setMessage: Dispatch<SetStateAction<string | undefined>> | undefined;
  statusCode?: number;
  setStatusCode: Dispatch<SetStateAction<number | undefined>> | undefined;
}

export const ErrorContext = createContext<ErrorContextType>({
  setMessage: undefined,
  setStatusCode: undefined,
});

export const useErrorProvider = () => {
  const router = useRouter();
  const { setMessage, setStatusCode, message, statusCode } =
    useContext(ErrorContext);
  const [isClosing, setIsClosing] = useState(false);

  if (!setMessage || !setStatusCode) {
    throw new Error("setMessage || setStatusCode is undefined");
  }

  const eraseError = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMessage(undefined);
      setStatusCode(undefined);
    }, 1000);
  };

  const handleRedirect = (redirectTo: string) => {
    setTimeout(() => {
      router.push(redirectTo);
    }, 1000);
  };

  return {
    setMessage,
    setStatusCode,
    message,
    statusCode,
    eraseError,
    isClosing,
    handleRedirect,
  };
};

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | undefined>();
  const [statusCode, setStatusCode] = useState<number | undefined>();

  const contextValue: ErrorContextType = {
    setMessage,
    setStatusCode,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {message && statusCode && (
        <ToastError message={message} statusCode={statusCode} />
      )}
      {children}
    </ErrorContext.Provider>
  );
};
