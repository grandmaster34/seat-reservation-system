-- Create seats table
CREATE TABLE IF NOT EXISTS seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seat_number VARCHAR(10) NOT NULL UNIQUE,
    location VARCHAR(50) NOT NULL,
    status ENUM('available', 'occupied', 'maintenance') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert initial parking slots
INSERT INTO seats (seat_number, location, status) VALUES
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
