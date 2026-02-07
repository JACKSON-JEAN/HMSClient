import React from 'react'

const TitleContainer: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <p className=' text-gray-700 font-medium'>{children}</p>
  )
}

export default TitleContainer