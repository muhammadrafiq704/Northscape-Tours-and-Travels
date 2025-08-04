import Booking from "../models/bookingModel.js";
import nodemailer from "nodemailer";
import bookingsServices from "../services/bookingService.js";
// pcue iygv zngk etou

// --- API Handler ---
export default async function BookingHandler(req, res) {
  if (req.method === "POST") {
    try {
      const bookingData = req.body;
      // 1. Save booking to DB
    const bookings =   await Booking.create(bookingData);
    console.log('bookings', bookings)

      // 1. Create transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // 2. Email content
      const mailOptions = {
        from: `"${bookingData.customerName}" <${process.env.EMAIL_USER}>`, // Gmail will use your auth account
        replyTo: bookingData.customerEmail, // Owner can reply directly to customer
        to: process.env.EMAIL_USER, // Owner's email
        subject: `New Booking: ${bookingData.customerName}`,
        html: `
    <h3>New Booking Received</h3>
    <p><strong>Customer:</strong> ${bookingData.customerName}</p>
    <p><strong>Customer Email:</strong> ${bookingData.customerEmail}</p>
    <p><strong>Phone:</strong> ${bookingData.phoneNumber}</p>
    <p><strong>Pickup:</strong> ${bookingData.pickupLocation} - ${
          bookingData.pickupDate
        } ${bookingData.pickupTime}</p>
    <p><strong>Drop-off:</strong> ${bookingData.dropoffLocation} - ${
          bookingData.dropoffDate
        } ${bookingData.dropoffTime}</p>
    <p><strong>Special Requirements:</strong> ${
      bookingData.specialRequirements || "None"
    }</p>

     <h3>Car Details</h3>
     <p><strong>Car Name:</strong> ${bookingData.carName}</p>
     <p><strong>Car model:</strong> ${bookingData.carModel}</p>
     <p><strong>Price per day:</strong> ${bookingData.pricePerDay}</p>
  `,
      };

      // 3. Send email
      await transporter.sendMail(mailOptions);

      res
        .status(200)
        .json({ success: true, message: "Booking created and email sent", bookings });
    } catch (error) {
      console.error("Booking error:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to create booking" });
    }
  }

  if (req.method === "GET") {
    try {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, bookings });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to fetch bookings" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id, status } = req.body;
      const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      return res.status(200).json({ success: true, booking: updatedBooking });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to update booking" });
    }
  }

  res.status(405).end();
}

export const getBookings = async (req, res) => {
  try {
    const bookings = await bookingsServices.getAllBookings(req.query);
    // const bookings = await Booking.find();
    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: error.message,
    });
  }
};
export const getBooking = async (req, res) => {
  try {
    // const bookings = await bookingsServices.getAllBookings(req.query);
    const booking = await Booking.findById(req.params.id);
    console.log('booking', booking)
    res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching booking",
      error: error.message,
    });
  }
};
