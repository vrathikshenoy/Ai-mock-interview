"use client"
import React, { useState, useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NavLink = ({ href, children }) => {
  const path = usePathname()
  return (
    <Link href={href}>
      <motion.span
        className={`text-base font-medium ${path === href ? 'text-blue-500' : 'text-gray-300'} hover:text-blue-400 transition-colors duration-200`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.span>
    </Link>
  )
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <motion.h1 
              className="text-2xl font-bold text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              InterviewAI
            </motion.h1>
          </div>
          <div className='-mr-2 -my-2 md:hidden'>
            <motion.button
              type='button'
              className='bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className='sr-only'>Open menu</span>
              <Menu className='h-6 w-6' aria-hidden='true' />
            </motion.button>
          </div>
          <nav className='hidden md:flex space-x-10'>
            <NavLink href='/dashboard'>Dashboard</NavLink>
            <NavLink href='/dashboard/about'>About</NavLink>
            <NavLink href='/dashboard/upgrade'>Upgrade</NavLink>
          </nav>
          <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
            <UserButton afterSignOutUrl='/' />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-800 divide-y-2 divide-gray-700'>
              <div className='pt-5 pb-6 px-5'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h1 className="text-2xl font-bold text-white">InterviewAI</h1>
                  </div>
                  <div className='-mr-2'>
                    <motion.button
                      type='button'
                      className='bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
                      onClick={() => setIsMenuOpen(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className='sr-only'>Close menu</span>
                      <X className='h-6 w-6' aria-hidden='true' />
                    </motion.button>
                  </div>
                </div>
                <div className='mt-6'>
                  <nav className='grid gap-y-8'>
                    <NavLink href='/dashboard'>Dashboard</NavLink>
                    <NavLink href='/dashboard/about'>About</NavLink>
                    <NavLink href='/dashboard/upgrade'>Upgrade</NavLink>
                  </nav>
                </div>
              </div>
              <div className='py-6 px-5 space-y-6'>
                <div>
                  <UserButton afterSignOutUrl='/' />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header