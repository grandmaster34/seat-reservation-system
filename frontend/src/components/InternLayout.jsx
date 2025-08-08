import React from 'react';
import InternSidebar from './InternSidebar';
import InternHeader from './InternHeader';
import NavigationBreadcrumb from './NavigationBreadcrumb';

const InternLayout = ({ children, title, user }) => {
  return (
    <div className="dashboard">
      <style jsx>{`
        :root {
          --primary: #3b82f6;
          --primary-dark: #2563eb;
          --primary-light: #dbeafe;
          --secondary: #64748b;
          --success: #10b981;
          --success-light: #d1fae5;
          --warning: #f59e0b;
          --warning-light: #fef3c7;
          --danger: #ef4444;
          --danger-light: #fee2e2;
          --light: #f8fafc;
          --dark: #1e293b;
          --gray: #e2e8f0;
          --border: #e2e8f0;
          --card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          --card-shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .dashboard {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          position: relative;
        }
        
        .dashboard::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          pointer-events: none;
        }
        
        /* Main Content */
        .main-content {
          flex: 1;
          padding: 3rem;
          overflow-y: auto;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          position: relative;
          z-index: 1;
        }
        
        @media (max-width: 992px) {
          .main-content {
            padding: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .main-content {
            padding: 1rem;
          }
        }
      `}</style>
      
      {/* Sidebar */}
      <InternSidebar user={user} />
      
      {/* Main Content */}
      <main className="main-content">
        <InternHeader title={title} user={user} />
        <NavigationBreadcrumb />
        {children}
      </main>
    </div>
  );
};

export default InternLayout;
