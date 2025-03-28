import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

function navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const logo = "/assets/logo-dark.png";
    const navItems = [
        {
        label: 'Home',
        href: '/',
        },
        {
        label: 'About',
        href: '/',
        },
        {
        label: 'Services',
        href: '/',
        },
        {
        label: 'Portfolios',
        href: '/',
        },
        {
        label: 'Blog',
        href: '/',
        },
        {
        label: 'Contact',
        href: '/',
        }

    ];
  return (
  <>
   <header>
        <div className='container mx-auto px-4'>
            <div className='flex flex-wrap items-center justify-between py-4'>
                {/* Logo */}
                <div className='flex items-center'>
                    <Link href={route('dashboard')} className='text-lg font-bold text-gray-800'>
                        <img src={logo} alt='SN' className='h-10' />
                    </Link>
                    
                    {/* Email information*/}
                    <div className='hidden md:block  ml-2'>
                        <a href='mailto:info@nduatishem.com' className='text-gray-700 font-bold hover:text-primary'>info@nduatishem.com</a>
                    </div>
                </div>


                {/* Desktop Navigation*/}
                <nav className='hidden lg:flex items-center space-x-8'>
                    {navItems.map((item, index) => (
                        <div key={index} className='relative group'>
                            <Link href={item.href} className='text-gray-700 font-bold hover:text-primary transition-colors'>{item.label}</Link>
                        </div>
                    ))}
                </nav>

                {/* Hire Me Button*/}
                <div className='hidden lg:block'>
                    <Link href="{route('dashboard')}" className='bg-primary font-bold text-white py-3 px-5 rounded-3xl hover:bg-primary-dark transition-colors'>
                        Hire Me!
                    </Link>
                </div>
                
                {/* Mobile Menu Button  */}
                <div className='lg:hidden'>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className='text-gray-700 focus:outline-none'>
                        <div className='space-y-2'>
                            <span className='block w-6 h-0.5 bg-gray-700'></span>
                            <span className='block w-6 h-0.5 bg-gray-700'></span>
                            <span className='block w-6 h-0.5 bg-gray-700'></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu*/}
                <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="bg-white shadow-jg rounded-lg mt-4 p-4">
                        {navItems.map((item, index) => (
                            <div key={index} className='mb-2'>
                                <Link href={item.href} onClick={ () => setMobileMenuOpen(false)} className='text-gray-700 font-bold hover:text-primary transition-colors'>{item.label}</Link>
                            </div>
                        ))}
                    </div>
                </div>
        
            </div>
        </div>
    </header>
  </>
  )
}

export default navbar