// Home.js - Pure CSS Version (No Tailwind)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', fontFamily: "'Inter', sans-serif" }}>
      {/* Background Blobs */}
      <div className="blob-bg">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
        <div className="blob-3"></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '64px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
              <div style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)', padding: '0.5rem', borderRadius: '0.75rem', color: 'white', fontWeight: '900', fontSize: '1.25rem' }}>
                KC
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.025em' }}>
                <span style={{ color: '#1e293b' }}>Kaam</span>
                <span style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Connect</span>
              </span>
            </div>
            <div style={{ display: 'none', gap: '2.5rem' }} className="nav-links">
              <a href="#how-it-works" style={{ textDecoration: 'none', color: '#475569', fontWeight: '600' }}>Kaise Karein?</a>
              <a href="#about" style={{ textDecoration: 'none', color: '#475569', fontWeight: '600' }}>Hamare Baare Mein</a>
            </div>
            <button 
              onClick={() => navigate('/login')}
              style={{
                background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                color: 'white',
                padding: '0.625rem 1.5rem',
                borderRadius: '9999px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ position: 'relative', paddingTop: '7rem', paddingBottom: '5rem', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center' }}>
            {/* Badge */}
            <div className="status-badge" style={{ display: 'inline-flex' }}>
              <span className="status-dot">
                <span className="status-dot-ping"></span>
                <span className="status-dot-static"></span>
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1d4ed8' }}>India's fastest growing work platform</span>
            </div>

            <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#0f172a', marginBottom: '1.5rem', lineHeight: '1.2' }}>
              Sahi Hunar ko Milega <br />
              <span className="gradient-text">Sahi Kaam.</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#64748b', maxWidth: '42rem', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
              Bharat ka sabse asaan portal — kuch hi seconds mein worker hire karein ya apne liye kaam dhoondh.
            </p>

            {/* Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '56rem', margin: '0 auto' }}>
              {/* Worker Card */}
              <div onClick={() => navigate('/register?role=Worker')} className="action-card">
                <div className="card-glow" style={{ background: 'linear-gradient(135deg, #3b82f6, #4f46e5)' }}></div>
                <div className="card-inner">
                  <div className="card-icon card-icon-blue">
                    🛠️
                  </div>
                  <h3 className="card-title">Mujhe Kaam Chahiye</h3>
                  <p className="card-desc">Apni skills register karein aur local kaam payein. Har din naye opportunities.</p>
                  <div className="card-arrow card-arrow-blue">
                    Shuru Karein <span style={{ marginLeft: '0.5rem', transition: 'transform 0.3s' }}>→</span>
                  </div>
                </div>
              </div>

              {/* Employer Card */}
              <div onClick={() => navigate('/register?role=Employer')} className="action-card">
                <div className="card-glow" style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)' }}></div>
                <div className="card-inner">
                  <div className="card-icon card-icon-orange">
                    🤝
                  </div>
                  <h3 className="card-title">Mujhe Worker Chahiye</h3>
                  <p className="card-desc">Apne ghar ya business ke liye verified helper hire karein.</p>
                  <div className="card-arrow card-arrow-orange">
                    Hire Karein <span style={{ marginLeft: '0.5rem', transition: 'transform 0.3s' }}>→</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="stats-container">
              <div style={{ textAlign: 'center' }}>
                <div className="stat-number">10k+</div>
                <div className="stat-label">Active Workers</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="stat-number">500+</div>
                <div className="stat-label">Cities Covered</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="stat-number">98%</div>
                <div className="stat-label">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="steps-section" id="how-it-works">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', marginBottom: '1rem' }}>
            <span style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: '0.875rem', fontWeight: '700', padding: '0.375rem 1rem', borderRadius: '9999px' }}>Simple Process</span>
          </div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '4rem' }}>Kaise Kaam Karta Hai?</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">
                <i className="fas fa-user-plus" style={{ color: '#2563eb' }}></i>
              </div>
              <h4 className="step-title">Register Karein</h4>
              <p className="step-desc">Bas apna naam aur phone number daalein.</p>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">
                <i className="fas fa-edit" style={{ color: '#4f46e5' }}></i>
              </div>
              <h4 className="step-title">Details Bharein</h4>
              <p className="step-desc">Kaam post karein ya apni skills batayein.</p>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">
                <i className="fas fa-phone-alt" style={{ color: '#7c3aed' }}></i>
              </div>
              <h4 className="step-title">Connect Karein</h4>
              <p className="step-desc">Direct call karein aur kaam shuru karein.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem', color: 'white', fontWeight: '700', fontSize: '1.5rem' }}>KaamConnect.</div>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Contact Us</a>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>© 2026 KaamConnect. Made with ❤️ for Workers.</p>
        </div>
      </footer>

      <style>{`
        @media (min-width: 768px) {
          .nav-links {
            display: flex !important;
          }
          .steps-section .grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .action-cards {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        .steps-section .step-card {
          margin-bottom: 1rem;
        }
        .action-card {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default Home;