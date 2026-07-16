import { useState } from "react";

export default function CaseForm({ onCreateCase }) {
  const [title, setTitle] = useState("");
  const [investigator, setInvestigator] = useState("");
  const [caseType, setCaseType] = useState("Mobile Theft");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !investigator.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    const newCase = {
      title,
      investigator,
      case_type: caseType,
      priority,
      description,
    };

    await onCreateCase(newCase);

    setTitle("");
    setInvestigator("");
    setCaseType("Mobile Theft");
    setPriority("Medium");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0f1117] border border-slate-800 rounded-xl p-8 shadow-2xl"
    >
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white uppercase tracking-widest">Create New Investigation</h2>
        <p className="text-slate-500 text-sm mt-1">Initialize a secure data audit case file.</p>
      </div>

      <div className="space-y-6">
        {/* Title & Investigator Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Case Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0a0c10] border border-slate-800 rounded-lg p-3 text-sm focus:border-cyan-500 outline-none transition-colors"
              placeholder="Case identifier..."
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Lead Investigator *</label>
            <input
              type="text"
              value={investigator}
              onChange={(e) => setInvestigator(e.target.value)}
              className="w-full bg-[#0a0c10] border border-slate-800 rounded-lg p-3 text-sm focus:border-cyan-500 outline-none transition-colors"
              placeholder="Assign personnel..."
              required
            />
          </div>
        </div>

        {/* Type & Priority Row */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Case Type</label>
            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              className="w-full bg-[#0a0c10] border border-slate-800 rounded-lg p-3 text-sm outline-none focus:border-cyan-500"
            >
              <option>Mobile Theft</option>
              <option>Cyber Fraud</option>
              <option>Social Media</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Priority Level</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-[#0a0c10] border border-slate-800 rounded-lg p-3 text-sm outline-none focus:border-cyan-500"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Case Narrative</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#0a0c10] border border-slate-800 rounded-lg p-3 text-sm outline-none focus:border-cyan-500"
            placeholder="Detailed case context..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3.5 rounded-lg transition-all transform active:scale-[0.99] shadow-lg shadow-cyan-900/20"
        >
          INITIALIZE CASE
        </button>
      </div>
    </form>
  );
}
  