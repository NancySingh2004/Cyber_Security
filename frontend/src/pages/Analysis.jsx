import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { getEvidence, analyzeEvidence } from "../services/evidenceService";

export default function Analysis() {
  const [evidenceList, setEvidenceList] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadEvidence(); }, []);

  const loadEvidence = async () => {
    try {
      const data = await getEvidence();
      setEvidenceList(data);
    } catch (error) { console.error(error); }
  };

  const handleAnalyze = async () => {
    if (!selectedEvidence) return;
    setLoading(true);
    setAnalysis(null);
    try {
      const result = await analyzeEvidence(selectedEvidence);
      setAnalysis(result);
    } catch (error) {
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-white">Forensic Analysis</h1>
          <p className="text-slate-400">Deep packet and file structure examination</p>
        </header>
        {/* Control Panel */}
<div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
  <label className="block text-sm font-medium text-slate-400 mb-3">
    Target Evidence
  </label>
  
  {/* Min-w-0 yahan zaroori hai taaki flex container breakdown na ho */}
  <div className="flex gap-4 min-w-0">
    <select
      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none w-full truncate"
      value={selectedEvidence}
      onChange={(e) => setSelectedEvidence(e.target.value)}
    >
      <option value="">Select a file to initiate...</option>
      {evidenceList.map((item) => (
        <option key={item.id} value={item.id}>{item.filename}</option>
      ))}
    </select>
    
    {/* button ko flex-shrink-0 de diya hai taaki ye chhota na ho */}
    <button
      onClick={handleAnalyze}
      disabled={loading || !selectedEvidence}
      className="flex-shrink-0 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 px-8 py-3 rounded-lg font-bold text-white transition-all"
    >
      {loading ? "PROCESSING..." : "RUN ANALYSIS"}
    </button>
  </div>
</div>
        {/* Loading Skeleton */}
        {loading && (
          <div className="mt-8 animate-pulse space-y-4">
            <div className="h-40 bg-slate-900 rounded-xl"></div>
          </div>
        )}

        
        {/* Results Dashboard */}
{analysis && (
  <div className="mt-8 bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
    {/* Report Header */}
    <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-white tracking-wide">DETECTION REPORT</h2>
        <p className="text-slate-500 text-xs mt-1 font-mono">{analysis.file_name}</p>
      </div>
      <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase rounded">
        {analysis.file_type}
      </span>
    </div>

    {/* Report Data Grid */}
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(analysis.analysis || {}).map(([key, value]) => (
        <div 
          key={key} 
          className="bg-slate-950/50 border border-slate-800 p-4 rounded-lg hover:border-slate-700 transition-colors"
        >
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
            {key.replaceAll("_", " ")}
          </p>
          <p className="text-slate-300 font-mono text-sm truncate">
            {String(value)}
          </p>
        </div>
      ))}
    </div>
  </div>
)}
      </div>
    </MainLayout>
  );
}