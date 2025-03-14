import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import MintProofButton from "./MintProofButton";

function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesRef = collection(db, "chats", "room1", "messages");

  useEffect(() => {
    const q = query(messagesRef, orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    await addDoc(messagesRef, {
      text: input,
      sender: user.uid,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="chat-container">
      <h1 className="chat-title">Proof of Chat</h1>
      <div className="messages-box">
        {messages.map((msg) => (
          <p
            key={msg.id}
            className={msg.sender === user.uid ? "message own" : "message"}
          >
            {msg.text}
          </p>
        ))}
      </div>
      <div className="input-area">
        <input
          className="text-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="send-btn">
          Send
        </button>
      </div>
      <MintProofButton user={user} />
    </div>
  );
}

export default Chat;
