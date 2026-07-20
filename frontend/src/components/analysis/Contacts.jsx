import { User } from "lucide-react";

export default function Contacts({ contacts }) {

    return (

        <div className="grid md:grid-cols-2 gap-4">

            {contacts.map((contact,index)=>(

                <div
                    key={index}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-5"
                >

                    <div className="flex items-center gap-4">

                        <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">

                            <User className="text-cyan-400"/>

                        </div>

                        <div>

                            <h3 className="text-white font-semibold">
                                {contact.name}
                            </h3>

                            <p className="text-slate-400 text-sm">
                                {contact.phone}
                            </p>

                            <p className="text-xs text-cyan-400 mt-1">
                                {contact.status}
                            </p>

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

}