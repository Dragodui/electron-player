import { FC, useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { ISongData } from '../../../../types';

interface HistoryLayoutProps {
  song: ISongData;
}

const HistoryLayout: FC<HistoryLayoutProps> = ({ song }): JSX.Element => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

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


  return (
    <div
      className={`cursor-pointer flex items-center w-full gap-4 text-white p-4 rounded-lg  hover:bg-[rgba(76,179,207,0.1)] transition-all duration-300`}
    >
      <div className="flex-shrink-0 w-11 h-11 sm:w-11 sm:h-11 rounded-md overflow-hidden">
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
    </div>
  );
};

export default HistoryLayout;
