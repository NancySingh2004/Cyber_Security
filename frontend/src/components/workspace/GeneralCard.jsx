import { HardDrive, Calendar, Hash } from "lucide-react";

export default function GeneralCard({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="bg-[#0a0c10] border border-slate-800 rounded-xl p-5">

      <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-5">
        General Information
      </h3>

      <div className="space-y-4">

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-400">
            <HardDrive size={16} />
            <span>File Size</span>
          </div>

          <span className="text-white">
            {analysis.file_size_kb} KB
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar size={16} />
            <span>Created</span>
          </div>

          <span className="text-white text-sm">
            {new Date(
              analysis.created_time * 1000
            ).toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar size={16} />
            <span>Modified</span>
          </div>

          <span className="text-white text-sm">
            {new Date(
              analysis.modified_time * 1000
            ).toLocaleString()}
          </span>
        </div>

      </div>

      <div className="mt-6">

        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <Hash size={16} />
          <span>SHA-256</span>
        </div>

        <div className="bg-black rounded-lg p-3 font-mono text-[11px] break-all text-cyan-400">
          {analysis.sha256}
        </div>

      </div>

    </div>
  );
}