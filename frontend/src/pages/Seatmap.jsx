import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import InternLayout from '../components/InternLayout';

const ParkingMap = ({ onBack, user }) => {
  const [selectedZone, setSelectedZone] = useState('main');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('full-day');
  const [visitorName, setVisitorName] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  
  // Mock parking slot data for different zones
  const parkingLayout = {
    main: [
      { id: 'P-01', status: 'available', location: 'Main Lot - Row A' },
      { id: 'P-02', status: 'occupied', location: 'Main Lot - Row A' },
      { id: 'P-03', status: 'available', location: 'Main Lot - Row A' },
      { id: 'P-04', status: 'occupied', location: 'Main Lot - Row A' },
      { id: 'P-05', status: 'available', location: 'Main Lot - Row B' },
      { id: 'P-06', status: 'occupied', location: 'Main Lot - Row B' },
      { id: 'P-07', status: 'available', location: 'Main Lot - Row B' },
      { id: 'P-08', status: 'available', location: 'Main Lot - Row B' },
      { id: 'P-09', status: 'occupied', location: 'Main Lot - Row C' },
      { id: 'P-10', status: 'occupied', location: 'Main Lot - Row C' },
      { id: 'P-11', status: 'available', location: 'Main Lot - Row C' },
      { id: 'P-12', status: 'available', location: 'Main Lot - Row C' },
    ],
    vip: [
      { id: 'VIP-01', status: 'available', location: 'VIP Area - Front' },
      { id: 'VIP-02', status: 'occupied', location: 'VIP Area - Front' },
      { id: 'VIP-03', status: 'occupied', location: 'VIP Area - Front' },
      { id: 'VIP-04', status: 'available', location: 'VIP Area - Rear' },
      { id: 'VIP-05', status: 'available', location: 'VIP Area - Rear' },
      { id: 'VIP-06', status: 'occupied', location: 'VIP Area - Rear' },
    ],
    covered: [
      { id: 'C-01', status: 'available', location: 'Covered Parking - Level 1' },
      { id: 'C-02', status: 'available', location: 'Covered Parking - Level 1' },
      { id: 'C-03', status: 'occupied', location: 'Covered Parking - Level 1' },
      { id: 'C-04', status: 'available', location: 'Covered Parking - Level 1' },
    ],
    handicap: [
      { id: 'H-01', status: 'occupied', location: 'Accessible Parking - Near Elevator' },
      { id: 'H-02', status: 'occupied', location: 'Accessible Parking - Near Elevator' },
      { id: 'H-03', status: 'occupied', location: 'Accessible Parking - Ramp Access' },
      { id: 'H-04', status: 'available', location: 'Accessible Parking - Ramp Access' },
    ]
  };

  const handleSlotClick = (slot) => {
    if (slot.status === 'available') {
      setSelectedSlot(slot);
      setShowReservationModal(true);
    }
  };

  const handleReservation = () => {
    if (selectedSlot && reservationDate && visitorName && licensePlate) {
      alert(`Parking reservation confirmed for ${visitorName} at slot ${selectedSlot.id} on ${reservationDate}`);
      setShowReservationModal(false);
      setSelectedSlot(null);
      setReservationDate('');
      setReservationTime('full-day');
      setVisitorName('');
      setLicensePlate('');
    }
  };

  const getZoneStats = (zone) => {
    const slots = parkingLayout[zone];
    const total = slots.length;
    const available = slots.filter(s => s.status === 'available').length;
    const occupied = total - available;
    return { total, available, occupied };
  };

  const stats = getZoneStats(selectedZone);

  return (
    <InternLayout title="Visitor Parking Map" user={user}>
      <style>{`
        /* Area Selector */
        .area-selector {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        
        .area-button {
          padding: 1rem 1.5rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.9);
          color: var(--secondary);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .area-button:hover {
          background: var(--primary-light);
          color: var(--primary-dark);
          transform: translateY(-2px);
        }
        
        .area-button.active {
          background: var(--primary-light);
          color: var(--primary-dark);
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }
        
        /* Stats Cards */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: var(--card-shadow);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          text-align: center;
        }
        
        .stat-value {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, var(--dark) 0%, var(--primary-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .stat-label {
          font-size: 14px;
          color: var(--secondary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        /* Parking Map Container */
        .parking-map-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: var(--card-shadow);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .map-header {
          padding: 2rem;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%);
        }
        
        .map-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 1rem;
        }
        
        .legend {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 14px;
          font-weight: 500;
          color: var(--secondary);
        }
        
        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }
        
        .legend-color.available {
          background: var(--success);
        }
        
        .legend-color.occupied {
          background: var(--danger);
        }
        
        .legend-color.reserved {
          background: var(--primary);
        }
        
        .legend-color.changed {
          background: var(--warning);
        }
        
        /* Slot Grid */
        .parking-map {
          display: grid;
          gap: 1rem;
          padding: 2rem;
        }
        
        .slot {
          height: 120px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid var(--border);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .slot::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .slot:hover::before {
          opacity: 1;
        }
        
        .slot.available {
          background: linear-gradient(135deg, var(--success-light) 0%, #bbf7d0 100%);
          border-color: var(--success);
        }
        
        .slot.available:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        }
        
        .slot.occupied {
          background: linear-gradient(135deg, var(--danger-light) 0%, #fecaca 100%);
          border-color: var(--danger);
          cursor: not-allowed;
          opacity: 0.7;
        }
        
        .slot.reserved {
          background: linear-gradient(135deg, var(--primary-light) 0%, #bfdbfe 100%);
          border-color: var(--primary);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }
        
        .slot.changed {
          background: linear-gradient(135deg, var(--warning-light) 0%, #fef3c7 100%);
          border-color: var(--warning);
        }
        
        .slot-number {
          font-weight: 800;
          font-size: 20px;
          margin-bottom: 0.5rem;
          z-index: 1;
        }
        
        .slot-status {
          font-size: 12px;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-weight: 600;
          z-index: 1;
        }
        
        .status-available {
          background: rgba(16, 185, 129, 0.2);
          color: #166534;
        }
        
        .status-occupied {
          background: rgba(239, 68, 68, 0.2);
          color: #b91c1c;
        }
        
        .status-changed {
          background: rgba(245, 158, 11, 0.2);
          color: #b45309;
        }
        
        .user-indicator {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          z-index: 1;
        }
        
        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }
        
        .modal {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: var(--card-shadow-hover);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .modal-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--dark);
        }
        
        .modal-close {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: var(--gray);
          color: var(--secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .modal-close:hover {
          background: var(--danger-light);
          color: var(--danger);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          display: block;
          font-weight: 600;
          color: var(--dark);
          margin-bottom: 0.5rem;
        }
        
        .form-input,
        .form-select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid var(--border);
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.9);
        }
        
        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }
        
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .btn-outline {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid var(--border);
          color: var(--secondary);
        }
        
        .btn-outline:hover {
          background: var(--gray);
          border-color: var(--primary);
          color: var(--primary-dark);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .area-selector {
            flex-direction: column;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .legend {
            flex-direction: column;
            gap: 1rem;
          }
          
          .parking-map {
            grid-template-columns: repeat(2, 1fr);
            padding: 1rem;
          }
          
          .modal {
            margin: 1rem;
            padding: 1.5rem;
          }
          
          .modal-actions {
            flex-direction: column;
          }
        }
      `}</style>
      
      {/* Zone Selector */}
      <div className="area-selector">
        {[
          { key: 'main', label: 'Main Parking', icon: 'fas fa-parking' },
          { key: 'vip', label: 'VIP Parking', icon: 'fas fa-crown' },
          { key: 'covered', label: 'Covered Parking', icon: 'fas fa-car' },
          { key: 'handicap', label: 'Accessible Parking', icon: 'fas fa-wheelchair' }
        ].map(zone => (
          <button
            key={zone.key}
            className={`area-button ${selectedZone === zone.key ? 'active' : ''}`}
            onClick={() => setSelectedZone(zone.key)}
          >
            <i className={zone.icon}></i>
            {zone.label}
          </button>
        ))}
      </div>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Slots</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.available}</div>
          <div className="stat-label">Available</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.occupied}</div>
          <div className="stat-label">Occupied</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{Math.round((stats.available / stats.total) * 100)}%</div>
          <div className="stat-label">Availability</div>
        </div>
      </div>
      
      {/* Parking Map */}
      <div className="parking-map-container">
        <div className="map-header">
          <h2 className="map-title">
            {selectedZone === 'main' && 'Main Parking Lot'}
            {selectedZone === 'vip' && 'VIP Parking Area'}
            {selectedZone === 'covered' && 'Covered Parking'}
            {selectedZone === 'handicap' && 'Accessible Parking'}
          </h2>
          
          <div className="legend">
            <div className="legend-item">
              <div className="legend-color available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="legend-color occupied"></div>
              <span>Occupied</span>
            </div>
            <div className="legend-item">
              <div className="legend-color reserved"></div>
              <span>Your Reservation</span>
            </div>
            <div className="legend-item">
              <div className="legend-color changed"></div>
              <span>Status Changed</span>
            </div>
          </div>
        </div>

        {/* Slot Grid */}
        <div 
          className="parking-map" 
          style={{ 
            gridTemplateColumns: `repeat(${selectedZone === 'handicap' ? 2 : 4}, 1fr)`
          }}
        >
          {parkingLayout[selectedZone].map(slot => (
            <div 
              key={slot.id}
              className={`slot ${slot.status} ${slot.id === 'P-12' ? 'reserved' : slot.id === 'P-06' ? 'changed' : ''}`}
              onClick={() => handleSlotClick(slot)}
            >
              <div className="slot-number">{slot.id}</div>
              <div className={`slot-status status-${slot.status}`}>
                {slot.status === 'available' ? 'Available' : 
                 slot.id === 'P-12' ? 'Reserved' : 
                 slot.id === 'P-06' ? 'Changed' : 'Occupied'}
              </div>
              {slot.id === 'P-12' && (
                <div className="user-indicator">JS</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reservation Modal */}
      {showReservationModal && (
        <div className="modal-overlay" onClick={() => setShowReservationModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Reserve Slot {selectedSlot?.id}</h3>
              <button className="modal-close" onClick={() => setShowReservationModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Visitor Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter visitor's name"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Vehicle License Plate</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter license plate number"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={reservationDate}
                onChange={(e) => setReservationDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Time</label>
              <select
                className="form-select"
                value={reservationTime}
                onChange={(e) => setReservationTime(e.target.value)}
              >
                <option value="full-day">Full Day</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (1 PM - 5 PM)</option>
              </select>
            </div>
            
            <div className="modal-actions">
              <button 
                className="btn btn-outline" 
                onClick={() => setShowReservationModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleReservation}
                disabled={!reservationDate || !visitorName || !licensePlate}
              >
                <i className="fas fa-check"></i> Confirm Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </InternLayout>
  );
};

export default ParkingMap;