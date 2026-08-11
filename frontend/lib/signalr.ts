import * as signalR from "@microsoft/signalr";

const SIGNALR_URL = process.env.NEXT_PUBLIC_SIGNALR_URL || "http://localhost:5000/hubs/task";

let connection: signalR.HubConnection | null = null;

export function getSignalRConnection(): signalR.HubConnection {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(SIGNALR_URL, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  return connection;
}
