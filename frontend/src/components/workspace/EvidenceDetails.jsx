import { Search, FileText, Hash, ShieldCheck, Activity } from "lucide-react";
import { analyzeEvidence } from "../../services/evidenceService";
import { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

export default function EvidenceDetails({ evidence }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!evidence) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 border border-slate-800 border-dashed rounded-xl bg-[#0f1117]">
        <FileText size={48} className="mb-4 opacity-20" />
        <p className="text-sm uppercase tracking-widest">Select an evidence node to inspect</p>
      </div>
    );
  }

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzeEvidence(evidence.id);
      setAnalysis(result);
    } catch (err) {
      alert("Analysis engine failed to respond.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-full overflow-y-auto bg-[#0f1117] rounded-xl border border-slate-800/60">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Asset Inspection</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Ref: {evidence.filename}</p>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
        >
          {loading ? <Activity className="animate-spin" size={14} /> : <Search size={14} />}
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {/* Preview Section */}
      <div className="mb-8 border border-slate-800 bg-[#0a0c10] rounded-lg p-4 flex justify-center">
        {evidence.filetype?.startsWith("image") ? (
          <img src={`${API_URL}/${evidence.filepath.replace(/\\/g, "/")}`} className="max-h-64 object-contain rounded" alt="preview" />
        ) : (
          <div className="h-48 flex flex-col items-center justify-center text-slate-600">
            <FileText size={40} className="mb-2" />
            <span className="text-[10px] uppercase">Preview Unavailable</span>
          </div>
        )}
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { label: "Format", value: evidence.filetype },
          { label: "File Size", value: `${(Number(evidence.filesize) / 1024).toFixed(2)} KB` },
          { label: "Status", value: evidence.status, highlight: true },
        ].map((item) => (
          <div key={item.label} className="bg-[#0a0c10] border border-slate-800 p-3 rounded-lg">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
            <p className={`text-sm font-medium ${item.highlight ? "text-emerald-500" : "text-slate-300"}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Hash Section */}
      <div className="mb-8">
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
          <Hash size={12} /> SHA-256 Hash
        </p>
        <div className="bg-[#0a0c10] border border-slate-800 rounded p-3 font-mono text-[10px] text-cyan-400 break-all">
          {evidence.sha256}
        </div>
      </div>

      {/* Analysis Report Output */}
      {analysis && (
        <div className="border-t border-slate-800 pt-8">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck size={14} className="text-cyan-500" /> Forensic Output
          </h3>
          <pre className="bg-black border border-slate-800 rounded-lg p-4 overflow-auto text-emerald-500 font-mono text-[11px] leading-relaxed">
            {JSON.stringify(analysis.analysis, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}