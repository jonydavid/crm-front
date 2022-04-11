import axios from "axios";

export async function getResolutionAreasFilter(): Promise<any[]> {
    const res = await axios.get<any[]>(`https://localhost:5001/v1/api/Info/list-resolver-areas`)
    return res.data
}