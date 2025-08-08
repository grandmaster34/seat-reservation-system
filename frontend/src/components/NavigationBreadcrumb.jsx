import React from 'react';
import { useNavigation } from '../context/NavigationContext';

const NavigationBreadcrumb = () => {
  const { currentPage, goToDashboard } = useNavigation();

  const getPageTitle = (page) => {
    const titles = {
      dashboard: 'Dashboard',
      reservations: 'Reservations',
      seatmap: 'Seat Map',
      history: 'History',
      settings: 'Settings'
    };
    return titles[page] || 'Dashboard';
  };

  const getPageIcon = (page) => {
    const icons = {
      dashboard: 'fas fa-home',
      reservations: 'fas fa-calendar-check',
      seatmap: 'fas fa-map-marker-alt',
      history: 'fas fa-history',
      settings: 'fas fa-cog'
    };
    return icons[page] || 'fas fa-home';
  };

  if (currentPage === 'dashboard') {
    return null;
  }

  return (
    <div className="breadcrumb">
      <style jsx>{`
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          background: rgba(255, 255, 255, 0.95);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: var(--card-shadow);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--secondary);
          font-weight: 500;
          font-size: 14px;
        }
        
        .breadcrumb-item.active {
          color: var(--primary-dark);
          font-weight: 600;
        }
        
        .breadcrumb-separator {
          color: var(--secondary);
          font-size: 12px;
        }
        
        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-dark);
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .breadcrumb-link:hover {
          color: var(--primary);
          transform: translateX(-2px);
        }
        
        .breadcrumb-icon {
          font-size: 16px;
        }
      `}</style>
      
      <div className="breadcrumb-item">
        <i className="fas fa-home breadcrumb-icon"></i>
        <span 
          className="breadcrumb-link"
          onClick={goToDashboard}
        >
          Dashboard
        </span>
      </div>
      
      <span className="breadcrumb-separator">
        <i className="fas fa-chevron-right"></i>
      </span>
      
      <div className="breadcrumb-item active">
        <i className={`${getPageIcon(currentPage)} breadcrumb-icon`}></i>
        <span>{getPageTitle(currentPage)}</span>
      </div>
    </div>
  );
};

export default NavigationBreadcrumb;
