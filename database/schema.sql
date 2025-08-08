 CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('intern', 'admin') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Seats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seat_number VARCHAR(50) NOT NULL,
  location VARCHAR(100),
  status ENUM('available', 'unavailable') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  area_id INT NOT NULL,
  FOREIGN KEY (area_id) REFERENCES areas(id)
);

CREATE TABLE Reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  intern_id INT NOT NULL,
  seat_id INT NOT NULL,
  reservation_date DATE NOT NULL,
  time_slot VARCHAR(50),
  status ENUM('active', 'cancelled') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  visitor_id INT NOT NULL,
  FOREIGN KEY (intern_id) REFERENCES Users(id),
  FOREIGN KEY (seat_id) REFERENCES Seats(id),
  FOREIGN KEY (visitor_id) REFERENCES visitors(id),
);

CREATE TABLE visitors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    license_plate VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE time_slots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    label VARCHAR(50), -- e.g. '9:00 AM - 5:00 PM'
    start_time TIME,
    end_time TIME
);

CREATE TABLE areas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL -- e.g., 'Main Lot', 'VIP Area'
);
