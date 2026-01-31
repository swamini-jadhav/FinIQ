import Chat from "./Chat";
import "./index.css";

export default function App() {
  return (
    <div className="container">
      <h1>Finance Assistant Chatbot</h1>
      <Chat />
      <p className="disclaimer">
        For informative purposes only. Does not provide financial advice.
      </p>
    </div>
  );
}
