
# Maintenance Engineer Assist Platform (MEAP)

## Overview
The **Maintenance Engineer Assist Platform (MEAP)** is a role-aware full-stack application tailored for industrial environments. It supports maintenance engineers, electrical/instrumentation technicians, and mechanics in monitoring, troubleshooting, and optimizing equipment performance.

The platform connects securely to a simulated OPC UA server to retrieve real-time industrial data. It also supports historical analytics, equipment profile management, and fault logging/resolution workflows.

---

## 📁 Table of Contents

- [Overview](#overview)
- [1. System Architecture](#1-system-architecture)
- [2. Core Features](#2-core-features)
- [3. Backend Details](#3-backend-details)
- [4. Simulator Integration](#4-simulator-integration)
- [5. Deployment](#5-deployment)
- [6. Roadmap & Future Features](#6-roadmap--future-features)
- [7. Credits](#7-credits)
- [8. Decision Summary](#8-decision-summary)
- [9. Edge Client Requirements (MacBook #1)](#9-edge-client-requirements-macbook-1)
- [10. Cloud Infrastructure](#10-cloud-infrastructure)
- [11. Next Steps](#11-next-steps)

---

## 1. System Architecture

### 1.1 Technologies Used
- **Frontend:** React (Vite), TypeScript, Tailwind CSS (if used)
- **Backend:** Node.js, Express, Apollo Server (GraphQL)
- **Database:** MongoDB + Mongoose (Atlas Cloud or local)
- **Auth:** JWT-based authentication, bcrypt for password hashing
- **Simulation:** Prosys OPC UA Simulation Server

### 1.2 Directory Structure
\`\`\`
Capstone-MEAP/
├── client/
├── meap_server/
├── opcua-edge-client/
└── .env
\`\`\`

---

## 2. Core Features

### 2.1 Authentication & Roles
- JWT auth with role-based UI

### 2.2 Dashboard
- Personalized KPI cards, live sensor feed

### 2.3 Equipment Monitoring
- Live and historical data

### 2.4 Fault Logging
- Report, track, resolve faults

### 2.5 User Profile Page
- Displays user stats

---

## 3. Backend Details

### 3.1 Models
- User, EquipmentProfile, Reading, EquipmentFault

### 3.2 GraphQL API
- `me`, `equipmentProfiles`, `addUser`, `login`, etc.

---

## 4. Simulator Integration

### 4.1 Prosys OPC UA Simulation Server
- Download: [Prosys OPC UA Server](https://www.prosysopc.com/products/opc-ua-simulation-server/)
- Setup:
  - Launch the server
  - Right-click `Objects > Simulation` → Add Object → Name: `Pump-101`
  - Add variables: Temperature, FlowRate, MotorStatus, Vibration
  - Configure NodeIds, DataType, Sampling Interval

### 4.2 Integration Strategy
- Connect via `opc.tcp://eddys-MBP.attlocal.net:53530/OPCUA/SimulationServer`
- Example NodeIds:
  \`\`\`ts
  const TEMPERATURE = "ns=3;i=1009";
  const FLOW = "ns=3;i=1010";
  \`\`\`
- Store readings in MongoDB every 3s

---

## 5. Deployment

### 5.1 Scripts
\`\`\`bash
npm install
npm run dev
npm run build
\`\`\`

### 5.2 Environments
- Atlas DB string in `.env`

---

## 6. Roadmap & Future Features
- WebSockets
- Predictive maintenance
- Notifications

---

## 7. Credits
- Created by Eddy Howell
- Simulation: [Prosys OPC UA](https://www.prosysopc.com/products/opc-ua-simulation-server/)
- Libraries:
  - [Node-OPCUA](https://github.com/node-opcua/node-opcua)
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - [Render](https://render.com)

---

## 8. Decision Summary
- MacBook #1 runs the OPC UA server and edge client
- Edge client connects to MongoDB Atlas

---

## 9. Edge Client Requirements (MacBook #1)
- `opcua-edge-client/`
- `src/services/opcClient.ts`, `models/reading.ts`, `config/db.ts`
- Polling service connected to simulator
- `.env` with `MONGO_URI`, `OPCUA_ENDPOINT`

---

## 10. Cloud Infrastructure
- Backend: Render
- Frontend: Netlify
- Database: MongoDB Atlas

---

## 11. Next Steps
- [x] Setup simulator
- [x] Confirm database connection
- [x] Read live sensor values
- [x] Populate MEAP frontend

---

## TL;DR Summary Table

| Name               | Role                                                                 |
|--------------------|----------------------------------------------------------------------|
| \`OPCUAClient\`      | Connects your app to the OPC UA server                               |
| \`AttributeIds\`     | Tells the server what you want to read (like \`.Value\`)             |
| \`TimestampsToReturn\` | Lets you request timestamps (optional in polling)                  |
| \`ClientSession\`    | An active user session to read/write data from the server            |
