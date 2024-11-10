import axios from "axios";
import { SurahResponse, SurahsResponse } from "../responseTypes/surahResponse";

const axiosInstance = axios.create({
  baseURL: `https://quranapi.pages.dev/api/`,
});

export const getSurahAudioBySurahNo = (surahNo : number)   => {
  return `https://res.cloudinary.com/dkztbgvkq/video/upload/v1731001356/surah_${surahNo}.mp3`
}


export const getSurahAsync = async (id: string): Promise<SurahResponse> => {
  return axiosInstance.get(`${id}.json`);
};

export const getAllSurahsAsync = async () : Promise<SurahsResponse> => {
  return axiosInstance.get("surah.json")
}