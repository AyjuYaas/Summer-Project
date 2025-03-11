import io from "socket.io-client";

const SOCKET_URL: string = "http://localhost:5000";

let socket: any = null;

export const initializeSocket = (userId: string) => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
  socket = io(SOCKET_URL, {
    auth: { userId },
  });
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
