// This connects to the Prosys OPC UA server and reads simulated tags.
// src/services/opcClient.ts

// Import OPC UA client classes
    // These are all key building blocks from the node-opcua library,__
    // and each one plays a role in communicating with the OPC UA server.
import {
    OPCUAClient,
    AttributeIds,
    TimestampsToReturn,
    ClientSession
  } from 'node-opcua';
  
  // Import Mongoose model for saving sensor data
  import Reading from '../models/readings';
  
  // URL for the Prosys OPC UA Simulation Server
  const endpointUrl = "opc.tcp://eddys-MBP.attlocal.net:53530/OPCUA/SimulationServer";
  
  // Function to connect and continuously poll OPC UA tags
  export const pollOpcUaTags = async () => {
    // Create a new OPC UA client
    const client = OPCUAClient.create({ endpoint_must_exist: false });
  
    try {
      // Connect to the OPC UA server
      await client.connect(endpointUrl);
  
      // Create a session for reading data
      const session: ClientSession = await client.createSession();
  
      // Simulated equipment ID for identification in DB
      const equipmentId = "Pump-101";
  
      // Start a loop to poll data every 3 seconds
      setInterval(async () => {
        // Read values for each tag from the OPC UA server
        const [temp, flow, motor, vibration] = await Promise.all([
          session.read({ nodeId: "ns=5;s=Pump1.Temperature", attributeId: AttributeIds.Value }),
          session.read({ nodeId: "ns=5;s=Pump1.FlowRate", attributeId: AttributeIds.Value }),
          session.read({ nodeId: "ns=5;s=Pump1.MotorStatus", attributeId: AttributeIds.Value }),
          session.read({ nodeId: "ns=5;s=Pump1.Vibration", attributeId: AttributeIds.Value })
        ]);
  
        // Create a new reading document with the tag values
        const reading = new Reading({
          equipmentId,
          tags: {
            temperature: temp.value.value,
            flowRate: flow.value.value,
            motorStatus: motor.value.value,
            vibration: vibration.value.value
          }
        });
  
        // Save the reading to MongoDB Atlas
        await reading.save();
        console.log('✅ Reading saved:', reading);
  
      }, 3000); // 3 seconds polling interval
  
    } catch (err) {
      console.error('OPC UA client error:', err);
    }
  };
  