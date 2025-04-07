# MEAPEdgeClient
 OPC UA Simulator and OPC UA client for the MEAP Application 
 
### TL;DR Summary Table

| Name               | Role                                                                 |
|--------------------|----------------------------------------------------------------------|
| `OPCUAClient`      | Connects your app to the OPC UA server                               |
| `AttributeIds`     | Tells the server what you want to read (like `.Value`)               |
| `TimestampsToReturn` | Lets you request timestamps (optional in polling)                    |
| `ClientSession`    | An active user session to read/write data from the server            |
