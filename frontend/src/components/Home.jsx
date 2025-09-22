import { useEffect, useState } from "react";
import API from "../utils/api";
import ChatWindow from "./ChatWindow";
import LogoutButton from "./LogoutButton";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch other users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/user");
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="h-screen flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* Sidebar (hidden on mobile when user selected) */}
      <div
        className={`w-full md:w-1/4 bg-white/20 backdrop-blur-md border-r border-white/30 flex flex-col text-white transition-all duration-300
        ${selectedUser ? "hidden md:flex" : "flex"}`}
      >
        <h2 className="text-xl font-bold p-4 border-b border-white/30">Users</h2>

        <ul className="flex-1 overflow-y-auto">
          {users.map((u) => (
            <li
              key={u._id}
              className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg mx-2 my-1 transition ${
                selectedUser?._id === u._id
                  ? "bg-white/30 text-black"
                  : "hover:bg-white/10"
              }`}
              onClick={() => setSelectedUser(u)}
            >
              <img
                src={u.profilePhoto}
                alt={u.username}
                className="w-10 h-10 rounded-full border border-white/50"
              />
              <span>{u.fullName}</span>
            </li>
          ))}
        </ul>

        {/* Logout Button at bottom */}
        <div className="p-4 border-t border-white/30">
          <LogoutButton />
        </div>
      </div>

      {/* Chat Window (hidden on mobile until user is selected) */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <ChatWindow user={selectedUser} onBack={() => setSelectedUser(null)} />
        ) : (
          <div className="hidden md:flex items-center justify-center h-full text-white/80">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
