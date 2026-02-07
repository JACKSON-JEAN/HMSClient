import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({children, onClick}) => {
  return (
    <button onClick={onClick} className=' flex items-center gap-1 bg-blue-600 hover:bg-blue-500 shadow-md cursor-pointer text-white py-1 px-2 rounded-sm'>{children}</button>
  )
}

export default Button