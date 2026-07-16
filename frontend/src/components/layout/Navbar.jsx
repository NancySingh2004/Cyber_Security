export default function Navbar() {
  return (
    <header className="h-16 border-b border-slate-800/60 bg-[#0f1117] flex items-center justify-between px-8">
      {/* Brand & Context */}
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-bold tracking-wider text-white uppercase">
          Mobile Forensics
        </h2>
        <span className="w-px h-4 bg-slate-700"></span>
        <span className="text-xs text-slate-500 font-medium tracking-wide">
          Investigation Dashboard
        </span>
      </div>

      {/* User Status / System Indicator */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">
            System Online
          </span>
        </div>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
          <div className="text-right">
            <p className="text-xs font-medium text-slate-200">Lead Investigator</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Active Session</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400">
            LI
          </div>
        </div>
      </div>
    </header>
  );
}