import { useEffect, useState } from "react";
import API from "../utils/api";

export const useChat = (receiverId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch old messages
  useEffect(() => {
    if (!receiverId) return;

    const fetchMessages = async () => {
      try {
        const { data } = await API.get(`/message/${receiverId}`);
        setMessages(data || []);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [receiverId]);

  // Send new message
  const sendMessage = async (text) => {
    try {
      const { data } = await API.post(`/message/send/${receiverId}`, {
        message: text,
      });

      // Optimistic update (show immediately)
      setMessages((prev) => [
        ...prev,
        {
          senderId: "me", // replace with logged-in userId if available
          receiverId,
          message: text,
        },
      ]);

      return data;
    } catch (err) {
      console.error("Error sending message:", err.response?.data || err);
      throw err;
    }
  };

  return { messages, loading, sendMessage };
};
