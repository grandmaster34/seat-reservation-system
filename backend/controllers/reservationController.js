const Reservation = require('../models/Reservation');
const Seat = require('../models/Seat');

// Get all reservations (admin only)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json({ success: true, data: reservations });
  } catch (err) {
    console.error('❌ Get all reservations error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get user's reservations
exports.getUserReservations = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reservations = await Reservation.findByUserId(userId);
    res.json({ success: true, data: reservations });
  } catch (err) {
    console.error('❌ Get user reservations error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get parking reservations with filtering
exports.getParkingReservations = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { status, startDate, endDate } = req.query;
    
    let reservations = await Reservation.findByUserId(userId);
    
    // Filter by status if provided
    if (status && status !== 'All Reservations') {
      reservations = reservations.filter(r => r.status === status.toLowerCase());
    }
    
    // Filter by date range if provided
    if (startDate && endDate) {
      reservations = reservations.filter(r => {
        const reservationDate = new Date(r.reservation_date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return reservationDate >= start && reservationDate <= end;
      });
    }
    
    res.json({ success: true, data: reservations });
  } catch (err) {
    console.error('❌ Get parking reservations error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create parking reservation with visitor
exports.createParkingReservation = async (req, res) => {
  const { seat_id, reservation_date, visitor_name, license_plate, time_slot = 'Full day' } = req.body;
  const intern_id = req.user.userId;

  try {
    // Validate required fields
    if (!seat_id || !reservation_date || !visitor_name || !license_plate) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Check if seat exists
    const seat = await Seat.findById(seat_id);
    if (!seat) {
      return res.status(404).json({ success: false, message: 'Parking slot not found' });
    }

    // Check if seat is already reserved for this date
    const existingReservation = await Reservation.findBySeatAndDate(seat_id, reservation_date);
    if (existingReservation && existingReservation.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Parking slot is already reserved for this date' 
      });
    }

    // Create reservation with visitor
    const reservationId = await Reservation.create({
      intern_id,
      seat_id,
      reservation_date,
      visitor_name,
      license_plate,
      time_slot,
      status: 'upcoming'
    });
    
    console.log('✅ Parking reservation created successfully:', { 
      reservationId, 
      intern_id, 
      seat_id, 
      visitor_name 
    });
    
    res.status(201).json({ 
      success: true, 
      reservationId,
      message: 'Parking reservation created successfully' 
    });
  } catch (err) {
    console.error('❌ Create parking reservation error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update reservation status
exports.updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    // Check if user owns this reservation
    if (reservation.intern_id !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Reservation.updateStatus(id, status);
    
    console.log('✅ Reservation status updated:', { id, status });
    res.json({ success: true, message: 'Reservation status updated successfully' });
  } catch (err) {
    console.error('❌ Update reservation status error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create a new reservation
exports.createReservation = async (req, res) => {
  const { seatId, date, timeSlot } = req.body;
  const userId = req.user.userId;

  try {
    // Validate required fields
    if (!seatId || !date || !timeSlot) {
      return res.status(400).json({ 
        success: false, 
        message: 'Seat ID, date, and time slot are required' 
      });
    }

    // Check if seat exists and is available
    const seat = await Seat.findById(seatId);
    if (!seat) {
      return res.status(404).json({ success: false, message: 'Seat not found' });
    }

    // Check if seat is already reserved for this date and time
    const existingReservation = await Reservation.findBySeatAndDateTime(seatId, date, timeSlot);
    if (existingReservation) {
      return res.status(400).json({ 
        success: false, 
        message: 'Seat is already reserved for this date and time' 
      });
    }

    const reservationId = await Reservation.create(userId, seatId, date, timeSlot);
    
    // Update seat status to occupied
    await Seat.update(seatId, { status: 'occupied' });
    
    console.log('✅ Reservation created successfully:', { reservationId, userId, seatId });
    res.status(201).json({ success: true, reservationId });
  } catch (err) {
    console.error('❌ Create reservation error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get a specific reservation
exports.getReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    res.json({ success: true, data: reservation });
  } catch (err) {
    console.error('❌ Get reservation error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update a reservation
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, timeSlot } = req.body;
    const userId = req.user.userId;

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    // Check if user owns this reservation or is admin
    if (reservation.userId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Reservation.update(id, { date, timeSlot });
    
    console.log('✅ Reservation updated successfully:', { id });
    res.json({ success: true, message: 'Reservation updated successfully' });
  } catch (err) {
    console.error('❌ Update reservation error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    // Check if user owns this reservation or is admin
    if (reservation.userId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Reservation.delete(id);
    
    console.log('✅ Reservation deleted successfully:', { id });
    res.json({ success: true, message: 'Reservation deleted successfully' });
  } catch (err) {
    console.error('❌ Delete reservation error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}; 