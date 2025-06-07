import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './components/layouts/nav';
import Footer from './components/pages/Footer';
import './App.css';
import '../src/components/styles/admin.css'

// Basic fallback component for Suspense
const LoadingFallback = () => <div>Loading...</div>;

// Lazy-loaded components
const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import('./components/pages/About'));
const Properties = lazy(() => import('./components/pages/properties'));
const WhyChoose = lazy(() => import('./components/pages/Whychoose'));
const SinglePage = lazy(() => import('./components/pages/SinglePage'));
const AdminLayout = lazy(() => import('./components/pages/Admin/AdminLayout'));
const AdminProperties = lazy(() => import('./components/pages/Admin/Properties/List'));
const AdminUpcoming = lazy(() => import('./components/pages/Admin/UpcomingProperties/List'));
const AdminFutureDev = lazy(() => import('./components/pages/Admin/FutureProperties/List'));

function App() {
  return (
    <Router>
      <Routes>
        {/* Main App Routes (with Navbar and Footer) */}
        <Route path="/*" element={
          <div className="App">
            <Navbar />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<SinglePage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/why-choose-us" element={<WhyChoose />} />
                <Route 
                  path="*" 
                  element={
                    <div className="container mx-auto p-8 text-center">
                      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                      <p className="text-xl">The page you're looking for doesn't exist.</p>
                      <Link 
                        to="/" 
                        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                      >
                        Return Home
                      </Link>
                    </div>
                  } 
                />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        } />
        
        {/* Admin Routes (without Navbar and Footer) */}
        <Route path="/admin/*" element={
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<AdminLayout />}>
                <Route path="properties" element={<AdminProperties />} />
                <Route path="upcoming-properties" element={<AdminUpcoming />} />
                <Route path="future-properties" element={<AdminFutureDev />} />
                <Route index element={<Navigate to="properties" replace />} />
              </Route>
            </Routes>
          </Suspense>
        } />
      </Routes>
    </Router>
  );
}

export default App;