import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BookingModal from './components/ui/BookingModal';
import FloatingWhatsAppButton from './components/ui/FloatingWhatsAppButton';
import ScrollToTop from './components/ui/ScrollToTop';
import HomePage from './pages/HomePage';
import AllServicesPage from './pages/AllServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleOpenBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <Router>
      <div className="bg-cream">
        <Navbar onBookConsultation={handleOpenBookingModal} />
        
        <Routes>
          <Route path="/" element={<HomePage onBookConsultation={handleOpenBookingModal} />} />
          <Route path="/services" element={<AllServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage onBookConsultation={handleOpenBookingModal} />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
        </Routes>
        
        <Footer />
        
        <BookingModal 
          isOpen={isBookingModalOpen} 
          onClose={handleCloseBookingModal} 
        />
        
        <FloatingWhatsAppButton />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
