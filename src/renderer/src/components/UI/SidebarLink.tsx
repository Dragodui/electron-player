import { FC, ReactNode } from 'react';

interface SidebarLinkProps {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
}

const SidebarLink: FC<SidebarLinkProps> = ({ children, onClick, active }): JSX.Element => {
  return (
    <button
      className={`w-full text-xl font-medium text-left py-2 px-4 rounded-md transition-colors ${
        active ? 'bg-[#4cb3cf] text-white' : 'hover:bg-gray-800'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SidebarLink;
