import React, { useState } from 'react'
import Sidemenu from '../components/Sidemenu'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavigationBar from '../components/NavigationBar'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className=' flex w-full relative'>
        <Sidemenu open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
        <main className=' flex-1 h-screen overflow-y-auto'>
          <div className=' min-h-screen w-full'>
            <NavigationBar onMenuClick={() => setSidebarOpen(true)}/>
            <Outlet/>
          </div>
            <Footer/>
        </main>
    </div>
  )
}

export default Layout