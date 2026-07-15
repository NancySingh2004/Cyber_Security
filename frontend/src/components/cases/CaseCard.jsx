import { useNavigate } from "react-router-dom";

export default function CaseCard({ item }) {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

      <div className="flex justify-between items-center">

        <div>
          <h3 className="text-xl font-semibold text-cyan-400">
            {item.title}
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            Case #{item.id}
          </p>
        </div>

        <span className="bg-green-600/20 text-green-400 px-4 py-1 rounded-full">
          {item.status}
        </span>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-sm">

        <p>
          <span className="text-slate-400">
            Investigator:
          </span>{" "}
          {item.investigator}
        </p>

        <p>
          <span className="text-slate-400">
            Case Type:
          </span>{" "}
          {item.case_type}
        </p>

        <p>
          <span className="text-slate-400">
            Priority:
          </span>{" "}
          {item.priority}
        </p>

        <p>
          <span className="text-slate-400">
            Status:
          </span>{" "}
          {item.status}
        </p>

      </div>

      {item.description && (
        <div className="mt-5">
          <p className="text-slate-400 font-medium">
            Description
          </p>

          <p className="mt-2 text-slate-300">
            {item.description}
          </p>
        </div>
      )}

      <div className="mt-6 flex gap-3">

        <button
          onClick={() => navigate(`/cases/${item.id}`)}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-lg transition"
        >
          Open Investigation
        </button>

        <button
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition"
        >
          Delete
        </button>

      </div>

    </div>
  );
}