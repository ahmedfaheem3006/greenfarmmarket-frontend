import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ToastContainer } from './components/ui/Toast';
import { AuthModal } from './components/auth/AuthModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AiDoctorPage } from './pages/AiDoctorPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { TransportPage } from './pages/TransportPage';
import { JobsPage } from './pages/JobsPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { authStore } from './store/authStore';

export const App: React.FC = () => {
  useEffect(() => {
    authStore.init();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-background text-text-primary font-cairo transition-colors duration-300">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/ai-doctor" element={<AiDoctorPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/transport" element={<TransportPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<UserDashboardPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <Footer />

        {/* Global Floating Scroll To Top Button */}
        <ScrollToTop />

        {/* Global Modals & Toasts */}
        <AuthModal />
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
