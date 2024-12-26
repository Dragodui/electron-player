import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SidebarPanel from './components/SidebarPanel'
import './index.css'

function App(): JSX.Element {
  return (
    <Router>
      <SidebarPanel />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
