import { UploadCloud, FolderOpen, AlertCircle } from "lucide-react";

export default function UploadZone({ cases, selectedCase, setSelectedCase, onSelectFiles }) {
  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) onSelectFiles(selectedFiles);
  };

  return (
    <div className="relative group bg-[#0f1117] border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-12 transition-all duration-300">
      
      {/* Visual Decoration */}
      <div className="absolute inset-0 bg-cyan-900/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="p-4 bg-[#0a0c10] rounded-full border border-slate-800 mb-6 group-hover:scale-110 transition-transform">
          <UploadCloud size={32} className="text-cyan-500" />
        </div>

        <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-2">
          Evidence Ingestion Port
        </h2>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-8 text-center max-w-sm">
          Drag and drop forensic assets or select to begin. <br />
          Supported: SQLite, APK, Images, ZIP, JSON, CSV
        </p>

        {!selectedCase && (
          <div className="w-full max-w-md mb-6">
            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              Select Investigation Target
            </label>
            <select
              value={selectedCase}
              onChange={(e) => setSelectedCase(e.target.value)}
              className="w-full bg-[#0a0c10] border border-slate-800 text-slate-300 rounded-lg p-3 text-xs focus:ring-1 focus:ring-cyan-500 outline-none"
            >
              <option value="">-- NO TARGET SELECTED --</option>
              {cases.map((item) => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </select>
          </div>
        )}

        <label
          htmlFor="evidence"
          className="cursor-pointer flex items-center gap-2 bg-slate-800 hover:bg-cyan-600 border border-slate-700 hover:border-cyan-500 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-lg"
        >
          <FolderOpen size={14} /> Browse Local Storage
        </label>

        <input
          id="evidence"
          type="file"
          multiple
          hidden
          onChange={handleChange}
        />
      </div>
    </div>
  );
}