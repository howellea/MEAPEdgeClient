// This defines how each sensor reading will be stored in MongoDB.
import mongoose from 'mongoose';

// Define a schema for storing equipment sensor data
const readingSchema = new mongoose.Schema({
  // Each reading is tied to a specific equipment (e.g., Pump-101)
  equipmentId: { type: String, required: true },

  // Timestamp defaults to now when saved
  timestamp: { type: Date, default: Date.now },

  // Tags represent the various sensor measurements
  tags: {
    temperature: Number,     // Simulated temperature value
    flowRate: Number,        // Simulated flow rate
    motorStatus: String,     // Running, Stopped, Faulted, etc.
    vibration: Number        // Simulated vibration value
  }
});

// Create a model from the schema
const Reading = mongoose.model('Reading', readingSchema);

// Export the model to use in other files
export default Reading;

