import MainLayout from "../components/layout/MainLayout";
import StatCard from "../components/dashboard/StatCard";
import RecentCases from "../components/dashboard/RecentCases";

import {
  FolderOpen,
  ShieldAlert,
  FileText,
  Upload,
} from "lucide-react";

export default function Dashboard() {
  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-8">
        Investigation Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Cases"
          value="18"
          icon={<FolderOpen />}
          color="bg-blue-600"
        />

        <StatCard
          title="Evidence Files"
          value="326"
          icon={<Upload />}
          color="bg-green-600"
        />

        <StatCard
          title="Reports"
          value="14"
          icon={<FileText />}
          color="bg-purple-600"
        />

        <StatCard
          title="Risk Score"
          value="High"
          icon={<ShieldAlert />}
          color="bg-red-600"
        />
        <RecentCases />
      </div>

    </MainLayout>
  );
}