import { FC } from 'react';
import { Link } from 'react-router-dom';

interface SidebarLinkProps {
  children: React.ReactNode;
}

const SidebarLink: FC<SidebarLinkProps> = ({ children }): JSX.Element => {
  return (
    <button className="w-full bg-[rgba(0,0,0,0.3)] text-center rounded-lg text-xl font-medium p-1">
      {children}
    </button>
  );
};

export default SidebarLink;
