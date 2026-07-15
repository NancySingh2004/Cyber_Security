const API_URL = "http://127.0.0.1:8000";


export async function getCases() {

  const response = await fetch(
    `${API_URL}/cases/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cases");
  }

  return await response.json();

}



export async function createCase(caseData) {

  const response = await fetch(
    `${API_URL}/cases/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(caseData),
    }
  );


  if (!response.ok) {
    throw new Error("Failed to create case");
  }


  return await response.json();

}



export async function getCaseSummary(caseId) {

  const response = await fetch(
    `${API_URL}/cases/${caseId}/summary`
  );


  if (!response.ok) {
    throw new Error("Failed to load case summary");
  }


  return await response.json();

}


export async function getCaseById(caseId) {

  const response = await fetch(
    `${API_URL}/cases/${caseId}/summary`
  );


  if (!response.ok) {
    throw new Error("Failed to load case details");
  }


  const data = await response.json();


  return data.case;

}
