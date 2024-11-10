import { NasheedResponse } from "./nasheedResponse";

export class PlaylistResponse {
  id: string;
  title: string;
  nasheeds: NasheedResponse[];
}

export class CreatePlaylistDto {
  title:string;
  userId:string;
  nasheedids:string[];
}

export class CreatePlaylistResponse {
  succeeded:Boolean;
  errors:string[];
}