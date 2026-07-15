import { Search } from "lucide-react";
import { analyzeEvidence } from "../../services/evidenceService";
import { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

export default function EvidenceDetails({ evidence }) {

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);


  if (!evidence) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 h-[600px] flex items-center justify-center">

        <p className="text-slate-400 text-lg">
          Select an evidence to inspect.
        </p>

      </div>
    );
  }



  const handleAnalyze = async () => {

    try {

      setLoading(true);


      const result = await analyzeEvidence(
        evidence.id
      );


      // Store complete forensic response
      setAnalysis(result);


    } catch (err) {

      console.error(err);

      alert("Analysis failed");

    } finally {

      setLoading(false);

    }

  };



  const isImage =
    evidence.filetype &&
    evidence.filetype.startsWith("image");



  return (

    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-[600px] overflow-y-auto">


      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Evidence Details
      </h2>



      {/* Preview */}

      <div className="mb-6">

        {isImage ? (

          <img
            src={`${API_URL}/${evidence.filepath.replace(/\\/g, "/")}`}
            alt={evidence.filename}
            className="rounded-lg border border-slate-700 max-h-64 object-contain"
          />

        ) : (

          <div className="h-48 flex items-center justify-center bg-slate-800 rounded-lg">

            <p className="text-slate-500">
              Preview not available
            </p>

          </div>

        )}

      </div>




      {/* Metadata */}

      <div className="space-y-4 text-sm">


        <p>
          <span className="text-slate-400">
            File Name :
          </span>

          <span className="ml-2">
            {evidence.filename}
          </span>

        </p>



        <p>
          <span className="text-slate-400">
            File Type :
          </span>

          <span className="ml-2">
            {evidence.filetype}
          </span>

        </p>



        <p>
          <span className="text-slate-400">
            File Size :
          </span>

          <span className="ml-2">
            {(Number(evidence.filesize) / 1024).toFixed(2)} KB
          </span>

        </p>



        <p>
          <span className="text-slate-400">
            Status :
          </span>

          <span className="ml-2 text-green-400">
            {evidence.status}
          </span>

        </p>


      </div>




      {/* SHA256 */}

      <div className="mt-6">

        <p className="text-slate-400 mb-2">
          SHA-256
        </p>


        <div className="bg-slate-800 rounded-lg p-3 break-all text-cyan-400 text-sm">

          {evidence.sha256}

        </div>


      </div>





      {/* Analyze Button */}

      <button

        onClick={handleAnalyze}

        disabled={loading}

        className="mt-8 flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-lg disabled:opacity-50"

      >

        <Search size={18} />

        {loading
          ? "Analyzing..."
          : "Analyze Evidence"
        }


      </button>





      {/* Analysis Report */}

      {analysis && (

        <div className="mt-8">


          <h3 className="text-xl font-semibold mb-4 text-cyan-400">

            Forensic Analysis Report

          </h3>



          <div className="bg-slate-800 rounded-lg p-4 space-y-4">



            <p>

              <span className="text-slate-400">
                File Name:
              </span>

              <span className="ml-2">
                {analysis.file_name}
              </span>

            </p>




            <p>

              <span className="text-slate-400">
                File Type:
              </span>

              <span className="ml-2">
                {analysis.file_type}
              </span>

            </p>




            <div>

              <p className="text-slate-400 mb-2">
                Metadata:
              </p>


              <pre className="bg-black rounded-lg p-4 overflow-auto text-green-400 text-sm">

                {JSON.stringify(
                  analysis.analysis,
                  null,
                  2
                )}

              </pre>


            </div>



          </div>


        </div>

      )}



    </div>

  );

}