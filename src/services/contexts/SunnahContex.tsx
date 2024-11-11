import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
  } from "react";
import { SunnahResponse } from "../responseTypes/sunnahResponse";
  
  // Define the context type
  interface SunnahContextType {
    sunnahList: SunnahResponse[];
    setSunnahList: React.Dispatch<React.SetStateAction<SunnahResponse[]>>;
  }
  
  // Create the context
  const SunnahContext = createContext<SunnahContextType | undefined>(undefined);
  
  // Provider component
  export const SunnahProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [sunnahList, setSunnahList] = useState<SunnahResponse[]>([]);
  
    return (
      <SunnahContext.Provider
        value={{
          sunnahList,
          setSunnahList,
        }}
      >
        {children}
      </SunnahContext.Provider>
    );
  };
  
  // Custom hook to use the SurahContext
  export const useSunnahContext = (): SunnahContextType => {
    const context = useContext(SunnahContext);
    if (!context) {
      throw new Error("useSunnahContext must be used within a SunnahProvider");
    }
    return context;
  };
  