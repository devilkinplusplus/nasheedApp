import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import { AudioType } from "../responseTypes/audioType";
import { NasheedResponse } from "../responseTypes/nasheedResponse";

interface AudioContextType {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  setAudioRef: (ref: HTMLAudioElement | null) => void;
  audioSrc: string;
  setAudioSrc: React.Dispatch<React.SetStateAction<string>>;
  currentAudioIndex: number | null;
  setCurrentAudioIndex: React.Dispatch<React.SetStateAction<number | null>>;
  currentAudioTitle:string | null;
  setCurrentAudioTitle:React.Dispatch<React.SetStateAction<string | null>>;
  playlist: NasheedResponse[];
  setPlaylist: React.Dispatch<React.SetStateAction<NasheedResponse[]>>;
  audioType: AudioType | null;
  setAudioType: React.Dispatch<React.SetStateAction<AudioType | null>>;
  
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Provider component
export const AudioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number | null>(null);
  const [currentAudioTitle, setCurrentAudioTitle] = useState<string | null>(null);
  const setAudioRef = (ref: HTMLAudioElement | null) => {
    audioRef.current = ref; // Set the current audio ref
  };
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [playlist, setPlaylist] = useState<NasheedResponse[]>([]);
  const [audioType,setAudioType] = useState<AudioType | null>(null);

   

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        audioRef,
        setAudioRef,
        audioSrc,
        setAudioSrc,
        currentAudioIndex,
        setCurrentAudioIndex,
        currentAudioTitle,
        setCurrentAudioTitle,
        playlist,
        setPlaylist,
        audioType,
        setAudioType,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
};
