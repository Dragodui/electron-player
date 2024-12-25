import { IAudioMetadata } from "music-metadata";

export interface ISongData {
  metaData: IAudioMetadata;
  src: string;
}