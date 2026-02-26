import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={`flex items-center gap-1 bg-blue-600 hover:bg-blue-500 shadow-md cursor-pointer text-white py-1 px-3 rounded-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${className ?? ''}`}
    >
      {children}
    </button>
  )
}

export default Button