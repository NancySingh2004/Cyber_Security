export default function CaseHeader({ data }) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400">
            {data.title}
          </h1>

          <p className="text-slate-400 mt-2">
            Investigator: {data.investigator}
          </p>
        </div>

        <div className="text-right">
          <p className="text-slate-400">
            Priority
          </p>

          <p className="font-semibold">
            {data.priority}
          </p>

          <p className="text-slate-400 mt-4">
            Status
          </p>

          <span className="bg-green-600/20 text-green-400 px-4 py-1 rounded-full">
            {data.status}
          </span>
        </div>
      </div>
    </div>
  );
}