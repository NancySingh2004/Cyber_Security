import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import UploadZone from "../components/evidence/UploadZone";
import EvidenceTable from "../components/evidence/EvidenceTable";

import {
  uploadEvidence,
  getEvidence,
  getEvidenceByCase,
} from "../services/evidenceService";

import {
  getCases,
  getCaseById,
} from "../services/caseService";

export default function Upload() {

  const { caseId } = useParams();

  const [files, setFiles] = useState([]);

  const [cases, setCases] = useState([]);

  const [selectedCase, setSelectedCase] = useState(
    caseId || ""
  );
  const [caseData, setCaseData] = useState(null);

  // ------------------------
  // Load Cases
  // ------------------------

  const loadCases = async () => {
    try {
      const data = await getCases();
      setCases(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadCaseDetails = async () => {

  if (!caseId) return;

  try {

    const data = await getCaseById(caseId);

    setCaseData(data);

  } catch(error) {

    console.error(
      "Error loading case:",
      error
    );

  }

};
  // ------------------------
  // Load Evidence
  // ------------------------

  const loadEvidence = async () => {
  try {

    let data;

    if (caseId) {
      data = await getEvidenceByCase(caseId);
    } else {
      data = await getEvidence();
    }

    const formatted = data.map((item) => ({
      id: item.id,
      name: item.filename,
      size: (Number(item.filesize) / 1024).toFixed(2) + " KB",
      type: item.filetype,
      modified: "-",
      status: item.status,
      hash: item.sha256,
      path: item.filepath,
      caseId: item.case_id,
    }));

    setFiles(formatted);

  } catch (error) {
    console.error("Error loading evidence:", error);
  }
};
  // ------------------------
  // Initial Load
  // ------------------------

  useEffect(() => {

  loadCases();

  loadCaseDetails();

  if (caseId) {
    setSelectedCase(caseId);
  }

  loadEvidence();

}, [caseId]);

  // ------------------------
  // Upload Files
  // ------------------------

  const handleFiles = async (selectedFiles) => {

    if (!selectedCase) {
      alert("Please select a case first.");
      return;
    }

    try {

      await Promise.all(

        selectedFiles.map(async (file) => {

          await uploadEvidence(
            file,
            selectedCase
          );

        })

      );

      await loadEvidence();

    } catch (error) {

      console.error(error);

      alert("Upload failed.");

    }

  };

  return (

    <MainLayout>
      {caseData && (

<div className="bg-slate-900 border border-cyan-500 rounded-xl p-5 mb-8">

  <h2 className="text-2xl font-bold text-cyan-400">
    Import Evidence
  </h2>

  <p className="mt-3 text-white">
    Case: {caseData.title}
  </p>

  <p className="text-slate-400">
    Investigator: {caseData.investigator}
  </p>

  <p className="text-slate-400">
    Priority: {caseData.priority}
  </p>

</div>

)}
      <h1 className="text-3xl font-bold mb-8">
        Evidence Upload
      </h1>

      <UploadZone
        cases={cases}
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
        onSelectFiles={handleFiles}
      />

      <div className="mt-8">

        <h2 className="text-xl font-semibold mb-4">
          Evidence Details
        </h2>

        {files.length === 0 ? (

          <p className="text-slate-400">
            No evidence uploaded yet.
          </p>

        ) : (

          <div className="space-y-4">

            {files.map((file) => (

              <div
                key={file.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5"
              >

                <h3 className="text-lg font-semibold">
                  {file.name}
                </h3>

                <div className="grid grid-cols-2 gap-4 mt-3 text-sm text-slate-400">

                  <p>
                    Size:
                    <span className="ml-2 text-white">
                      {file.size}
                    </span>
                  </p>

                  <p>
                    Type:
                    <span className="ml-2 text-white">
                      {file.type}
                    </span>
                  </p>

                  <p>
                    Status:
                    <span className="ml-2 text-green-400">
                      {file.status}
                    </span>
                  </p>

                  <p>
                    Case ID:
                    <span className="ml-2 text-cyan-400">
                      {file.caseId}
                    </span>
                  </p>

                  <p className="col-span-2 break-all">
                    SHA-256:
                    <span className="ml-2 text-cyan-400 break-all">
                      {file.hash}
                    </span>
                  </p>

                  <p className="col-span-2 break-all">
                    Backend Path:
                    <span className="ml-2 text-yellow-400 break-all">
                      {file.path}
                    </span>
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <EvidenceTable
        files={files}
      />

    </MainLayout>

  );
}