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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  intern_id INT NOT NULL,
  seat_id INT NOT NULL,
  reservation_date DATE NOT NULL,
  time_slot VARCHAR(50),
  status ENUM('active', 'cancelled') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (intern_id) REFERENCES Users(id),
  FOREIGN KEY (seat_id) REFERENCES Seats(id)
);
