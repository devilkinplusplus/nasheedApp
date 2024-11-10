export class HadithResponse { 
    data:Data;    
}

class Data {
    data:HadithData;
}

export class HadithData {
    id:number;
    chapterName:string;
    hadith_english:string;
    header:string;
    book:string;
    refno:string;
}
