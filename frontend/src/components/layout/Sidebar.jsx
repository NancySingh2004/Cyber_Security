import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Search,
  FileText,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-5">
      <h1 className="text-2xl font-bold text-cyan-400 mb-10">
        ForensiQ
      </h1>

      <nav className="space-y-3">
        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/upload"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <Upload size={20} />
          Upload
        </Link>

        <Link
          to="/analysis"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <Search size={20} />
          Analysis
        </Link>

        <Link
          to="/reports"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FileText size={20} />
          Reports
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <Settings size={20} />
          Settings
        </Link>
      </nav>
    </aside>
  );
}