const API_URL = "http://127.0.0.1:8000/reports";


// Get all reports

export async function getReports(){

    const response = await fetch(
        `${API_URL}/`
    );


    if(!response.ok){

        throw new Error(
            "Failed to fetch reports"
        );

    }


    return response.json();

}




// Delete report

export async function deleteReport(id){

    const response = await fetch(

        `${API_URL}/${id}`,

        {
            method:"DELETE"
        }

    );


    return response.json();

}




// View report

export function viewReport(id){

    window.open(

        `${API_URL}/view/${id}`,

        "_blank"

    );

}




// Download report

export function downloadReport(id){

    window.open(

        `${API_URL}/download/${id}`,

        "_blank"

    );

}