import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Backdrop,
  CircularProgress,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Select from "react-select";
import { AxiosResponse } from "axios";
import { useAudioContext } from "../../services/contexts/AudioContext";
import { getNasheedsAsync } from "../../services/apis/nasheedService";
import {
  createPlaylistAsync,
  getMyPlaylistsAsync,
} from "../../services/apis/playlistService";
import {
  CreatePlaylistDto,
  PlaylistResponse,
} from "../../services/responseTypes/playlistResponse";
import { NasheedResponse } from "../../services/responseTypes/nasheedResponse";
import { getUserIdFromToken } from "../../services/utilities/tokenUtilities";
import ToastService from "../../services/common/toastService";
import OneNasheed from "../nasheeds/OneNasheed";
import Slider from "react-slick";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Use percentage for responsiveness
  maxWidth: 900, // Set a maximum width if needed
  bgcolor: "#101010",
  color: "white",
  borderRadius: 4,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 300,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function PlayList() {
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState<PlaylistResponse[]>([]);
  const userId = getUserIdFromToken();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [nasheedOptions, setNasheedOptions] = useState<any[]>([]);

  const getNasheeds = useCallback(async () => {
    try {
      const res: AxiosResponse<NasheedResponse[]> = await getNasheedsAsync();
      const options = res.data.map((nasheed) => ({
        value: nasheed.id,
        label: nasheed.title,
        path: nasheed.audioPath,
        cover: nasheed.coverImage,
      }));
      setNasheedOptions(options);
    } catch (error) {
      console.error("Error fetching nasheeds:", error);
    }
  }, []);

  const getMyPlaylists = useCallback(async () => {
    setLoading(true);
    try {
      const res: AxiosResponse<PlaylistResponse[]> =
        await getMyPlaylistsAsync();
      if (res.data) {
        setPlaylists(res.data);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getNasheeds();
    getMyPlaylists();
  }, [getNasheeds, getMyPlaylists]);

  const handleChange = (selected: any) => {
    setSelectedOptions(selected);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    setLoading(true);
    const model: CreatePlaylistDto = {
      title,
      userId,
      nasheedids: selectedOptions.map((val) => val.value),
    };

    try {
      const res: AxiosResponse<any> = await createPlaylistAsync(model);
      if (!res.data.succeeded) {
        res.data.errors.forEach((error: string) => ToastService.error(error));
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center font-squada p-8">
        <h2 className="text-4xl sm:text-5xl uppercase mb-4 sm:mb-0 sm:mr-2 px-6">
          My Playlists
        </h2>
        <button
          type="button"
          onClick={handleClickOpen}
          className="py-2 px-3 bg-green-700 hover:bg-green-600 duration-300 rounded-md mb-4 sm:mb-0"
        >
          Create Playlist
        </button>
        <Modal open={open} onClose={handleClose} closeAfterTransition>
          <Fade in={open}>
            <Box sx={style}>
              <Typography variant="h6">New Playlist</Typography>
              <TextField
                label="Title"
                variant="standard"
                fullWidth
                onChange={(e) => setTitle(e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: { color: "white" }, // Changes the text color
                }}
              />
              <Select
                isMulti
                options={nasheedOptions}
                value={selectedOptions}
                onChange={handleChange}
                placeholder="Select your favourites"
                className="text-black mt-4"
              />
              <button
                type="button"
                onClick={handleCreate}
                className="mt-4 ml-1 py-1 px-3 rounded-md bg-green-700 text-white hover:bg-green-600"
              >
                Create
              </button>
            </Box>
          </Fade>
        </Modal>
      </div>

      <div className="px-8 pb-8">
        {playlists?.map((playlist) => (
          <div key={playlist.id} className="mb-6">
            <h3 className="text-3xl sm:text-4xl font-squada uppercase">{playlist?.title}</h3>
            <Slider {...sliderSettings} className="w-[300px] md:w-[600px] lg:w-[1050px] px-0 md:px-1 lg:px-2">
              {playlist?.nasheeds.map((nasheed, index) => (
                <div key={index}>
                  <OneNasheed
                    audioSrc={nasheed?.audioPath}
                    coverImg={nasheed?.coverImage}
                    index={index}
                    isPlaylist={true}
                    playlistElements={playlist?.nasheeds}
                    title={nasheed?.title}
                  />
                </div>
              ))}
            </Slider>
          </div>
        ))}
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default PlayList;
