import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useEffect } from "react";
import { formatTime } from "../../services/functions/formatTime";
import { useAudioContext } from "../../services/contexts/AudioContext";
import AudioProgressBar from "./AudioProgressBar";

function AudioPlay() {
  const {
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    audioRef,
    audioSrc,
    currentAudioTitle,
    setCurrentAudioTitle,
    playlist,
    currentAudioIndex,
    setCurrentAudioIndex,
    setAudioSrc,
    audioType,
  } = useAudioContext();

  const handleRangeChange = (event) => {
    const audio = audioRef.current;
    const newTime = (event.target.value / 100) * duration;
    setCurrentTime(newTime);
    audio.currentTime = newTime;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audioSrc && audio) {
      if (audio.src !== audioSrc) {
        audio.load(); // Reload the audio element when the src changes
      }
      if (isPlaying) {
        audio.play();
      }
    }

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleAudioEnd = () => {
      if (currentAudioIndex !== null) {
        const nextIndex = currentAudioIndex + 1;
        if (nextIndex < playlist.length) {
          setCurrentAudioIndex(nextIndex);
          setAudioSrc(playlist[nextIndex].audioPath);
          setCurrentAudioTitle(playlist[nextIndex].title);
          setIsPlaying(true);
        } else {
          setIsPlaying(false); // Stop playing if at the end of the playlist
        }
      }
    };

    audio?.addEventListener("timeupdate", updateTime);
    audio?.addEventListener("loadedmetadata", updateDuration);
    audio?.addEventListener("ended", handleAudioEnd);

    return () => {
      audio?.removeEventListener("timeupdate", updateTime);
      audio?.removeEventListener("loadedmetadata", updateDuration);
      audio?.removeEventListener("ended", handleAudioEnd);
    };
  }, [audioSrc, isPlaying]);

  const playPauseHandler = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        setIsPlaying(true);
        audio.play();
      } else {
        setIsPlaying(false);
        audio.pause();
      }
    }
  };

  // Calculate progress percentage
  const progressPercentage: number = (currentTime / duration) * 100;

  return (
    <div className="w-full bg-gradient-to-r from-black-bg to-black-light text-gray-300 shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-2xl font-squada mb-2 text-center uppercase">
          {audioType === "surah"
            ? "Surah "
            : audioType === "nasheed"
            ? "Nasheed "
            : ""}
          {currentAudioTitle ? currentAudioTitle : "Audio Title"}
        </h3>

        <div className="flex items-center justify-between">
          <button
            className="text-4xl font-squada mb-1 focus:outline-none transform transition-transform duration-300 hover:scale-110"
            type="button"
            onClick={playPauseHandler}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </button>

          <AudioProgressBar
            progressPercentage={progressPercentage}
            handleRangeChange={handleRangeChange}
          />

          {/* Set the src dynamically */}
          <audio ref={audioRef} src={audioSrc}></audio>

          <button className="text-xl mb-7 focus:outline-none">
            <div className="text-white -mb-28 text-center font-squada">
              {formatTime(currentTime)}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AudioPlay;
