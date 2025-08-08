const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes - no authentication required
router.get('/', seatController.getAllSeats);
router.get('/available', seatController.getAvailableSeats);

// Protected routes - require authentication
router.use(authMiddleware);

// Create a new seat (admin only)
router.post('/', seatController.createSeat);

// Get a specific seat (parameterized route last)
router.get('/:id', seatController.getSeat);

// Update a seat (admin only)
router.put('/:id', seatController.updateSeat);

// Delete a seat (admin only)
router.delete('/:id', seatController.deleteSeat);

module.exports = router; 