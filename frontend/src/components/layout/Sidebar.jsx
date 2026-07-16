import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  Search,
  FileText,
  Settings,
  ShieldCheck,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Investigations", path: "/cases", icon: FolderOpen },
    { name: "AI Analysis", path: "/analysis", icon: Search },
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0f1117] border-r border-slate-800/60 min-h-screen flex flex-col">
      {/* Brand Section */}
      <div className="p-8 flex items-center gap-2">
        <div className="bg-cyan-500/10 p-2 rounded-lg">
          <ShieldCheck className="text-cyan-400" size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">ForensiQ</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-6 border-t border-slate-800/60">
        <div className="bg-[#0a0c10] rounded-lg p-4 border border-slate-800">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Node Status</p>
          <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            SECURE LINK
          </div>
        </div>
      </div>
    </aside>
  );
}