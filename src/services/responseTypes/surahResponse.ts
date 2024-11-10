export class SurahResponse {
  data: DataResponse;
}
export class SurahsResponse {
  data: DataResponse[];
}

export class DataResponse {
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong:string;
  surahNameTranslation: string;
  revelationPlace: string;
  totalAyah: number;
  surahNo: number;
  english: string[];
  arabic1: string[];
  arabic2: string[];
}
