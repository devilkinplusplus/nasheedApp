export class PrayerTimeResponse {
  code: number;
  status:number;
  data: Data;
}

class Data {
  code: number;
  status:number;
  data: DataResponse;
}

class DataResponse {
  timings: TimingsResponse;
}

export class TimingsResponse {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
}


