const Seat = require('../models/Seat');

// Get all seats
exports.getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.findAll();
    res.json({ success: true, data: seats });
  } catch (err) {
    console.error('❌ Get all seats error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get available seats
exports.getAvailableSeats = async (req, res) => {
  try {
    const { date, timeSlot } = req.query;
    
    if (!date || !timeSlot) {
      return res.status(400).json({ 
        success: false, 
        message: 'Date and time slot are required' 
      });
    }

    const availableSeats = await Seat.findAvailable(date, timeSlot);
    res.json({ success: true, data: availableSeats });
  } catch (err) {
    console.error('❌ Get available seats error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create a new seat (admin only)
exports.createSeat = async (req, res) => {
  const { seatNumber, row, section, isActive } = req.body;

  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    // Validate required fields
    if (!seatNumber || !row || !section) {
      return res.status(400).json({ 
        success: false, 
        message: 'Seat number, row, and section are required' 
      });
    }

    // Check if seat already exists
    const existingSeat = await Seat.findByNumber(seatNumber);
    if (existingSeat) {
      return res.status(400).json({ success: false, message: 'Seat already exists' });
    }

    const seatId = await Seat.create(seatNumber, row, section, isActive);
    
    console.log('✅ Seat created successfully:', { seatId, seatNumber });
    res.status(201).json({ success: true, seatId });
  } catch (err) {
    console.error('❌ Create seat error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get a specific seat
exports.getSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const seat = await Seat.findById(id);
    
    if (!seat) {
      return res.status(404).json({ success: false, message: 'Seat not found' });
    }

    res.json({ success: true, data: seat });
  } catch (err) {
    console.error('❌ Get seat error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update a seat (admin only)
exports.updateSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const { seatNumber, row, section, isActive } = req.body;

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const seat = await Seat.findById(id);
    if (!seat) {
      return res.status(404).json({ success: false, message: 'Seat not found' });
    }

    await Seat.update(id, { seatNumber, row, section, isActive });
    
    console.log('✅ Seat updated successfully:', { id });
    res.json({ success: true, message: 'Seat updated successfully' });
  } catch (err) {
    console.error('❌ Update seat error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a seat (admin only)
exports.deleteSeat = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const seat = await Seat.findById(id);
    if (!seat) {
      return res.status(404).json({ success: false, message: 'Seat not found' });
    }

    await Seat.delete(id);
    
    console.log('✅ Seat deleted successfully:', { id });
    res.json({ success: true, message: 'Seat deleted successfully' });
  } catch (err) {
    console.error('❌ Delete seat error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}; 