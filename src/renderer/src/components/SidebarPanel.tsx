import { FC } from 'react';
import SidebarLink from './UI/SidebarLink';
import electronLogo from '../assets/electron.svg';

const SidebarPanel: FC = (): JSX.Element => {
  return (
    <header className="fixed h-full w-2/8 bg-gray-900 text-white p-4 top-0 left-0 flex flex-col gap-10">
      <div className="flex items-center gap-3">
        <img className="w-[50px]" src={electronLogo} alt="" />
        <h1 className="text-xl font-bold">Electron Player</h1>
      </div>
      <nav className="flex flex-col gap-3 w-full">
        <SidebarLink>All Songs</SidebarLink>
        <SidebarLink>Favorites</SidebarLink>
      </nav>
    </header>
  );
};

export default SidebarPanel;
