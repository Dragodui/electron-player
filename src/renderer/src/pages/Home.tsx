import PageLayout from '@renderer/components/PageLayout'
import Button from '@renderer/components/UI/Button'
import TrackLayout from '@renderer/components/UI/TrackLayout'
import { IAudioMetadata } from 'music-metadata'
import { FC, useState } from 'react'

const Home: FC = (): JSX.Element => {
  const [music, setMusic] = useState<IAudioMetadata[]>([])
  const [folder, setFolder] = useState<string>('')
  const api = (window as any).api


  const handleFolderSelect = async () => {
    try {
      const folderPath = await api.selectFolder()
      console.log(folderPath)
      if (folderPath) {
        setFolder(folderPath)
        const files = await api.getMusicFiles(folderPath)
        console.log(files)
        setMusic(files)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <PageLayout>
      <h1 className="mb-[20px] text-2xl font-bold">
        All songs
      </h1>
      
      <div className='flex flex-col gap-4'>
        {music.length > 0 && folder ? (
          music.map((song, index) => <TrackLayout song={song} key={index} />)
        ) : (
          <Button onClick={handleFolderSelect}>Select Folder</Button>
        )}
      </div>
    </PageLayout>
  )
}

export default Home
