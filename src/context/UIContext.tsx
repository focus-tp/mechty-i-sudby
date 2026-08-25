import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextProps {
  toastMsg: string | null;
  showToast: (msg: string) => void;
  /** true, когда Hero-секция видима — управляет тёмной темой navbar */
  isHeroVisible: boolean;
  setHeroVisible: (v: boolean) => void;
}

export const UIContext = createContext<ModalContextProps>({} as any);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isHeroVisible, setHeroVisible] = useState(true);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  return (
    <UIContext.Provider
      value={{
        toastMsg,
        showToast,
        isHeroVisible,
        setHeroVisible,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
