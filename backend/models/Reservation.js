const db = require('../config/db');

class Reservation {
  static async create({ intern_id, seat_id, reservation_date, visitor_name, license_plate, time_slot = 'Full day', status = 'active' }) {
    try {
      // First create visitor
      const [visitorResult] = await db.execute(
        'INSERT INTO visitors (full_name, license_plate) VALUES (?, ?)',
        [visitor_name, license_plate]
      );
      
      const visitorId = visitorResult.insertId;
      
      // Then create reservation
      const [result] = await db.execute(
        'INSERT INTO reservations (intern_id, seat_id, reservation_date, time_slot, visitor_id, status) VALUES (?, ?, ?, ?, ?, ?)',
        [intern_id, seat_id, reservation_date, time_slot, visitorId, status]
      );
      
      return result.insertId;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute(
      `SELECT r.*, s.seat_number, s.location, v.full_name as visitor_name, v.license_plate 
       FROM Reservations r 
       JOIN Seats s ON r.seat_id = s.id 
       JOIN visitors v ON r.visitor_id = v.id 
       WHERE r.intern_id = ? 
       ORDER BY r.reservation_date DESC`,
      [userId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      `SELECT r.*, s.seat_number, s.location, v.full_name as visitor_name, v.license_plate 
       FROM Reservations r 
       JOIN Seats s ON r.seat_id = s.id 
       JOIN visitors v ON r.visitor_id = v.id 
       WHERE r.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async countByUserId(userId) {
    const [rows] = await db.execute(
      'SELECT COUNT(*) as count FROM Reservations WHERE intern_id = ?',
      [userId]
    );
    return rows[0].count;
  }

  static async getUpcomingByUserId(userId) {
    const [rows] = await db.execute(
      `SELECT r.*, s.seat_number, s.location, v.full_name as visitor_name, v.license_plate 
       FROM Reservations r 
       JOIN Seats s ON r.seat_id = s.id 
       JOIN visitors v ON r.visitor_id = v.id 
       WHERE r.intern_id = ? AND r.reservation_date >= CURDATE() 
       ORDER BY r.reservation_date ASC`,
      [userId]
    );
    return rows;
  }

  static async getRecentByUserId(userId, limit = 5) {
    const [rows] = await db.execute(
      `SELECT r.*, s.seat_number, s.location, v.full_name as visitor_name, v.license_plate 
       FROM Reservations r 
       JOIN Seats s ON r.seat_id = s.id 
       JOIN visitors v ON r.visitor_id = v.id 
       WHERE r.intern_id = ? 
       ORDER BY r.created_at DESC 
       LIMIT ?`,
      [userId, limit]
    );
    return rows;
  }

  static async updateStatus(id, status) {
    const [result] = await db.execute(
      'UPDATE Reservations SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  }

  static async findBySeatAndDate(seatId, date) {
    const [rows] = await db.execute(
      'SELECT * FROM reservations WHERE seat_id = ? AND reservation_date = ? AND status = "active"',
      [seatId, date]
    );
    return rows;
  }

  static async getDetailedByUserId(userId) {
    const [rows] = await db.execute(
      `SELECT r.*, s.seat_number, s.location, v.full_name as visitor_name, v.license_plate 
       FROM Reservations r 
       JOIN Seats s ON r.seat_id = s.id 
       JOIN visitors v ON r.visitor_id = v.id 
       WHERE r.intern_id = ? 
       ORDER BY r.reservation_date DESC`,
      [userId]
    );
    return rows;
  }

  static async findAll() {
    const [rows] = await db.execute(
      `SELECT r.*, s.seat_number, s.location, v.full_name as visitor_name, v.license_plate, u.username as intern_name
       FROM Reservations r 
       JOIN Seats s ON r.seat_id = s.id 
       JOIN visitors v ON r.visitor_id = v.id 
       JOIN users u ON r.intern_id = u.id
       ORDER BY r.created_at DESC`
    );
    return rows;
  }

  static async createVisitor({ full_name, license_plate }) {
    const [result] = await db.execute(
      'INSERT INTO visitors (full_name, license_plate) VALUES (?, ?)',
      [full_name, license_plate]
    );
    return result.insertId;
  }

  static async updateVisitorId(reservationId, visitorId) {
    const [result] = await db.execute(
      'UPDATE Reservations SET visitor_id = ? WHERE id = ?',
      [visitorId, reservationId]
    );
    return result.affectedRows > 0;
  }

  // Add the missing delete method
  static async delete(id) {
    try {
      const [result] = await db.execute(
        'DELETE FROM reservations WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw error;
    }
  }
}

module.exports = Reservation;
