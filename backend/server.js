const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

// middleware
app.use(cors());
app.use(express.json());

// database file
const DB_PATH = path.join(__dirname, 'database.json');

// read database
function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

// write database
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// dummy auth middleware (replace with your real one if needed)
function authenticateToken(req, res, next) {
  req.user = { id: "user-001" };
  next();
}

// ================= BOOKING API =================

app.post('/api/bookings', authenticateToken, (req, res) => {

  const db = readDB();
  const bookingData = req.body;

  const newBooking = {
    id: `TB${uuidv4().substring(0, 8).toUpperCase()}`,
    orderId: uuidv4(),
    userId: req.user.id,
    tourId: bookingData.tourId,
    tourTitle: bookingData.tourTitle,
    tourImage: bookingData.tourImage,
    tourLocation: bookingData.tourLocation,
    tourDuration: bookingData.tourDuration,
    personalInfo: bookingData.personalInfo,
    travelDetails: bookingData.travelDetails,
    emergencyContact: bookingData.emergencyContact,
    paymentInfo: {
      cardLast4: bookingData.paymentInfo.cardNumber.slice(-4),
      cardHolder: bookingData.paymentInfo.cardHolder
    },
    totalAmount: bookingData.totalAmount,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  db.bookings.push(newBooking);
  writeDB(db);

  res.status(201).json({
    message: "Booking successful",
    booking: newBooking
  });

});

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});