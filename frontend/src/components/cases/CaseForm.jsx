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
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold text-cyan-400">
        Create Investigation Case
      </h2>

      <div>
        <label className="block mb-2">Case Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-800 rounded-lg p-3 outline-none"
          placeholder="e.g. WhatsApp Chat Investigation"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Investigator *</label>
        <input
          type="text"
          value={investigator}
          onChange={(e) => setInvestigator(e.target.value)}
          className="w-full bg-slate-800 rounded-lg p-3 outline-none"
          placeholder="Enter investigator name"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Case Type</label>
          <select
            value={caseType}
            onChange={(e) => setCaseType(e.target.value)}
            className="w-full bg-slate-800 rounded-lg p-3"
          >
            <option>Mobile Theft</option>
            <option>Cyber Fraud</option>
            <option>Social Media</option>
            <option>Financial Fraud</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-slate-800 rounded-lg p-3"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-2">Description</label>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-slate-800 rounded-lg p-3"
          placeholder="Case description..."
        />
      </div>

      <button
        type="submit"
        className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-semibold"
      >
        Create Case
      </button>
    </form>
  );
}