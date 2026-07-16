import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShieldCheck, HardDrive, UploadCloud } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import UploadZone from "../components/evidence/UploadZone";
import EvidenceTable from "../components/evidence/EvidenceTable";

import { uploadEvidence, getEvidence, getEvidenceByCase } from "../services/evidenceService";
import { getCases, getCaseById } from "../services/caseService";

export default function Upload() {
  const { caseId } = useParams();
  const [files, setFiles] = useState([]);
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(caseId || "");
  const [caseData, setCaseData] = useState(null);

  useEffect(() => {
    loadCases();
    if (caseId) {
      loadCaseDetails();
      setSelectedCase(caseId);
    }
    loadEvidence();
  }, [caseId]);

  const loadCases = async () => {
    try {
      const data = await getCases();
      setCases(data);
    } catch (error) { console.error(error); }
  };

  const loadCaseDetails = async () => {
    try {
      const data = await getCaseById(caseId);
      setCaseData(data);
    } catch (error) { console.error("Error loading case:", error); }
  };

  const loadEvidence = async () => {
    try {
      const data = caseId ? await getEvidenceByCase(caseId) : await getEvidence();
      const formatted = data.map((item) => ({
        id: item.id,
        name: item.filename,
        size: (Number(item.filesize) / 1024).toFixed(2) + " KB",
        type: item.filetype,
        status: item.status,
        hash: item.sha256,
        path: item.filepath,
        caseId: item.case_id,
      }));
      setFiles(formatted);
    } catch (error) { console.error("Error loading evidence:", error); }
  };

  const handleFiles = async (selectedFiles) => {
    if (!selectedCase) { alert("Please select a case first."); return; }
    try {
      await Promise.all(selectedFiles.map(file => uploadEvidence(file, selectedCase)));
      await loadEvidence();
    } catch (error) { alert("Upload failed."); }
  };

  return (
    <MainLayout>
      {/* Header Panel */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
          <UploadCloud className="text-cyan-500" /> Evidence Ingestion
        </h1>
        {caseData && (
          <div className="mt-4 bg-[#0f1117] border border-slate-800 rounded-xl p-6 flex items-center gap-6">
            <ShieldCheck size={32} className="text-emerald-500" />
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Investigation</p>
              <h2 className="text-lg font-bold text-white">{caseData.title}</h2>
            </div>
          </div>
        )}
      </div>

      {/* Upload Zone */}
      <UploadZone
        cases={cases}
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
        onSelectFiles={handleFiles}
      />

      {/* Evidence Registry */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <HardDrive size={14} /> Evidence Registry
          </h2>
          <span className="bg-slate-800 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">
            {files.length} ITEMS REGISTERED
          </span>
        </div>

        {files.length === 0 ? (
          <div className="text-center py-20 border border-slate-800 border-dashed rounded-xl text-slate-600">
            <p className="text-sm font-medium">No forensic assets uploaded.</p>
          </div>
        ) : (
          <EvidenceTable files={files} />
        )}
      </div>
    </MainLayout>
  );
}