export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 transition hover:border-cyan-500">
      <div className="flex justify-between items-center">

        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`p-4 rounded-xl ${color}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}