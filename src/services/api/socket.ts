import { io, Socket } from "socket.io-client";

const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:8080");

export const joinRoom = (roomId: string) => {
  socket.emit("joinRoom", roomId);
  console.log(`Joined room: ${roomId}`);
};

export const sendAuthentication = (token: string) => {
  socket.emit("authenticate", { token });
  console.log(`Sent authentication token: ${token}`);
};

export default socket;
