import  { useState,  useEffect  } from 'react';
import { Link, router } from '@inertiajs/react';

function navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const logo = "/assets/logo-dark.png";

    const navItems = [
        { label: 'Home', href: '/', type: 'link' },
        { label: 'About', href: '#resume', type: 'section' },
        { label: 'Services', href: '#services', type: 'section' },
        { label: 'Portfolios', href: '#works', type: 'section' },
        { label: 'Blog', href: '/bloglist', type: 'link' },
        { label: 'Contact', href: '#contact', type: 'section' }
    ];

    // Add scroll effect for sticky header
    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 10){
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () =>  window.removeEventListener('scroll', handleScroll);
    }, []);

      // Smooth scroll to section
      const scrollToSection = (e, sectionId) => {
          e.preventDefault();
          setMobileMenuOpen(false);
          
          if (window.location.pathname !== '/') {
              // If not on homepage, visit home first then scroll
              router.visit('/').then(() => {
                  setTimeout(() => {
                      const element = document.querySelector(sectionId);
                      if (element) {
                          window.scrollTo({
                              top: element.offsetTop - 100,
                              behavior: 'smooth'
                          });
                      }
                  }, 100); // Small delay to allow page to load
              });
          } else {
              // Already on homepage, just scroll
              const element = document.querySelector(sectionId);
              if (element) {
                  window.scrollTo({
                      top: element.offsetTop - 100,
                      behavior: 'smooth'
                  });
              }
          }
      };

  return (
  <>
   <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-6' : 'bg-white/90 backdrop-blur-sm py-4'}`}>
        <div className='container mx-auto px-4'>
            <div className='flex flex-wrap items-center justify-between'>
                {/* Logo */}
                <div className='flex items-center'>
                    <Link href="/" className='text-lg font-bold text-gray-800'>
                        <img src={logo} alt='Logo' className={`h-10 transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10'}`} />
                    </Link>
                    
                    {/* Email information */}
                    <div className='hidden md:block ml-2'>
                        <a href='mailto:info@nduatishem.com' className='text-gray-700 font-bold hover:text-primary transition-colors'>
                            info@nduatishem.com
                        </a>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className='hidden lg:flex items-center space-x-8'>
                    {navItems.map((item, index) => (
                        <div key={index} className='relative group'>
                            {item.type === 'link' ? (
                                <Link 
                                    href={item.href} 
                                    className='text-gray-700 font-bold hover:text-primary transition-colors'
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <button
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className='text-gray-700 font-bold hover:text-primary transition-colors cursor-pointer'
                                >
                                    {item.label}
                                </button>
                            )}
                            <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full'></div>
                        </div>
                    ))}
                </nav>

                {/* Hire Me Button */}
                <div className='hidden lg:block'>
                    <button
                        onClick={(e) => scrollToSection(e, '#contact')}
                        className='bg-gradient-to-r from-purple-600 to-black font-bold text-white py-2 px-5 rounded-3xl hover:opacity-90 transition-all'
                    >
                        Hire Me!
                    </button>
                </div>
                
                {/* Mobile Menu Button */}
                <div className='lg:hidden'>
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                        className='text-gray-700 focus:outline-none'
                        aria-label="Toggle menu"
                    >
                        <div className='space-y-2'>
                            <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    {navItems.map((item, index) => (
                        <div key={index} className='mb-3 last:mb-0'>
                            {item.type === 'link' ? (
                                <Link 
                                    href={item.href} 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className='block text-gray-700 font-bold hover:text-primary transition-colors py-2'
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        scrollToSection(e, item.href);
                                        setMobileMenuOpen(false);
                                    }}
                                    className='block w-full text-left text-gray-700 font-bold hover:text-primary transition-colors py-2'
                                >
                                    {item.label}
                                </button>
                            )}
                        </div>
                    ))}
                    <div className='mt-4'>
                        <button
                            onClick={(e) => {
                                scrollToSection(e, '#contact');
                                setMobileMenuOpen(false);
                            }}
                            className='block w-full bg-gradient-to-r from-purple-600 to-black text-center font-bold text-white py-2 px-5 rounded-3xl hover:opacity-90 transition-all'
                        >
                            Hire Me!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
    
    {/* Add padding to the top of your main content */}
    <div className="pt-10 lg:pt-28"></div>
  </>
  )
}

export default navbar