import MusicPlayer from '@renderer/components/MusicPlayer'
import PageLayout from '@renderer/components/PageLayout'
import Button from '@renderer/components/UI/Button'
import TrackLayout from '@renderer/components/UI/TrackLayout'
import { FC, useState } from 'react'
import { ISongData } from '../../../types'

const Home: FC = (): JSX.Element => {
  const [songs, setSongs] = useState<ISongData[]>([])
  const [folder, setFolder] = useState<string>('')
  const [currentSong, setCurrentSong] = useState<ISongData | null>(null)
  const api = (window as any).api

  const handleFolderSelect = async () => {
    try {
      const folderPath = await api.selectFolder()
      if (folderPath) {
        setFolder(folderPath)
        const files = await api.getMusicFiles(folderPath)
        setSongs(files)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <PageLayout>
      <h1 className="mb-[20px] text-2xl font-bold">All songs</h1>

      <div className="flex flex-col gap-4 items-center justify-center ">
        {songs.length > 0 && folder ? (
          songs.map((song, index) => (
            <TrackLayout
              onClick={() => {
                setCurrentSong(song)
              }}
              song={song}
              key={index}
            />
          ))
        ) : (
          <Button addStyles="mt-[100px]" onClick={handleFolderSelect}>
            Select Folder
          </Button>
        )}
      </div>
      <MusicPlayer song={currentSong} />
    </PageLayout>
  )
}

export default Home
