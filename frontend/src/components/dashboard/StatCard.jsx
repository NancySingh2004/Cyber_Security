export default function StatCard({ title, value, icon, color }) {
  // Define color mappings for professional intent
  const colors = {
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    red: "text-red-400 bg-red-500/10 border-red-500/20",
  };

  const style = colors[color] || colors.cyan;

  return (
    <div className="bg-[#0f1117] border border-slate-800/60 rounded-xl p-6 transition-all hover:border-slate-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {title}
          </p>
          <h2 className="text-2xl font-bold text-white mt-2">
            {value}
          </h2>
        </div>

        {/* Minimalist Icon Container */}
        <div className={`p-3 rounded-lg border ${style}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}