import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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


      const caseSummary =
        await getCaseSummary(caseId);


      const evidenceList =
        await getEvidenceByCase(caseId);


      setSummary(caseSummary);

      setEvidence(evidenceList);


      if (evidenceList.length > 0) {

        setSelectedEvidence(
          evidenceList[0]
        );

      }


    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };


  if (loading) {

    return (

      <MainLayout>

        <div className="text-center py-20 text-xl">
          Loading Investigation...
        </div>

      </MainLayout>

    );

  }


  return (

    <MainLayout>


      {/* Case Header */}

      <CaseHeader
        data={summary.case}
      />


      {/* Action Buttons */}

      <div className="flex gap-4 mt-6">

        <button
          onClick={() =>
            navigate(`/upload/${caseId}`)
          }
          className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-semibold"
        >
          + Import Evidence
        </button>


        <button
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
        >
          Analyze Case
        </button>


        <button
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
        >
          Generate Report
        </button>


      </div>



      {/* Summary */}

      <WorkspaceStats
        summary={summary.summary}
      />



      {/* Evidence Workspace */}

      <div className="grid grid-cols-12 gap-6 mt-8">


        <div className="col-span-4">

          <EvidenceExplorer
            evidence={evidence}
            selected={selectedEvidence}
            setSelected={setSelectedEvidence}
          />

        </div>



        <div className="col-span-8">

          <EvidenceDetails
            evidence={selectedEvidence}
          />

        </div>


      </div>


    </MainLayout>

  );

}