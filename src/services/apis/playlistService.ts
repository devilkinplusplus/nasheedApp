import axios from "axios";
import { PlaylistResponse, CreatePlaylistDto } from '../responseTypes/playlistResponse';

const axiosInstance = axios.create({
  baseURL: `https://nasheedapp-cbecgwc8hjhrctgu.canadacentral-01.azurewebsites.net/`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("accessToken");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createPlaylistAsync = async (model: CreatePlaylistDto) => { 
  return axiosInstance.post("api/playlists/",model);
}

export const getMyPlaylistsAsync = async ()  => {
  return axiosInstance.get("myPlaylists")
}


