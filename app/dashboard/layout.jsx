import React from 'react'
import Header from './_components/Header'

function DashboardLayout({children}) {
  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
        <Header/>
        <div className='pt-16 mx-5 md:mx-20 lg:mx-36'>
        {children}
        </div>
       
    </div>
  )
}

export default DashboardLayout