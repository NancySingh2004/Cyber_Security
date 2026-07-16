import { Database } from "lucide-react";

export default function SQLiteCard({ database }) {

    if (!database) return null;

    return (

        <div className="bg-[#0a0c10] border border-slate-800 rounded-xl p-5">

            <div className="flex items-center gap-2 mb-5">

                <Database
                    size={18}
                    className="text-cyan-400"
                />

                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                    SQLite Database
                </h3>

            </div>


            <div className="grid grid-cols-2 gap-4 mb-6">

                <div className="bg-slate-900 rounded-lg p-3">

                    <p className="text-[10px] uppercase text-slate-500">
                        Database
                    </p>

                    <p className="text-white mt-1">
                        {database.database_name}
                    </p>

                </div>


                <div className="bg-slate-900 rounded-lg p-3">

                    <p className="text-[10px] uppercase text-slate-500">
                        SQLite Version
                    </p>

                    <p className="text-white mt-1">
                        {database.sqlite_version}
                    </p>

                </div>


                <div className="bg-slate-900 rounded-lg p-3">

                    <p className="text-[10px] uppercase text-slate-500">
                        Total Tables
                    </p>

                    <p className="text-white mt-1">
                        {database.total_tables}
                    </p>

                </div>

            </div>


            <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-3">
                Tables
            </h4>


            <div className="space-y-2">

                {database.tables?.map((table) => (

                    <div
                        key={table.table_name}
                        className="flex justify-between items-center bg-slate-900 rounded-lg px-4 py-3"
                    >

                        <span className="text-white">

                            {table.table_name}

                        </span>

                        <span className="text-cyan-400">

                            {table.rows} rows

                        </span>

                    </div>

                ))}

            </div>

        </div>

    );

}