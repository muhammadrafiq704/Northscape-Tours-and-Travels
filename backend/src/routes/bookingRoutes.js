// routes/unifiedRoutes.js
import express from "express";
import BookingHandler, { getBooking, getBookings } from "../controllers/BookingController.js";

const router = express.Router();

router.post("/", BookingHandler);
router.get("/", getBookings);
router.get("/:id", getBooking);
// router.put("/:id", updateEntry);
// router.delete("/:id", deleteEntry);

export default router;