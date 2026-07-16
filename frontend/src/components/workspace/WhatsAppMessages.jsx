import { useMemo, useState } from "react";
import { Search, MessageCircle } from "lucide-react";

export default function WhatsAppMessages({ whatsapp }) {
  if (!whatsapp) return null;

  const chats = whatsapp.chat_list || [];
  const messages = whatsapp.messages || [];

  const [selectedChat, setSelectedChat] = useState(
    chats.length > 0 ? chats[0].chat_id : null
  );

  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const sameChat = msg.chat_id === selectedChat;

      const matchesSearch = (msg.text || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return sameChat && matchesSearch;
    });
  }, [messages, selectedChat, searchTerm]);

  return (
    <div className="bg-[#0a0c10] border border-slate-800 rounded-xl overflow-hidden">

      <div className="grid grid-cols-12 h-[650px]">

        {/* ---------------- LEFT PANEL ---------------- */}

        <div className="col-span-4 border-r border-slate-800 flex flex-col">

          <div className="p-4 border-b border-slate-800">

            <h2 className="text-green-400 font-bold uppercase tracking-wider">
              WhatsApp Chats
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              {chats.length} Chats Found
            </p>

          </div>

          <div className="overflow-y-auto flex-1">

            {chats.map((chat) => (

              <button
                key={chat.chat_id}
                onClick={() => setSelectedChat(chat.chat_id)}
                className={`w-full text-left px-4 py-4 border-b border-slate-800 transition

                ${
                  selectedChat === chat.chat_id
                    ? "bg-slate-900"
                    : "hover:bg-slate-900"
                }`}
              >

                <div className="flex items-center gap-3">

                  <MessageCircle
                    size={18}
                    className="text-green-400"
                  />

                  <div>

                    <p className="text-white text-sm break-all">

                      {chat.jid}

                    </p>

                    <p className="text-xs text-slate-500">

                      Chat ID : {chat.chat_id}

                    </p>

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* ---------------- RIGHT PANEL ---------------- */}

        <div className="col-span-8 flex flex-col">

          {/* Header */}

          <div className="p-4 border-b border-slate-800">

            <h2 className="text-green-400 font-bold uppercase tracking-wider mb-4">

              Conversation

            </h2>

            <div className="relative">

              <Search
                size={16}
                className="absolute left-3 top-3 text-slate-500"
              />

              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-green-500"
              />

            </div>

          </div>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#111318]">

            {filteredMessages.length === 0 ? (

              <div className="flex flex-col items-center justify-center h-full text-slate-500">

                <MessageCircle
                  size={50}
                  className="opacity-30 mb-3"
                />

                <p>

                  No Messages Found

                </p>

              </div>

            ) : (

              filteredMessages.map((msg, index) => (

                <div
                  key={index}
                  className={`flex ${
                    msg.from_me
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl shadow

                    ${
                      msg.from_me
                        ? "bg-green-700 rounded-br-md"
                        : "bg-slate-800 rounded-bl-md"
                    }`}
                  >

                    <p className="text-white whitespace-pre-wrap break-words">

                      {msg.text || "(No Text)"}

                    </p>

                    <div className="flex justify-between mt-2 text-[10px] text-slate-300 gap-4">

                      <span>

                        Chat #{msg.chat_id}

                      </span>

                      <span>

                        {msg.timestamp}

                      </span>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}