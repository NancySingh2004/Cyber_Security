import { ShieldAlert, User, Activity, Calendar, Flag } from "lucide-react";

export default function CaseHeader({ data }) {
  // Determine status styles dynamically
  const statusStyles = data.status === "Active" 
    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
    : "bg-slate-800 text-slate-400 border-slate-700";

  return (
    <div className="bg-[#0f1117] border border-slate-800/60 rounded-xl p-8 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Left Side: Core Identity */}
        <div className="flex items-start gap-4">
          <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
            <ShieldAlert className="text-cyan-400" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">
              {data.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 mt-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-slate-600" /> {data.investigator}
              </span>
              <span className="flex items-center gap-1.5">
                <Activity size={14} className="text-slate-600" /> {data.case_type}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Status & Meta */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
              data.priority === "High" 
                ? "bg-red-500/10 text-red-500 border-red-500/20" 
                : "bg-amber-500/10 text-amber-500 border-amber-500/20"
            }`}>
              {data.priority} Priority
            </span>
            <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${statusStyles}`}>
              {data.status || "Active"}
            </span>
          </div>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest text-right">
            Case Reference ID: <span className="text-slate-400 font-mono">#{data.id}</span>
          </p>
        </div>
      </div>
    </div>
  );
}