import { FC } from 'react'
import { Link } from 'react-router-dom'

interface SidebarLinkProps {
  to: string
  children: React.ReactNode
}

const SidebarLink: FC<SidebarLinkProps> = ({ to, children }): JSX.Element => {
  return (
    <Link
      className="w-full bg-[rgba(0,0,0,0.3)] text-center rounded-lg text-xl font-medium p-1"
      to={to}
    >
      {children}
    </Link>
  )
}

export default SidebarLink
