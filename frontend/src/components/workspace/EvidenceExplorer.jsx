import {
  Image,
  Database,
  FileText,
  Smartphone,
} from "lucide-react";

export default function EvidenceExplorer({
  evidence,
  selected,
  setSelected,
}) {
  const getIcon = (file) => {
    if (file.filetype?.startsWith("image"))
      return <Image size={18} />;

    if (
      file.filename.endsWith(".db") ||
      file.filename.endsWith(".sqlite")
    )
      return <Database size={18} />;

    if (file.filename.endsWith(".apk"))
      return <Smartphone size={18} />;

    return <FileText size={18} />;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 h-[600px] overflow-y-auto">

      <h2 className="text-xl font-semibold mb-5">
        Evidence Explorer
      </h2>

      <div className="space-y-3">

        {evidence.map((item) => (

          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className={`p-3 rounded-lg cursor-pointer transition
            ${
              selected?.id === item.id
                ? "bg-cyan-600"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >

            <div className="flex items-center gap-3">

              {getIcon(item)}

              <div>

                <p className="font-medium">

                  {item.filename}

                </p>

                <p className="text-xs text-slate-300">

                  {item.filetype}

                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}