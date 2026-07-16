import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-200 flex font-sans">
      {/* Sidebar - Fixed width for consistent alignment */}
      <div className="w-64 border-r border-slate-800/60 bg-[#0f1117]">
        <Sidebar />
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        {/* Content Wrapper */}
        <main className="flex-1 overflow-y-auto p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/20 via-[#0a0c10] to-[#0a0c10]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        {/* Optional footer if needed, keeping it minimal for forensic UI */}
        <footer className="py-4 px-8 border-t border-slate-800/40 text-[10px] text-slate-600 uppercase tracking-widest text-center">
          Forensic Analysis System v2.4.0 • Internal Use Only
        </footer>
      </div>
    </div>
  );
}