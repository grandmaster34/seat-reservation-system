import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [navigationHistory, setNavigationHistory] = useState([]);

  // Update current page based on URL
  useEffect(() => {
    const path = location.pathname;
    let page = 'dashboard';
    
    if (path.includes('/reservations')) {
      page = 'reservations';
    } else if (path.includes('/seatmap')) {
      page = 'seatmap';
    } else if (path.includes('/history')) {
      page = 'history';
    } else if (path.includes('/settings')) {
      page = 'settings';
    }
    
    setCurrentPage(page);
    
    // Add to navigation history
    setNavigationHistory(prev => {
      const newHistory = [...prev];
      if (newHistory[newHistory.length - 1] !== page) {
        newHistory.push(page);
      }
      return newHistory.slice(-10); // Keep last 10 pages
    });
  }, [location.pathname]);

  const navigateTo = (page) => {
    setCurrentPage(page);
    
    switch (page) {
      case 'dashboard':
        navigate('/intern');
        break;
      case 'reservations':
        navigate('/intern/reservations');
        break;
      case 'seatmap':
        navigate('/intern/seatmap');
        break;
      case 'history':
        navigate('/intern/history');
        break;
      case 'settings':
        navigate('/intern/settings');
        break;
      default:
        navigate('/intern');
    }
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const previousPage = navigationHistory[navigationHistory.length - 2];
      navigateTo(previousPage);
    } else {
      navigateTo('dashboard');
    }
  };

  const goToDashboard = () => {
    navigateTo('dashboard');
  };

  const value = {
    currentPage,
    navigateTo,
    goBack,
    goToDashboard,
    navigationHistory
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
