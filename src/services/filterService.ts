import axios from "axios";

export async function multiSelectOption(page:any): Promise<any[]> {
    const res = await axios.get<any[]>(`https://localhost:5001/v1/api/${page}`)
    return res.data
}