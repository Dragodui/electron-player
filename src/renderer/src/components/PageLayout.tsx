import React, { FC } from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }): JSX.Element => {
  return <div className="h-screen overflow-y-auto p-4 no-scrollbar w-[100%]">{children}</div>;
};

export default PageLayout;
