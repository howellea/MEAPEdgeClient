// Connects to the Prosys OPC UA Simulator and saves sensor readings to MongoDB
import {
  OPCUAClient,
  AttributeIds,
  ClientSession,
  TimestampsToReturn
} from 'node-opcua';


import dotenv from 'dotenv';
import Reading from '../models/readings';

dotenv.config();

// Load and validate OPC UA endpoint from .env
const endpointUrl = process.env.OPCUA_ENDPOINT;
if (!endpointUrl) {
  console.error('❌ OPCUA_ENDPOINT is not defined in .env');
  process.exit(1);
}

// Main function that connects to the OPC UA server and polls sensor values
export const pollOpcUaTags = async () => {
  const client = OPCUAClient.create({ endpoint_must_exist: false });

  try {
    await client.connect(endpointUrl);
    console.log(`✅ Connected to OPC UA Server: ${endpointUrl}`);

    const session: ClientSession = await client.createSession();
    console.log("🔐 OPC UA session created");

    const equipmentId = "Pump-101"; // Identifier for MongoDB
    const Temperature = "ns=3;i=1009";
    const FlowRate = "ns=3;i=1010";
    const MotorStatus = "ns=3;i=1011";
    const Vibration = "ns=3;i=1012";

    setInterval(async () => {
      try {
        // Read live values from the OPC UA tags
        const [temp, flow, motor, vibration] = await Promise.all([
          session.read({ nodeId: Temperature, attributeId: AttributeIds.Value }),
          session.read({ nodeId: FlowRate, attributeId: AttributeIds.Value }),
          session.read({ nodeId: MotorStatus, attributeId: AttributeIds.Value }),
          session.read({ nodeId: Vibration, attributeId: AttributeIds.Value })
        ]);

        console.log(`[📡 Read] Temp=${temp.value.value}, Flow=${flow.value.value}, Motor=${motor.value.value}, Vibration=${vibration.value.value}`);

        // Construct the MongoDB document
        const reading = new Reading({
          equipmentId,
          timestamp: new Date(),
          tags: {
            temperature: temp.value.value,
            flowRate: flow.value.value,
            motorStatus: motor.value.value,
            vibration: vibration.value.value
          }
        });

        await reading.save();
        console.log('✅ Saved reading to MongoDB');

      } catch (err) {
        console.error('⚠️ Read or Save Error:', err);
      }
    }, 3000); // Run every 3 seconds

  } catch (err) {
    console.error('❌ OPC UA Connection Error:', err);
  }
};
