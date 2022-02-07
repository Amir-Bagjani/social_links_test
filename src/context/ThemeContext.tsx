import { createContext, useState } from "react";


type ThemeContextType = {
    themeMode: string
    setThemeMode: React.Dispatch<React.SetStateAction<string>>
}
type ThemeContextProviderProps = {
    children: React.ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const[themeMode,setThemeMode] = useState<string>(`light`)
  return (
      <ThemeContext.Provider value={{themeMode, setThemeMode}}>
        {children}
      </ThemeContext.Provider>
    );
};
