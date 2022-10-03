"use strict";

const express = require("express");
const path = require("path");
const { createServer } = require("http");

const WebSocket = require("ws");

const app = express();
app.use(express.static(path.join(__dirname, "/public")));

const server = createServer(app);
const wss = new WebSocket.Server({ server });

// ESTABLISH CONNECTION WEBSOCKET
wss.on("connection", (ws) => {

  // SERVER RECEIVED FROM CLIENT
  ws.on("message", (data, isBinary) => {
    // const dataRec = JSON.stringify(data);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  // SERVER RECEIVED CLOSE BROWSER FROM CLIENT
  ws.on("close", () => {
    console.log("stopping client interval");
  });
});

server.listen(8080, () => {
  console.log("Listening on http://127.0.0.1:8080");
});
