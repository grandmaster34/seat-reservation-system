-- Fix database schema - ensure all required tables exist

-- Create users table (if not exists)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'intern') DEFAULT 'intern',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create seats table
CREATE TABLE IF NOT EXISTS seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seat_number VARCHAR(10) NOT NULL UNIQUE,
    location VARCHAR(50) NOT NULL,
    status ENUM('available', 'occupied', 'maintenance') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create visitors table (missing from original schema)
CREATE TABLE IF NOT EXISTS visitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    license_plate VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create reservations table
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
);

-- Create indexes for better performance
CREATE INDEX idx_reservations_intern_id ON reservations(intern_id);
CREATE INDEX idx_reservations_seat_id ON reservations(seat_id);
CREATE INDEX idx_reservations_date ON reservations(reservation_date);
CREATE INDEX idx_reservations_status ON reservations(status);

-- Insert initial parking slots
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
('C5', 'Side Area', 'available');
