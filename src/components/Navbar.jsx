import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Shield className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-gray-900">VeriSync</span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="/tools" className="text-gray-700 hover:text-blue-600 transition-colors">
              Tools
            </Link>
            <Link to="/transparency" className="text-gray-700 hover:text-blue-600 transition-colors">
              Transparency
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/"
              onClick={closeMenu}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              About
            </Link>
            <Link
              to="/tools"
              onClick={closeMenu}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Tools
            </Link>
            <Link
              to="/transparency"
              onClick={closeMenu}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Transparency
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
