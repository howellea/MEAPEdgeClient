// This defines how each equipment reading is structured in MongoDB
import mongoose from 'mongoose';

// Define a schema for storing sensor data from equipment
const readingSchema = new mongoose.Schema({
  // Identifies which equipment this reading is from (e.g., Pump-101)
  equipmentId: {
    type: String,
    required: true
  },

  // Automatically saves the current date/time
  timestamp: {
    type: Date,
    default: Date.now
  },

  // Sensor data captured at the time of the reading
  tags: {
    temperature: {
      type: Number,
      required: false
    },
    flowRate: {
      type: Number,
      required: false
    },
    motorStatus: {
      type: String, // String allows statuses like "Running", "Stopped", etc.
      required: false
    },
    vibration: {
      type: Number,
      required: false
    }
  }
});

// Create a model from the schema
const Livereading = mongoose.model('Livereading', readingSchema);

// Export the model so it can be used in other files (e.g., opcClient.ts)
export default Livereading;
