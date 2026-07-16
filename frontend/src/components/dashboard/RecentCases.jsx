import { useNavigate } from "react-router-dom";
import { FolderOpen } from "lucide-react";

export default function RecentCases() {
  const navigate = useNavigate();
  
  const cases = [
    { id: "CASE-001", device: "Samsung A52", status: "Completed", examiner: "Nancy" },
    { id: "CASE-002", device: "OnePlus 11", status: "Analyzing", examiner: "Nancy" },
    { id: "CASE-003", device: "Redmi Note 12", status: "Pending", examiner: "Nancy" },
  ];

  // Helper for status badge styling
  const getStatusStyles = (status) => {
    switch (status) {
      case "Completed": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Analyzing": return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20";
      default: return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    }
  };

  return (
    <div className="bg-[#0f1117] border border-slate-800/60 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-800/60 flex justify-between items-center">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <FolderOpen size={12} /> Recent Investigations
        </h2>
      </div>

      {/* Table */}
      <table className="w-full text-xs text-left">
        <thead className="bg-[#0a0c10] text-slate-500 uppercase tracking-widest text-[9px]">
          <tr>
            <th className="px-6 py-4">Case ID</th>
            <th className="px-6 py-4">Device</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Examiner</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {cases.map((item) => (
            <tr 
              key={item.id} 
              onClick={() => navigate(`/case/${item.id}`)}
              className="hover:bg-slate-800/30 transition-colors cursor-pointer"
            >
              <td className="px-6 py-4 font-mono text-cyan-400">{item.id}</td>
              <td className="px-6 py-4 font-medium text-slate-200">{item.device}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${getStatusStyles(item.status)}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-400 text-right">{item.examiner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}