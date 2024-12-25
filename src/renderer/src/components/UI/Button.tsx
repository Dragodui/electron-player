import React, { ButtonHTMLAttributes, FC } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  addStyles?: string
}

const Button: FC<ButtonProps> = ({ children, addStyles, ...props }): JSX.Element => {
  return (
    <button {...props} className={`bg-[rgba(0,0,0,0.3)] px-5 py-3 fond-medium text-xl rounded-lg ${addStyles}`}>
      {children}
    </button>
  )
}

export default Button
