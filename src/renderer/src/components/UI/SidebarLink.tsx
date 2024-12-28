import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SidebarLinkProps {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  to?: string;
}

const SidebarLink: FC<SidebarLinkProps> = ({ children, onClick, active, to }): JSX.Element => {
  return (
    <Link
      to={to ?? ''}
      className={`w-full text-xl font-medium text-left py-2 px-4 rounded-md transition-colors ${
        active ? 'bg-[#4cb3cf] text-white' : 'hover:bg-gray-800'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default SidebarLink;
