export default function EvidenceTable({ files }) {
  return (
    <div className="bg-[#0f1117] border border-slate-800/60 rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-800/60">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Evidence Repository</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#0a0c10] text-slate-500 uppercase tracking-widest text-[9px]">
            <tr>
              <th className="px-6 py-4">File Name</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Size</th>
              <th className="px-6 py-4">SHA-256 Hash</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-800/60">
            {files.map((file, index) => (
              <tr key={file.id || index} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-200">{file.name}</td>
                <td className="px-6 py-4 text-slate-400">{file.type}</td>
                <td className="px-6 py-4 font-mono text-slate-400">{file.size}</td>
                <td className="px-6 py-4 font-mono text-cyan-500/80 truncate max-w-[150px]">
                  {file.hash}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    {file.status || "Verified"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}