export default function WhatsAppMessages({ whatsapp }) {

    if (!whatsapp?.messages?.length)
        return null;

    return (

        <div className="bg-[#0a0c10] border border-slate-800 rounded-xl p-5">

            <h3 className="text-green-400 text-sm font-bold uppercase tracking-wider mb-5">
                Conversation Timeline
            </h3>

            <div className="space-y-4 max-h-[500px] overflow-y-auto">

                {whatsapp.messages.map((msg, index) => (

                    <div
                        key={index}
                        className={`flex ${
                            msg.from_me
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >

                        <div
                            className={`max-w-[75%] rounded-xl px-4 py-3 ${
                                msg.from_me
                                    ? "bg-green-700"
                                    : "bg-slate-800"
                            }`}
                        >

                            <p className="text-white whitespace-pre-wrap">

                                {msg.text || "(No Text)"}

                            </p>

                            <div className="text-[10px] text-slate-300 mt-2 flex justify-between gap-4">

                                <span>

                                    Chat #{msg.chat_id}

                                </span>

                                <span>

                                    {msg.timestamp}

                                </span>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}