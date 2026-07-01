import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BookingModal from './components/ui/BookingModal';
import ScrollToTop from './components/ui/ScrollToTop';
import HomePage from './pages/HomePage';
import AllServicesPage from './pages/AllServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminReviews from './pages/admin/AdminReviews';
import AdminGallery from './pages/admin/AdminGallery';
import AdminContacts from './pages/admin/AdminContacts';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { Navigate } from 'react-router-dom';

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
      <AdminAuthProvider>
        {/* Admin routes — no Navbar/Footer */}
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="contacts" element={<AdminContacts />} />
          </Route>

          {/* Public routes — with Navbar/Footer */}
          <Route path="*" element={
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
              <BookingModal isOpen={isBookingModalOpen} onClose={handleCloseBookingModal} />
              <ScrollToTop />
            </div>
          } />
        </Routes>
      </AdminAuthProvider>
    </Router>
  );
}

export default App;
