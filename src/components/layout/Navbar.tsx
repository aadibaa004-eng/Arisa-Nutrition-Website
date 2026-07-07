import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { navLinks, siteConfig } from '../../data/content';

interface NavbarProps {
  onBookConsultation: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const sectionId = href.replace('#', '');

    if (location.pathname === '/') {
      // Already on home page — smooth scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On another page — navigate home then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-soft py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <Leaf className="w-6 h-6 text-sage-green group-hover:rotate-12 transition-transform" />
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-800">
                  {siteConfig.name}
                </h1>
                <p className="text-xs text-sage-green font-semibold tracking-widest">
                  {siteConfig.tagline}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.href === '/services' ? (
                  <Link
                    key={link.href}
                    to="/services"
                    className="text-gray-700 hover:text-sage-green transition-colors font-medium text-sm"
                  >
                    {link.label}
                  </Link>
                ) : link.href === '/blog' ? (
                  <Link
                    key={link.href}
                    to="/blog"
                    className="text-gray-700 hover:text-sage-green transition-colors font-medium text-sm"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-700 hover:text-sage-green transition-colors font-medium text-sm"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <motion.button
                onClick={onBookConsultation}
                whileHover={{ 
                  scale: 1.08,
                  boxShadow: '0 0 25px rgba(217, 119, 146, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 4px 20px rgba(217, 119, 146, 0.3)',
                    '0 6px 25px rgba(217, 119, 146, 0.5)',
                    '0 4px 20px rgba(217, 119, 146, 0.3)'
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="bg-gradient-to-r from-rose-pink to-muted-rose text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Book a Consultation
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-sage-green transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white shadow-2xl z-40 lg:hidden"
          >
            <div className="p-8 pt-24">
              <div className="flex flex-col gap-6 mb-8">
                {navLinks.map((link) =>
                  link.href === '/services' ? (
                    <Link
                      key={link.href}
                      to="/services"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-700 hover:text-sage-green transition-colors font-medium text-lg"
                    >
                      {link.label}
                    </Link>
                  ) : link.href === '/blog' ? (
                    <Link
                      key={link.href}
                      to="/blog"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-700 hover:text-sage-green transition-colors font-medium text-lg"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-gray-700 hover:text-sage-green transition-colors font-medium text-lg"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>

              <motion.button
                onClick={() => {
                  onBookConsultation();
                  setIsMobileMenuOpen(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-rose-pink to-muted-rose text-white px-6 py-4 rounded-full font-semibold shadow-lg mb-4"
              >
                Book a Consultation
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
