const API_URL = "http://127.0.0.1:8000/settings";


export async function getSettings(){

    const response = await fetch(`${API_URL}/`);

    if(!response.ok){
        throw new Error("Failed to fetch settings");
    }

    return await response.json();

}



export async function saveSettings(data){

    const response = await fetch(`${API_URL}/`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json",
        },

        body:JSON.stringify(data)

    });


    if(!response.ok){
        throw new Error("Failed to save settings");
    }


    return await response.json();

}