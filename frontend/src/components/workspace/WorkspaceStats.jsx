export default function WorkspaceStats({ summary }) {
  const cards = [
    { title: "Total Evidence", value: summary.total_evidence },
    { title: "Images", value: summary.images },
    { title: "APK Files", value: summary.apk },
    { title: "Databases", value: summary.databases },
    { title: "Documents", value: summary.documents },
    { title: "Pending", value: summary.pending_analysis, highlight: true },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`relative overflow-hidden bg-[#0f1117] border rounded-xl p-5 transition-all hover:border-slate-700 ${
            card.highlight 
              ? "border-amber-500/30 bg-amber-500/5" 
              : "border-slate-800/60"
          }`}
        >
          {/* Decorative background glow for selected items */}
          {card.highlight && (
            <div className="absolute top-0 right-0 p-2 opacity-20">
              <div className="w-16 h-16 bg-amber-500 rounded-full blur-2xl"></div>
            </div>
          )}

          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {card.title}
          </p>
          <h2 className={`text-2xl font-bold mt-2 ${card.highlight ? "text-amber-400" : "text-white"}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}