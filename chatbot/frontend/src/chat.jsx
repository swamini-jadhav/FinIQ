import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", text: "Server error" }]);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className={m.role}>
            {m.text}
          </div>
        ))}
        {loading && <div className="bot">Typing...</div>}
      </div>

      <div className="input-box">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="How can I help you today?"
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Enter</button>
      </div>
    </>
  );
}
