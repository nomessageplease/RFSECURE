import type React from "react"

const Header: React.FC = () => {
  return (
    <header role="banner" className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-xl font-bold">
            Your Logo
          </a>

          <nav role="navigation" aria-label="Основная навигация" className="hidden md:flex items-center space-x-8">
            <a href="/" className="hover:text-gray-500">
              Home
            </a>
            <a href="/about" className="hover:text-gray-500">
              About
            </a>
            <a href="/services" className="hover:text-gray-500">
              Services
            </a>
            <a href="/contact" className="hover:text-gray-500">
              Contact
            </a>
          </nav>

          <div className="md:hidden">
            {/* Mobile Menu Button (Example) */}
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
