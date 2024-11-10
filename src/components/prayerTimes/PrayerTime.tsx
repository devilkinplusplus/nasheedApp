import React, { useEffect, useState } from "react";
import { PrayerTimeResponse, TimingsResponse } from "../../services/responseTypes/prayerTimeResponse";
import { timeDifference } from "../../services/functions/timeDifference";
import { currentDate } from "../../services/functions/formatTime";
import { currentHijriDate } from "../../services/functions/formatTime";
import { getDailyPrayerTimes } from "../../services/apis/prayerTimeService";
import Skeleton from "@mui/material/Skeleton";

function PrayerTime() {
  const [prayerTime, setPrayerTime] = useState<TimingsResponse | null>(null);
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const dailyPrayerTimes: PrayerTimeResponse = await getDailyPrayerTimes();
        setPrayerTime(dailyPrayerTimes.data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  useEffect(() => {
    if (prayerTime) {
      const prayerTimes: string[] = [
        prayerTime.Fajr,
        prayerTime.Dhuhr,
        prayerTime.Asr,
        prayerTime.Maghrib,
        prayerTime.Isha,
      ];

      const updateCountdown = () => {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

        for (let i = 0; i < prayerTimes.length; i++) {
          if (currentTime < prayerTimes[i]) {
            setNextPrayer(prayerTimes[i]);
            setTimeLeft(timeDifference(currentTime, prayerTimes[i]));
            return;
          }
        }

        setNextPrayer(prayerTimes[0]);
        setTimeLeft(timeDifference(currentTime, prayerTimes[0]));
      };

      updateCountdown();
      const interval = setInterval(() => {
        updateCountdown();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [prayerTime]);

  return (
    <div className="w-full p-6 md:p-8 uppercase font-squada flex flex-col justify-center items-center">
      <h2 className="tracking-wider text-3xl md:text-4xl mb-2">Next prayer in</h2>
      {loading ? (
        <Skeleton variant="text" width="200px" height="64px" />
      ) : (
        <span className="text-5xl md:text-6xl">
          {timeLeft
            ? `${timeLeft.hours.toString().padStart(2, "0")}:${timeLeft.minutes.toString().padStart(2, "0")}:${timeLeft.seconds.toString().padStart(2, "0")}`
            : "00:00:00"}
        </span>
      )}
      <p className="text-lg md:text-xl">{currentDate()}</p>
      <p className="text-md md:text-lg">{currentHijriDate()}</p>

      <div className="flex flex-wrap justify-center gap-4 mt-5">
        {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((prayer, index) => (
          <div key={prayer} className="flex flex-col items-center p-4 border border-gray-300 rounded-2xl w-32 sm:w-40 cursor-pointer">
            <span className="text-xl md:text-2xl">{prayer}</span>
            {loading ? (
              <Skeleton variant="text" width="100%" height="48px" />
            ) : (
              <h3 className="text-4xl md:text-6xl">{prayerTime ? prayerTime[prayer as keyof TimingsResponse] : "N/A"}</h3>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrayerTime;
