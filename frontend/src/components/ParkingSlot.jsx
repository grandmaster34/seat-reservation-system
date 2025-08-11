import React from 'react';

const ParkingSlot = ({ slot, onSelect, isSelected }) => {
  const getSlotClassName = () => {
    let className = 'slot';
    
    if (slot.status === 'available') {
      className += ' available';
    } else if (slot.status === 'occupied') {
      className += ' occupied';
    }
    
    if (isSelected) {
      className += ' selected';
    }
    
    return className;
  };

  const handleClick = () => {
    if (slot.status === 'available') {
      onSelect(slot);
    }
  };

  return (
    <div 
      className={getSlotClassName()}
      onClick={handleClick}
      style={{
        height: '120px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: slot.status === 'available' ? '#d1fae5' : '#fecaca',
        border: isSelected ? '3px solid #3b82f6' : `2px solid ${slot.status === 'available' ? '#10b981' : '#ef4444'}`,
        cursor: slot.status === 'available' ? 'pointer' : 'not-allowed',
        transition: 'all 0.3s ease',
        boxShadow: isSelected ? '0 0 0 3px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div style={{ 
        fontWeight: '800', 
        fontSize: '20px', 
        marginBottom: '8px',
        color: slot.status === 'available' ? '#166534' : '#b91c1c'
      }}>
        {slot.id}
      </div>
      <div style={{
        fontSize: '12px',
        padding: '4px 12px',
        borderRadius: '20px',
        fontWeight: '600',
        background: slot.status === 'available' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
        color: slot.status === 'available' ? '#166534' : '#b91c1c'
      }}>
        {slot.status === 'available' ? 'Available' : 'Occupied'}
      </div>
    </div>
  );
};

export default ParkingSlot;
