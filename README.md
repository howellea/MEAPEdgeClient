# MEAP Edge Client_

> 📡 A lightweight OPC UA edge connector that simulates equipment readings using the Prosys OPC UA Simulation Server and writes them to MongoDB Atlas — part of the MEAP (Maintenance Engineer Assist Platform).

---

## 📘 Description

This project is the **data ingestion edge client** for the **MEAP application**. It connects to a simulated OPC UA server (Prosys), polls tag values from industrial devices like pumps and conveyors, and sends them to MongoDB Atlas for analysis and dashboarding.

### 💡 Motivation

Modern smart factories rely on **real-time equipment data**. This edge client demonstrates how to bridge OT (Operational Technology) and IT by streaming simulated sensor values from a local OPC UA server to a cloud database.

---

## 🚀 Features

- Connects to Prosys OPC UA Simulation Server
- Reads live tag values: temperature, flow rate, motor status, vibration
- Saves data to MongoDB Atlas using Mongoose
- TypeScript-powered Node.js application
- Fully modular and production-ready structure
- Environment-based config (`.env`)
- Built-in dev mode via Nodemon

---

## 📦 TL;DR Summary Table

| Name                  | Role                                                                 |
|-----------------------|----------------------------------------------------------------------|
| `OPCUAClient`         | Connects your app to the OPC UA server                               |
| `AttributeIds`        | Tells the server what you want to read (like `.Value`)               |
| `TimestampsToReturn`  | Lets you request timestamps (optional in polling)                    |
| `ClientSession`       | An active user session to read/write data from the server            |

---

## 📁 File Structure

```
MEAPEdgeClient/
├── src/
│   ├── config/             # MongoDB connection config
│   │   └── db.ts
│   ├── models/             # Mongoose schema
│   │   └── readings.ts
│   ├── services/           # OPC UA polling logic
│   │   └── opcClient.ts
│   └── server.ts           # Entry point: connects Mongo + OPC UA
├── .env                    # Contains MONGO_URI and OPCUA_ENDPOINT
├── tsconfig.json           # TypeScript config
├── package.json            # Scripts and dependencies
└── README.md
```

---

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/howellea/MEAPEdgeClient.git
   cd MEAPEdgeClient
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file**
   ```env
   MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/<db>?retryWrites=true&w=majority
   OPCUA_ENDPOINT=opc.tcp://<your-ip>:53530/OPCUA/SimulationServer
   ```

4. **Run in dev mode**
   ```bash
   npm run dev
   ```

5. **Build and run in production**
   ```bash
   npm run build
   npm start
   ```

---

## 🧪 Usage

Once running, the app will:

- Connect to the OPC UA server at the given `OPCUA_ENDPOINT`
- Start polling values every 3 seconds
- Save readings to MongoDB Atlas
- Output logs showing live data from the simulator

---

## 📝 Example Reading Output

```json
{
  "equipmentId": "Pump-101",
  "timestamp": "2025-04-06T23:56:57.001Z",
  "tags": {
    "temperature": 68.2,
    "flowRate": 120.5,
    "motorStatus": "Running",
    "vibration": 3.6
  }
}
```

---

## 🧠 What I Learned

- Using `node-opcua` to connect to industrial-grade simulators
- Managing environmental config with `.env` and `dotenv`
- Structuring Node.js apps for real-world maintainability
- Integrating OT-level data into IT analytics pipelines

---

## 🎓 Credits

- GitHub: [@howellea](https://github.com/howellea)  
- Author: **Eddy Howell**

### Tools & Libraries

- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [node-opcua](https://github.com/node-opcua/node-opcua)
- **[Prosys OPC UA Simulation Server](https://prosysopc.com/products/opc-ua-simulation-server/)**  
   > Used to simulate plant equipment like pumps and conveyors for testing without physical PLCs.

---

## ❓ Questions

If you have any questions or want to collaborate, feel free to reach out:

- GitHub: [howellea](https://github.com/howellea)
- Email: [howelleddy@gmail.com](mailto:howelleddy@gmail.com)
