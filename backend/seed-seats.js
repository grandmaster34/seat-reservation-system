const db = require('./config/db');
const Seat = require('./models/Seat');

async function seedSeats() {
  try {
    console.log('🌱 Seeding parking slots...');
    
    // Check if seats already exist
    const existingSeats = await Seat.findAll();
    if (existingSeats.length > 0) {
      console.log('✅ Seats already exist, skipping seed');
      return;
    }

    // Create parking slots
    const parkingSlots = [
      { seatNumber: 'A1', location: 'Main Area' },
      { seatNumber: 'A2', location: 'Main Area' },
      { seatNumber: 'A3', location: 'Main Area' },
      { seatNumber: 'A4', location: 'Main Area' },
      { seatNumber: 'A5', location: 'Main Area' },
      { seatNumber: 'B1', location: 'Main Area' },
      { seatNumber: 'B2', location: 'Main Area' },
      { seatNumber: 'B3', location: 'Main Area' },
      { seatNumber: 'B4', location: 'Main Area' },
      { seatNumber: 'B5', location: 'Main Area' },
      { seatNumber: 'C1', location: 'Side Area' },
      { seatNumber: 'C2', location: 'Side Area' },
      { seatNumber: 'C3', location: 'Side Area' },
      { seatNumber: 'C4', location: 'Side Area' },
      { seatNumber: 'C5', location: 'Side Area' },
    ];

    for (const slot of parkingSlots) {
      await Seat.create(slot.seatNumber, slot.location, 'available');
      console.log(`✅ Created slot ${slot.seatNumber} at ${slot.location}`);
    }

    console.log('🎉 Successfully seeded parking slots!');
  } catch (error) {
    console.error('❌ Error seeding seats:', error);
  } finally {
    process.exit(0);
  }
}

// Run the seed script
seedSeats();
