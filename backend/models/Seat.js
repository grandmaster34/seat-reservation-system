const db = require('../config/db');

class Seat {
  constructor(id, seat_number, location, status, created_at, updated_at) {
    this.id = id;
    this.seat_number = seat_number;
    this.location = location;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM seats ORDER BY seat_number');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM seats WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByNumber(seatNumber) {
    const [rows] = await db.execute('SELECT * FROM seats WHERE seat_number = ?', [seatNumber]);
    return rows[0];
  }

  static async create(seatNumber, location, status = 'available') {
    const [result] = await db.execute(
      'INSERT INTO seats (seat_number, location, status) VALUES (?, ?, ?)',
      [seatNumber, location, status]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const [result] = await db.execute(
      'UPDATE seats SET seat_number = ?, location = ?, status = ? WHERE id = ?',
      [data.seat_number, data.location, data.status, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM seats WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async findAvailable(date, timeSlot) {
    // This would need to be implemented based on your reservation logic
    const [rows] = await db.execute(`
      SELECT s.* FROM seats s 
      WHERE s.status = 'available' 
      AND s.id NOT IN (
        SELECT seat_id FROM reservations 
        WHERE reservation_date = ? AND status = 'active'
      )
    `, [date]);
    return rows;
  }
}

module.exports = Seat;
