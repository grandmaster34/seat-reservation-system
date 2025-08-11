const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'seat_reservation'
    });

    console.log('🔧 Setting up database...');

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'intern') DEFAULT 'intern',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create seats table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS seats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        seat_number VARCHAR(10) NOT NULL UNIQUE,
        location VARCHAR(50) NOT NULL,
        status ENUM('available', 'occupied', 'maintenance') DEFAULT 'available',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create visitors table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        license_plate VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create reservations table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS reservations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        intern_id INT NOT NULL,
        seat_id INT NOT NULL,
        reservation_date DATE NOT NULL,
        time_slot VARCHAR(50) DEFAULT 'Full day',
        visitor_id INT NOT NULL,
        status ENUM('active', 'cancelled', 'completed') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (intern_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (seat_id) REFERENCES seats(id) ON DELETE CASCADE,
        FOREIGN KEY (visitor_id) REFERENCES visitors(id) ON DELETE CASCADE
      )
    `);

    // Create indexes
    await connection.execute('CREATE INDEX IF NOT EXISTS idx_reservations_intern_id ON reservations(intern_id)');
    await connection.execute('CREATE INDEX IF NOT EXISTS idx_reservations_seat_id ON reservations(seat_id)');
    await connection.execute('CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(reservation_date)');
    await connection.execute('CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status)');

    // Insert initial parking slots
    await connection.execute(`
      INSERT IGNORE INTO seats (seat_number, location, status) VALUES
      ('A1', 'Main Area', 'available'),
      ('A2', 'Main Area', 'available'),
      ('A3', 'Main Area', 'available'),
      ('A4', 'Main Area', 'available'),
      ('A5', 'Main Area', 'available'),
      ('B1', 'Main Area', 'available'),
      ('B2', 'Main Area', 'available'),
      ('B3', 'Main Area', 'available'),
      ('B4', 'Main Area', 'available'),
      ('B5', 'Main Area', 'available'),
      ('C1', 'Side Area', 'available'),
      ('C2', 'Side Area', 'available'),
      ('C3', 'Side Area', 'available'),
      ('C4', 'Side Area', 'available'),
      ('C5', 'Side Area', 'available')
    `);

    console.log('✅ Database setup completed successfully!');
    await connection.end();
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
