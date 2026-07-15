export default function WorkspaceStats({ summary }) {
  const cards = [
    {
      title: "Evidence",
      value: summary.total_evidence,
    },
    {
      title: "Images",
      value: summary.images,
    },
    {
      title: "APK",
      value: summary.apk,
    },
    {
      title: "Databases",
      value: summary.databases,
    },
    {
      title: "Documents",
      value: summary.documents,
    },
    {
      title: "Pending",
      value: summary.pending_analysis,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mt-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-900 border border-slate-800 rounded-xl p-5"
        >
          <p className="text-slate-400 text-sm">
            {card.title}
          </p>

          <h2 className="text-3xl font-bold text-cyan-400 mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}