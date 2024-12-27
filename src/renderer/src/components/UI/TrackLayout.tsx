import { FC, useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { ISongData } from '../../../../types';
import Button from './Button';
import { Heart } from 'lucide-react';

interface TrackLayoutProps {
  song: ISongData;
  onClick: () => void;
  addStyles?: string;
}

const TrackLayout: FC<TrackLayoutProps> = ({ song, onClick, addStyles }): JSX.Element => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const api = (window as any).api;

  const ToggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.stopPropagation();
      await api.toggleFavorite(song.src);
      await checkIfFavorite();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const picture = song.metaData.common.picture;

    if (picture && picture.length > 0) {
      const albumCover = picture[0];
      const base64Image = Buffer.from(albumCover.data).toString('base64');
      const mimeType = albumCover.format || 'image/jpeg';

      const imageSrc = `data:${mimeType};base64,${base64Image}`;
      setImageSrc(imageSrc);
    }
  }, [song]);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    try {
      const isFav = await api.checkIfFavorite(song.src);
      console.log(isFav);
      setIsFavorite(isFav);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDuration = (duration: number | undefined) => {
    if (!duration) return '00:00';
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex items-center w-full gap-4 text-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${addStyles}`}
    >
      <div className="flex-shrink-0 w-11 h-11 sm:w-11 sm:h-11 rounded-md overflow-hidden bg-gray-600">
        {imageSrc ? (
          <img src={imageSrc} alt="Album cover" className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-sm text-gray-400">
            No Cover
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow">
        <p className="text-lg font-semibold truncate">
          {song.metaData.common.title ? song.metaData.common.title : 'Unknown Title'}
        </p>
        <p className="text-sm text-gray-400 truncate">
          {song.metaData.common.artist ? song.metaData.common.artist : 'Unknown Artist'}
        </p>
      </div>
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => ToggleFavorite(e)}
        addStyles="px-2 py-2"
      >
        <Heart
          color={`${isFavorite ? '#ff0061' : ''}`}
          fill={`${isFavorite ? '#ff0061' : 'white'}`}
        />
      </Button>
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-400">{formatDuration(song.metaData.format.duration)}</p>
      </div>
    </div>
  );
};

export default TrackLayout;
