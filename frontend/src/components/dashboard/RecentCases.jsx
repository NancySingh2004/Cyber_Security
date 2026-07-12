const cases = [
  {
    id: "CASE-001",
    device: "Samsung A52",
    status: "Completed",
    examiner: "Nancy",
  },
  {
    id: "CASE-002",
    device: "OnePlus 11",
    status: "Analyzing",
    examiner: "Nancy",
  },
  {
    id: "CASE-003",
    device: "Redmi Note 12",
    status: "Pending",
    examiner: "Nancy",
  },
];

export default function RecentCases() {
  return (
    <div className="bg-slate-900 rounded-xl p-6 mt-8">

      <h2 className="text-xl font-semibold mb-5">
        Recent Investigations
      </h2>

      <table className="w-full">

        <thead>

          <tr className="text-left text-slate-400">

            <th>Case ID</th>
            <th>Device</th>
            <th>Status</th>
            <th>Examiner</th>

          </tr>

        </thead>

        <tbody>

          {cases.map((item) => (

            <tr
              key={item.id}
              className="border-t border-slate-800 h-14"
            >

              <td>{item.id}</td>

              <td>{item.device}</td>

              <td>{item.status}</td>

              <td>{item.examiner}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}