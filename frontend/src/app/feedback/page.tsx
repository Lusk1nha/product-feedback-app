"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function FeedbackPage() {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    // Conecta ao servidor Socket.IO
    const socket = io("http://localhost:8000", {
      reconnection: true,
    });
    // Escuta o evento 'message-back' do servidor
    socket.on("message-back", (data) => {
      setReceivedMessage(data);
    });

    // Envia uma mensagem para o servidor
    socket.emit("message", "Hello from Next.js!");

    // Limpa o socket ao desmontar o componente
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Socket Test</h1>
      <div>
        Received Message: <pre>{JSON.stringify(receivedMessage, null, 2)}</pre>
      </div>
    </div>
  );
}
