import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import CaseForm from "../components/cases/CaseForm";
import CaseCard from "../components/cases/CaseCard";
import { getCases, createCase } from "../services/caseService";

export default function Cases() {
  const [cases, setCases] = useState([]);

  const loadCases = async () => {
    try {
      const data = await getCases();
      setCases(data);
    } catch (error) {
      console.error("Error loading cases:", error);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  const handleCreateCase = async (newCase) => {
    try {
      await createCase(newCase);
      await loadCases();
    } catch (error) {
      console.error("Error creating case:", error);
      alert("Failed to create case.");
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8">
        Case Management
      </h1>

      <CaseForm onCreateCase={handleCreateCase} />

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-5">
          Investigation Cases
        </h2>

        {cases.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-400 text-center">
            No investigation cases created yet.
          </div>
        ) : (
          <div className="space-y-5">
            {cases.map((item) => (
              <CaseCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}