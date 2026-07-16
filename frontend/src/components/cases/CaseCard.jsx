import { useNavigate } from "react-router-dom";
import { Folder, AlertCircle, Trash2, ArrowRight } from "lucide-react";

export default function CaseCard({ item }) {
  const navigate = useNavigate();

  // Helper to determine status color
  const statusColors = {
    Open: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Closed: "text-slate-400 bg-slate-800 border-slate-700",
    Pending: "text-amber-400 bg-amber-500/10 border-amber-500/20"
  };

  return (
    <div className="bg-[#0f1117] border border-slate-800/60 rounded-xl p-6 hover:border-slate-700 transition-all group shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
            <Folder size={20} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-none mb-1">
              {item.title}
            </h3>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              ID: {item.id}
            </span>
          </div>
        </div>

        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${statusColors[item.status] || statusColors.Open}`}>
          {item.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs mb-6">
        {[
          { label: "INVESTIGATOR", value: item.investigator },
          { label: "CASE TYPE", value: item.case_type },
          { label: "PRIORITY", value: item.priority },
          { label: "LAST ACCESS", value: "15-07-2026" } // Simulated data
        ].map((field) => (
          <div key={field.label}>
            <p className="text-slate-600 font-bold uppercase tracking-widest text-[9px] mb-0.5">
              {field.label}
            </p>
            <p className="text-slate-300 font-medium">{field.value}</p>
          </div>
        ))}
      </div>

      {item.description && (
        <div className="bg-[#0a0c10] p-4 rounded-lg border border-slate-800/50 mb-6">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Description</p>
          <p className="text-slate-400 text-xs line-clamp-2">{item.description}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/cases/${item.id}`)}
          className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 py-2.5 rounded-lg text-xs font-bold text-white transition-all shadow-lg shadow-cyan-900/20"
        >
          OPEN RECORD <ArrowRight size={14} />
        </button>
        
        <button className="px-3 bg-[#0a0c10] hover:bg-red-900/20 border border-slate-800 text-slate-500 hover:text-red-400 rounded-lg transition-all">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}