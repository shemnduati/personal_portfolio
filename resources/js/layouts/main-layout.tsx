import React from 'react';
import { Link } from '@inertiajs/react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-purple-600">
              Portfolio
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/#works" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Works
              </Link>
              <Link 
                href="/#about" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                About
              </Link>
              <Link 
                href="/#contact" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/#works" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Works
              </Link>
              <Link 
                href="/#about" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                About
              </Link>
              <Link 
                href="/#contact" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4">Portfolio</h3>
              <p className="text-gray-400">
                Building digital experiences with passion and purpose.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <Link 
                  href="/" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/#works" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Works
                </Link>
                <Link 
                  href="/#about" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link 
                  href="/#contact" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={24} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="mailto:contact@example.com" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
