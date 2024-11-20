import { useAudioContext } from "../../services/contexts/AudioContext";
import { AudioType } from "../../services/responseTypes/audioType";

function OneNasheed({ audioSrc, title ,index, isPlaylist,coverImg, playlistElements }) {
  const {
    isPlaying,
    setIsPlaying,
    setAudioSrc,
    audioRef,
    currentAudioIndex,
    setCurrentAudioIndex,
    setCurrentAudioTitle,
    setPlaylist,
    setAudioType
  } = useAudioContext();



  const playPauseHandler = () => {
    const audio = audioRef.current;

    if(playlistElements){
      setPlaylist(playlistElements)
    }
    //! If the audio is not clicked in playlist, play specifically
    if(!isPlaylist){
      setPlaylist([])
    }
    
    
    if (audio.src !== audioSrc) {
      setAudioSrc(audioSrc);
      setCurrentAudioIndex(index); //for making components specific
      setCurrentAudioTitle(title); //for specific audio title's
      setAudioType(AudioType.Nasheed)

      audio.load(); 
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    } else {
      if (audio.paused) {
        setIsPlaying(true);
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        setIsPlaying(false);
        audio.pause();
      }
    }

    // If this audio is not the current audio, pause it
    if (currentAudioIndex !== null && currentAudioIndex !== index) {
      audio.pause(); 
      setCurrentAudioIndex(index);
      setIsPlaying(true);
    }
  };
  

  return (
    <div className="h-[200px] sm:h-[300px] w-[115px] sm:w-[120px] md:w-[140px] lg:w-[160px] bg-[#15151580] rounded-lg p-2 md:p-4 my-2 hover:bg-[#282828] transition-all duration-300 group">
      <div className="mb-4 relative w-[128px] h-[112px]">
        <img
          src={coverImg}
          alt="cat"
          className="rounded drop-shadow-2xl mx-auto w-[99px] md:w-full h-full object-cover object-center"
        />
        <button
          onClick={playPauseHandler}
          className="p-3 text-3xl rounded-full bg-[#1DB954] text-gray-200 absolute -right-3 -bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 ease-out"
        >
          {isPlaying && currentAudioIndex === index ? (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="0.5em"
              width="0.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 19H10V5H6V19ZM14 19H18V5H14V19Z"></path>
            </svg>
          ) : (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="0.5em"
              width="0.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.376 12.4158L8.77735 19.4816C8.54759 19.6348 8.23715 19.5727 8.08397 19.3429C8.02922 19.2608 8 19.1643 8 19.0656V4.93408C8 4.65794 8.22386 4.43408 8.5 4.43408C8.59871 4.43408 8.69522 4.4633 8.77735 4.51806L19.376 11.5838C19.6057 11.737 19.6678 12.0474 19.5146 12.2772C19.478 12.3321 19.4309 12.3792 19.376 12.4158Z"></path>
            </svg>
          )}
        </button>
      </div>
      <div className="font-squada text-center">
        <h5 className="text-gray-100 mb-2 text-xl uppercase">{title}</h5>
      </div>
    </div>
  );
}

export default OneNasheed;
