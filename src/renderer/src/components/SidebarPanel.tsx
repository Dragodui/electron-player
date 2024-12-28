import { FC } from 'react';
import SidebarLink from './UI/SidebarLink';
import electronLogo from '../assets/electron.svg';
import { Link } from 'react-router-dom';

interface SidebarPanelProps {
  onCategoryChange: (category: string) => void;
  currentCategory: string;
}

const SidebarPanel: FC<SidebarPanelProps> = ({
  onCategoryChange,
  currentCategory
}): JSX.Element => {
  return (
    <header className="fixed h-full w-2/8 bg-[#161f28] text-white p-4 top-0 left-0 flex flex-col gap-10">
      <div className="flex items-center gap-3">
        <img className="w-[50px]" src={electronLogo} alt="" />
        <h1 className="text-xl font-bold">Electron Player</h1>
      </div>
      <nav className="flex flex-col gap-3 w-full">
        <SidebarLink onClick={() => onCategoryChange('all')} active={currentCategory === 'all'}>
          All Songs
        </SidebarLink>
        <SidebarLink
          onClick={() => onCategoryChange('favorites')}
          active={currentCategory === 'favorites'}
        >
          Favorites
        </SidebarLink>
        <SidebarLink
          to="/stats"
          onClick={() => onCategoryChange('stats')}
          active={currentCategory === 'stats'}
        >
          Stats
        </SidebarLink>
      </nav>
    </header>
  );
};

export default SidebarPanel;
