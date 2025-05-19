
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleAuthClick = () => {
    navigate("/auth");
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-it-blue text-white font-bold py-1 px-2 rounded">
            IT
          </div>
          <span className="font-bold text-xl text-it-darkGray">Support Tanger</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-it-darkGray hover:text-it-blue transition-colors">
            Accueil
          </Link>
          <Link to="/services" className="text-it-darkGray hover:text-it-blue transition-colors">
            Services
          </Link>
          <Link to="/pricing" className="text-it-darkGray hover:text-it-blue transition-colors">
            Tarifs
          </Link>
          <Link to="/contact" className="text-it-darkGray hover:text-it-blue transition-colors">
            Contact
          </Link>
          
          {isAdmin && (
            <Link to="/admin" className="text-it-darkGray hover:text-it-blue transition-colors">
              Admin
            </Link>
          )}
          
          {user ? (
            <div className="flex items-center space-x-2">
              <Button asChild variant="default" className="bg-it-blue hover:bg-it-darkBlue">
                <Link to="/demande">Demande de service</Link>
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSignOut} 
                className="flex items-center gap-1"
              >
                <LogOut size={16} /> Déconnexion
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              onClick={handleAuthClick} 
              className="flex items-center gap-1"
            >
              <LogIn size={16} /> Connexion
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="text-it-darkGray py-2 hover:text-it-blue transition-colors" onClick={toggleMenu}>
              Accueil
            </Link>
            <Link to="/services" className="text-it-darkGray py-2 hover:text-it-blue transition-colors" onClick={toggleMenu}>
              Services
            </Link>
            <Link to="/pricing" className="text-it-darkGray py-2 hover:text-it-blue transition-colors" onClick={toggleMenu}>
              Tarifs
            </Link>
            <Link to="/contact" className="text-it-darkGray py-2 hover:text-it-blue transition-colors" onClick={toggleMenu}>
              Contact
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-it-darkGray py-2 hover:text-it-blue transition-colors" onClick={toggleMenu}>
                Admin
              </Link>
            )}
            
            {user ? (
              <>
                <Button asChild variant="default" className="bg-it-blue hover:bg-it-darkBlue w-full" onClick={toggleMenu}>
                  <Link to="/demande">Demande de service</Link>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut} 
                  className="w-full flex items-center justify-center gap-1"
                >
                  <LogOut size={16} /> Déconnexion
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                onClick={handleAuthClick} 
                className="w-full flex items-center justify-center gap-1"
              >
                <LogIn size={16} /> Connexion
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
