import MainLayout from "../components/layout/MainLayout";
import { Construction } from "lucide-react";

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-[70vh] text-slate-500">
        <Construction size={64} className="text-amber-500 mb-6" />
        <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Dashboard</h1>
        <p className="text-xs uppercase tracking-widest mt-2">Currently Under Development</p>
      </div>
    </MainLayout>
  );
}