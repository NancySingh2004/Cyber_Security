const API_URL = "http://127.0.0.1:8000/reports";

export async function getReports() {
  const response = await fetch(`${API_URL}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }

  return await response.json();
}

export async function createReport(data) {
  const response = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create report");
  }

  return await response.json();
}

export async function deleteReport(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete report");
  }

  return await response.json();
}