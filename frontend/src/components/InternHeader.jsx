import React from 'react';

const InternHeader = ({ title, user }) => {
  return (
    <div className="header">
      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          background: rgba(255, 255, 255, 0.95);
          padding: 2rem;
          border-radius: 20px;
          box-shadow: var(--card-shadow);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .header-title {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, var(--dark) 0%, var(--primary-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.8);
          padding: 1rem 1.5rem;
          border-radius: 50px;
          box-shadow: var(--card-shadow);
        }
        
        .user-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .user-info {
          display: flex;
          flex-direction: column;
        }
        
        .user-name {
          font-weight: 700;
          font-size: 16px;
          color: var(--dark);
        }
        
        .user-role {
          font-size: 14px;
          color: var(--secondary);
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .user-info {
            display: none;
          }
          
          .header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
      
      <h1 className="header-title">{title}</h1>
      <div className="user-profile">
        <div className="user-avatar">
          {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
        </div>
        <div className="user-info">
          <div className="user-name">{user?.name || 'User'}</div>
          <div className="user-role">{user?.role || 'Intern'}</div>
        </div>
      </div>
    </div>
  );
};

export default InternHeader;
