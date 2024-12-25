import { IAudioMetadata } from 'music-metadata';
import { FC, useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { Play, Pause } from 'lucide-react'; 
import { ISongData } from '../../../../types';

interface TrackLayoutProps {
    song: ISongData;
    onClick: () => void
}

const TrackLayout: FC<TrackLayoutProps> = ({ song, onClick }): JSX.Element => {
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
    const [isPlaying, setIsPlaying] = useState(false);

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

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        // here will be the playing logic
    };

    const formatDuration = (duration: number | undefined) => {
        if (!duration) return "00:00";
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    return (
        <div onClick={onClick} className="cursor-pointer flex items-center w-full gap-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
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
                    {song.metaData.common.title ? song.metaData.common.title : "Unknown Title"}
                </p>
                <p className="text-sm text-gray-400 truncate">
                    {song.metaData.common.artist ? song.metaData.common.artist : "Unknown Artist"}
                </p>
                
            </div>

            <div className="flex items-center gap-4">
                <p className="text-sm text-gray-400">{formatDuration(song.metaData.format.duration)}</p>
              
                {/* <button
                    className="w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={handlePlayPause}
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button> */}
            </div>
        </div>
    );
};

export default TrackLayout;
