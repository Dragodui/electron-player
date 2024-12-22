import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/Favorites'
import SidebarPanel from './components/SidebarPanel'
import './index.css'

function App(): JSX.Element {
  return (
    <Router>
      <SidebarPanel />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
