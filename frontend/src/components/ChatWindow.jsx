import { useState } from "react";
import { useChat } from "../hooks/useChat";
import { toast } from "react-toastify";

export default function ChatWindow({ user, onBack }) {
  const { messages, loading, sendMessage } = useChat(user._id);
  const [text, setText] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage(text);
      setText("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/20 backdrop-blur-md rounded-lg md:m-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/30 bg-white/10">
        {/* Back button only on mobile */}
        <button
          className="md:hidden text-white text-lg mr-2"
          onClick={onBack}
        >
          ←
        </button>
        <img
          src={user.profilePhoto}
          alt={user.username}
          className="w-10 h-10 rounded-full border border-white/50"
        />
        <h3 className="font-semibold text-white">{user.fullName}</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {loading ? (
          <p className="text-center text-white/70">Loading...</p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-2 ${
                msg.senderId === user._id ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.senderId === user._id
                    ? "bg-white/30 text-black"
                    : "bg-blue-600/80 text-white"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="p-4 border-t border-white/30 bg-white/10 flex gap-2"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-white/40 bg-white/20 text-white rounded-lg px-4 py-2 placeholder-white/70 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
