import { MessageCircle, Users, MessagesSquare } from "lucide-react";

export default function WhatsAppCard({ whatsapp }) {

    if (!whatsapp) return null;

    return (

        <div className="bg-[#0a0c10] border border-slate-800 rounded-xl p-5">

            <div className="flex items-center gap-2 mb-6">

                <MessageCircle
                    size={18}
                    className="text-green-400"
                />

                <h3 className="text-sm font-bold uppercase tracking-wider text-green-400">
                    WhatsApp Analysis
                </h3>

            </div>


            {/* Statistics */}

            <div className="grid grid-cols-3 gap-4 mb-6">

                <div className="bg-slate-900 rounded-lg p-4">

                    <Users
                        className="text-cyan-400 mb-2"
                        size={18}
                    />

                    <p className="text-[10px] uppercase text-slate-500">
                        Chats
                    </p>

                    <p className="text-xl font-bold text-white mt-1">
                        {whatsapp.total_chats}
                    </p>

                </div>


                <div className="bg-slate-900 rounded-lg p-4">

                    <Users
                        className="text-green-400 mb-2"
                        size={18}
                    />

                    <p className="text-[10px] uppercase text-slate-500">
                        Contacts
                    </p>

                    <p className="text-xl font-bold text-white mt-1">
                        {whatsapp.total_contacts}
                    </p>

                </div>


                <div className="bg-slate-900 rounded-lg p-4">

                    <MessagesSquare
                        className="text-yellow-400 mb-2"
                        size={18}
                    />

                    <p className="text-[10px] uppercase text-slate-500">
                        Messages
                    </p>

                    <p className="text-xl font-bold text-white mt-1">
                        {whatsapp.total_messages}
                    </p>

                </div>

            </div>


            {/* Chat List */}

            <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-3">
                Chat List
            </h4>

            <div className="space-y-2">

                {whatsapp.chat_list?.map((chat) => (

                    <div
                        key={chat.chat_id}
                        className="flex justify-between items-center bg-slate-900 rounded-lg px-4 py-3"
                    >

                        <span className="text-white break-all">

                            {chat.jid}

                        </span>

                        <span className="text-cyan-400 text-sm">

                            #{chat.chat_id}

                        </span>

                    </div>

                ))}

            </div>

        </div>

    );

}