import Button from '@renderer/components/UI/Button'
import { FC, useState } from 'react'

const Home: FC = (): JSX.Element => {
  const [music, setMusic] = useState<string[]>([])
  const [folder, setFolder] = useState<string>('')
  const api = (window as any).api


  const handleFolderSelect = async () => {
    try {
      const folderPath = await api.selectFolder()
      console.log(folderPath)
      if (folderPath) {
        setFolder(folderPath)
        const files = await api.getMusicFiles(folderPath)
        setMusic(files)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1 className="mb-[20px] text-2xl font-bold">
        {folder ? `Music in ${folder}` : 'No folder selected'}
      </h1>
      {music.length > 0 && (
        <h1 className="text-xl mb-[10px] font-medium">Found {music.length} songs</h1>
      )}
      <div>
        {music.length > 0 && folder ? (
          music.map((file, index) => <p key={index}>{file}</p>)
        ) : (
          <Button onClick={handleFolderSelect}>Select Folder</Button>
        )}
      </div>
    </div>
  )
}

export default Home
