
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
          <Button asChild variant="default" className="bg-it-blue hover:bg-it-darkBlue">
            <Link to="/demande">Demande de service</Link>
          </Button>
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
            <Button asChild variant="default" className="bg-it-blue hover:bg-it-darkBlue w-full">
              <Link to="/demande" onClick={toggleMenu}>Demande de service</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
