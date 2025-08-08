import React from 'react';
import { useNavigation } from '../context/NavigationContext';

const InternSidebar = ({ user }) => {
  const { currentPage, navigateTo } = useNavigation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <aside className="sidebar">
      <style jsx>{`
        .sidebar {
          width: 280px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 10;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .logo {
          display: flex;
          align-items: center;
          padding: 0 2rem 2rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 2rem;
        }
        
        .logo-icon {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-right: 1rem;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .logo-text {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          padding: 1rem 2rem;
          color: var(--secondary);
          text-decoration: none;
          margin: 0.25rem 1rem;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 500;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border: none;
          background: none;
          width: calc(100% - 2rem);
          text-align: left;
        }
        
        .nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, var(--primary-light) 0%, transparent 100%);
          transition: width 0.3s ease;
        }
        
        .nav-item:hover::before {
          width: 100%;
        }
        
        .nav-item:hover, .nav-item.active {
          background: var(--primary-light);
          color: var(--primary-dark);
          transform: translateX(4px);
        }
        
        .nav-item.active {
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }
        
        .nav-item i {
          margin-right: 1rem;
          font-size: 20px;
          z-index: 1;
        }
        
        .nav-text {
          z-index: 1;
        }
        
        @media (max-width: 992px) {
          .sidebar {
            width: 80px;
          }
          
          .logo-text, .nav-text {
            display: none;
          }
          
          .logo {
            justify-content: center;
            padding: 0 0 2rem 0;
          }
          
          .nav-item {
            justify-content: center;
            padding: 1.5rem 0;
          }
          
          .nav-item i {
            margin-right: 0;
          }
        }
      `}</style>
      
      <div className="logo">
        <div className="logo-icon">
          <i className="fas fa-chair"></i>
        </div>
        <div className="logo-text">Reservation</div>
      </div>
      
      <button 
        className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
        onClick={() => navigateTo('dashboard')}
      >
        <i className="fas fa-home"></i>
        <span className="nav-text">Dashboard</span>
      </button>
      
      <button 
        className={`nav-item ${currentPage === 'reservations' ? 'active' : ''}`}
        onClick={() => navigateTo('reservations')}
      >
        <i className="fas fa-calendar-check"></i>
        <span className="nav-text">Reservations</span>
      </button>
      
      <button 
        className={`nav-item ${currentPage === 'seatmap' ? 'active' : ''}`}
        onClick={() => navigateTo('seatmap')}
      >
        <i className="fas fa-map-marker-alt"></i>
        <span className="nav-text">Seat Map</span>
      </button>
      
      <button 
        className={`nav-item ${currentPage === 'history' ? 'active' : ''}`}
        onClick={() => navigateTo('history')}
      >
        <i className="fas fa-history"></i>
        <span className="nav-text">History</span>
      </button>
      
      <button 
        className={`nav-item ${currentPage === 'settings' ? 'active' : ''}`}
        onClick={() => navigateTo('settings')}
      >
        <i className="fas fa-cog"></i>
        <span className="nav-text">Settings</span>
      </button>
      
      <div style={{flex: 1}}></div>
      
      <button className="nav-item" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span className="nav-text">Logout</span>
      </button>
    </aside>
  );
};

export default InternSidebar;
