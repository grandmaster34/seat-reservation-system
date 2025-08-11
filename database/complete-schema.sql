-- Complete database schema for parking slot reservation system

-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    license_plate VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS Reservations (
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
CREATE INDEX idx_reservations_intern_id ON Reservations(intern_id);
CREATE INDEX idx_reservations_seat_id ON Reservations(seat_id);
CREATE INDEX idx_reservations_date ON Reservations(reservation_date);
CREATE INDEX idx_reservations_status ON Reservations(status);

-- Insert initial parking slots (if not already exists)
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
