const API_URL = "http://127.0.0.1:8000";

export async function uploadEvidence(file, caseId) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("case_id", caseId);

  const response = await fetch(
    `${API_URL}/evidence/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload evidence");
  }

  return await response.json();
}

export async function getEvidence() {
  const response = await fetch(
    `${API_URL}/evidence/`
  );

  if (!response.ok) {
    throw new Error("Failed to load evidence");
  }

  return await response.json();
}

// NEW
export async function getEvidenceByCase(caseId) {
  const response = await fetch(
    `${API_URL}/evidence/case/${caseId}`
  );

  if (!response.ok) {
    throw new Error("Failed to load case evidence");
  }

  return await response.json();
}
export async function analyzeEvidence(evidenceId) {
  const response = await fetch(
    `${API_URL}/analysis/file/${evidenceId}`
  );

  if (!response.ok) {
    throw new Error("Analysis failed");
  }

  return await response.json();
}