import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    carName: { type: String, required: true },
    carModel: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    seats: { type: Number, required: true },
    driverName: { type: String, required: true },
     carImage: [{ type: String, required: true }], 
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
