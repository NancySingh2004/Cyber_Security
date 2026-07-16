import { Image, Database, FileText, Smartphone, HardDrive } from "lucide-react";

export default function EvidenceExplorer({ evidence, selected, setSelected }) {
  const getIcon = (file) => {
    const iconProps = { size: 16, className: "text-slate-400 group-hover:text-cyan-400" };
    if (file.filetype?.startsWith("image")) return <Image {...iconProps} />;
    if (file.filename.endsWith(".db") || file.filename.endsWith(".sqlite")) return <Database {...iconProps} />;
    if (file.filename.endsWith(".apk")) return <Smartphone {...iconProps} />;
    return <FileText {...iconProps} />;
  };

  return (
    <div className="bg-[#0f1117] border border-slate-800/60 rounded-xl flex flex-col h-full overflow-hidden">
      {/* Registry Header */}
      <div className="p-4 border-b border-slate-800/60 flex justify-between items-center bg-[#0a0c10]">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <HardDrive size={12} /> Registry
        </h2>
        <span className="text-[10px] font-bold text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded">
          {evidence.length} ITEMS
        </span>
      </div>

      {/* Evidence List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {evidence.map((item) => {
          const isSelected = selected?.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                isSelected
                  ? "bg-cyan-600/10 border-cyan-500/30"
                  : "bg-transparent border-transparent hover:bg-slate-800/50 hover:border-slate-700"
              }`}
            >
              <div className={isSelected ? "text-cyan-400" : ""}>
                {getIcon(item)}
              </div>
              <div className="overflow-hidden">
                <p className={`text-xs font-medium truncate ${isSelected ? "text-white" : "text-slate-300"}`}>
                  {item.filename}
                </p>
                <p className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">
                  {item.filetype}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}