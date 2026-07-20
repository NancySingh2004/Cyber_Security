import { useMemo, useState } from "react";

export default function BrowserHistory({ history = [] }) {

    const [search, setSearch] = useState("");

    const filteredHistory = useMemo(() => {

        return history.filter((item) => {

            const q = search.toLowerCase();

            return (
                (item.url || "").toLowerCase().includes(q) ||
                (item.title || "").toLowerCase().includes(q)
            );

        });

    }, [history, search]);



    const topSites = useMemo(() => {

        const domains = {};

        filteredHistory.forEach((item) => {

            try {

                const hostname = new URL(item.url).hostname;

                domains[hostname] = (domains[hostname] || 0) + item.visit_count;

            }

            catch {

            }

        });

        return Object.entries(domains)

            .sort((a, b) => b[1] - a[1])

            .slice(0, 10);

    }, [filteredHistory]);



    return (

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

            <div className="flex justify-between items-center mb-5">

                <div>

                    <h2 className="text-2xl font-bold text-white">
                        Browser History
                    </h2>

                    <p className="text-slate-400 mt-1">
                        {filteredHistory.length} Websites Found
                    </p>

                </div>

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
                        bg-slate-950
                        border
                        border-slate-700
                        rounded-lg
                        px-4
                        py-2
                        text-white
                        w-72
                    "
                />

            </div>


            {/* Top Sites */}

            {
                topSites.length > 0 && (

                    <div className="mb-6">

                        <h3 className="text-white font-semibold mb-3">
                            Top Visited Domains
                        </h3>

                        <div className="grid md:grid-cols-5 gap-3">

                            {
                                topSites.map(([domain, visits], index) => (

                                    <div
                                        key={index}
                                        className="bg-slate-950 rounded-lg p-4 border border-slate-800"
                                    >

                                        <p className="text-cyan-400 text-sm truncate">
                                            {domain}
                                        </p>

                                        <p className="text-white text-xl font-bold mt-2">
                                            {visits}
                                        </p>

                                        <p className="text-slate-500 text-xs">
                                            Visits
                                        </p>

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                )
            }


            {/* History Table */}

            <div className="overflow-auto rounded-lg border border-slate-800">

                <table className="w-full">

                    <thead className="bg-slate-950">

                        <tr>

                            <th className="p-4 text-left text-slate-400">
                                URL
                            </th>

                            <th className="p-4 text-left text-slate-400">
                                Title
                            </th>

                            <th className="p-4 text-left text-slate-400">
                                Visits
                            </th>

                            <th className="p-4 text-left text-slate-400">
                                Visit Time
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            filteredHistory.map((item, index) => (

                                <tr
                                    key={index}
                                    className="
                                        border-t
                                        border-slate-800
                                        hover:bg-slate-800
                                    "
                                >

                                    <td className="p-4">

                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="
                                                text-cyan-400
                                                hover:underline
                                                break-all
                                            "
                                        >
                                            {item.url}
                                        </a>

                                    </td>

                                    <td className="p-4 text-white">

                                        {item.title}

                                    </td>

                                    <td className="p-4 text-slate-300">

                                        {item.visit_count}

                                    </td>

                                    <td className="p-4 text-slate-400">

                                        {item.visit_time}

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}