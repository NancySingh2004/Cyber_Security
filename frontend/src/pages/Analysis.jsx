import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  getEvidence,
  analyzeEvidence,
} from "../services/evidenceService";

export default function Analysis() {
  const [evidenceList, setEvidenceList] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEvidence();
  }, []);

  const loadEvidence = async () => {
    try {
      const data = await getEvidence();
      setEvidenceList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedEvidence) {
      alert("Please select evidence.");
      return;
    }

    try {
      setLoading(true);

      const result = await analyzeEvidence(
        selectedEvidence
      );

      setAnalysis(result);
    } catch (error) {
      console.error(error);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-8">
        Evidence Analysis
      </h1>

      {/* Select Evidence */}

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

        <label className="block mb-3 font-semibold">
          Select Evidence
        </label>

        <select
          className="w-full bg-slate-800 rounded-lg p-3"
          value={selectedEvidence}
          onChange={(e) =>
            setSelectedEvidence(e.target.value)
          }
        >
          <option value="">
            Select Evidence
          </option>

          {evidenceList.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.filename}
            </option>
          ))}

        </select>

        <button
          onClick={handleAnalyze}
          className="mt-5 bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg"
        >
          Analyze Evidence
        </button>

      </div>

      {/* Loading */}

      {loading && (

        <div className="mt-8 bg-slate-900 rounded-xl p-6">
          Analyzing Evidence...
        </div>

      )}

      {/* Analysis Result */}

      {analysis && (

        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">

          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            Analysis Result
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <p>
              <span className="text-slate-400">
                File Name:
              </span>{" "}
              {analysis.file_name}
            </p>

            <p>
              <span className="text-slate-400">
                File Type:
              </span>{" "}
              {analysis.file_type}
            </p>

          </div>

          {analysis.analysis && (

            <div className="mt-6 space-y-3">

              {Object.entries(
                analysis.analysis
              ).map(([key, value]) => (

                <p key={key}>

                  <span className="text-slate-400 capitalize">
                    {key.replaceAll("_", " ")}:
                  </span>{" "}

                  <span className="text-cyan-400">
                    {String(value)}
                  </span>

                </p>

              ))}

            </div>

          )}

        </div>

      )}

    </MainLayout>
  );
}