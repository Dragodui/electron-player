import Home from './pages/Home';
import SidebarPanel from './components/SidebarPanel';
import './index.css';

function App(): JSX.Element {
  return (
    <>
      <SidebarPanel />
      <Home />
    </>
  );
}

export default App;
