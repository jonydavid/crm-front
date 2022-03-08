import dataCase from "../../../data/prueba.json";
import DataTable from "../_common/data-table"


function Cases()
{
    const Table = ()=>{
       let tab =  DataTable(dataCase)
        return tab
    };

    return (
        <>
            <Table/>
        </>
    );
}

export default Cases;