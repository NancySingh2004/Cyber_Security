import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FolderOpen } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import CaseHeader from "../components/workspace/CaseHeader";
import WorkspaceStats from "../components/workspace/WorkspaceStats";
import EvidenceExplorer from "../components/workspace/EvidenceExplorer";
import EvidenceDetails from "../components/workspace/EvidenceDetails";

import { getEvidenceByCase } from "../services/evidenceService";
import { getCaseSummary } from "../services/caseService";

export default function CaseWorkspace() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [evidence, setEvidence] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkspace();
  }, [caseId]);

  const loadWorkspace = async () => {
    try {
      setLoading(true);
      const caseSummary = await getCaseSummary(caseId);
      const evidenceList = await getEvidenceByCase(caseId);
      
      setSummary(caseSummary);
      setEvidence(evidenceList);
      if (evidenceList.length > 0) setSelectedEvidence(evidenceList[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[60vh] text-slate-500 font-mono text-sm tracking-widest animate-pulse">
          INITIALIZING WORKSPACE...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Top Header Section */}
      <CaseHeader data={summary.case} />

      {/* Professional Action Bar */}
      <div className="flex items-center gap-3 mt-8 pb-8 border-b border-slate-800/60">
        <button
          onClick={() => navigate(`/upload/${caseId}`)}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-cyan-900/20"
        >
          Import Evidence
        </button>
        <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all">
          Analyze Case
        </button>
        <div className="ml-auto">
          <button className="border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="mt-8">
        <WorkspaceStats summary={summary.summary} />
      </div>

      {/* Grid Layout (Fixed Height for Desktop feel) */}
      <div className="grid grid-cols-12 gap-6 mt-8 h-[calc(100vh-400px)] min-h-[500px]">
        {/* Left Sidebar: Evidence Registry */}
        <div className="col-span-12 lg:col-span-4 h-full flex flex-col">
          <EvidenceExplorer
            evidence={evidence}
            selected={selectedEvidence}
            setSelected={setSelectedEvidence}
          />
        </div>

        {/* Right Panel: Data Inspection */}
        <div className="col-span-12 lg:col-span-8 h-full bg-[#0f1117] border border-slate-800/60 rounded-xl overflow-hidden flex flex-col">
          {selectedEvidence ? (
            <EvidenceDetails evidence={selectedEvidence} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 p-8 text-center">
              <FolderOpen size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">No Evidence Selected</p>
              <p className="text-[10px] uppercase tracking-widest mt-1">Select an item from the registry to view details</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}