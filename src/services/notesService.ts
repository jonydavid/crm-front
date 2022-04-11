import axios from "axios";
const baseURLP = "https://localhost:5001/v1/api/Notes/Case";

export async function createNote(text: string, moduleId: number, module: string){
    try {
        const body = {
            body: text,
            moduleId
        }
        await axios.post(baseURLP, body, {params:{module}})
    } catch (error) {
        console.log(Error)
    }
}

