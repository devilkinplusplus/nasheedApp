import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import { DataResponse } from "../responseTypes/surahResponse";
import { getAllSurahsAsync } from "../apis/surahService";
  
  // Define the context type
  interface SurahContextType {
    surahList: DataResponse[];
    setSurahList: React.Dispatch<React.SetStateAction<DataResponse[]>>;
  }
  
  // Create the context
  const SurahContext = createContext<SurahContextType | undefined>(undefined);
  
  // Provider component
  export const SurahProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [surahList, setSurahList] = useState<DataResponse[]>([]);

    useEffect(() => {
      const fetchSurahs = async () => {
        try {
          const getAllSurahs = await getAllSurahsAsync();
          setSurahList(getAllSurahs.data);
        } catch (error) {
          console.error("Error fetching surahs:", error);
        } finally {
        }
      };
  
      fetchSurahs();
    }, [setSurahList]);
  
  
    return (
      <SurahContext.Provider
        value={{
          surahList,
          setSurahList,
        }}
      >
        {children}
      </SurahContext.Provider>
    );
  };
  
  // Custom hook to use the SurahContext
  export const useSurahContext = (): SurahContextType => {
    const context = useContext(SurahContext);
    if (!context) {
      throw new Error("useSurahContext must be used within a SurahProvider");
    }
    return context;
  };
  