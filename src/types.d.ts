import { IAudioMetadata } from 'music-metadata';

export interface ISongData {
  metaData: IAudioMetadata;
  src: string;
}

export interface emotionSong {
  song: ISongData;
  emotion: string;
}

export interface Emotion {
  icon: JSX.Element;
  name: string;
}
