import React, { useState } from 'react'
import { useMatches } from 'react-router-dom'
import Sidemenu from '../components/Sidemenu'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavigationBar from '../components/NavigationBar'

type RouteHandle = {
  title?: string;
};

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const matches = useMatches();

  const currentMatch = matches[matches.length - 1];
  const title =
  (currentMatch?.handle as RouteHandle | undefined)?.title ||
  "Default Title";

  return (
    <div className=' flex w-full relative'>
        <Sidemenu open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
        <main className=' flex-1 h-screen overflow-y-auto'>
          <div className=' min-h-screen w-full'>
            <NavigationBar 
              title={title}
              onMenuClick={() => setSidebarOpen(true)}
            />
            <Outlet/>
          </div>
            <Footer/>
        </main>
    </div>
  )
}

export default Layout