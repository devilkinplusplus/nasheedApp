import axios from "axios";
import { PrayerTimeResponse } from "../responseTypes/prayerTimeResponse";
import { currentDate } from "../functions/formatTime";

const axiosInstance = axios.create({
  baseURL: `https://api.aladhan.com/v1/timings/${currentDate}?latitude=40.368286&longitude=49.837888?method=13`,
});


export const getDailyPrayerTimes = async ():Promise<PrayerTimeResponse> =>{
    return axiosInstance.get("")
}
