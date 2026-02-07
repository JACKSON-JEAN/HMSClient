import React from 'react'

const Container: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className=' w-full py-3 p-3'>{children}</div>
  )
}

export default Container