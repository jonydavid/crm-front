import { Table, Pagination, Checkbox } from "rsuite";
import { useEffect, useState } from "react";
import Link from 'next/link'
import { FaPencilAlt, FaEye } from 'react-icons/fa';
import "rsuite/dist/rsuite.min.css";
import { Card } from "react-bootstrap";

import { getListView } from "services/caseService";

import { useStoreFilter } from "store/filter/FilterProvider"
import { useStoreFilter as useStoreFilterResolutionArea } from "store/filterResolutionAreas/FilterProvider"

const DataTable = ({module}:any) => {
    const storeFilter = useStoreFilter();
    const storeFilterResolutionArea = useStoreFilterResolutionArea();
    const { HeaderCell, Cell, Column } = Table;
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [headers, setHeaders] = useState({});
    const [values, setValues] = useState([]);
    const [total, setTotal] = useState(0);
    const showRecords:number[] = [10, 20, 50, 100];

    let checked = false;
    let indeterminate = false;

    useEffect(() => {
        getListView(module)
            .then( (res:any) => {
                setTotal(res.count)
                setHeaders(Object.keys(res.items[0]))
            })
            .catch((e:any) => {
                setLoading(false)
                console.log(e)
            });
    }, [])

    useEffect(() => {
        setLoading(true)
        getListView(module, storeFilter.type, storeFilterResolutionArea.type, (page-1), limit)
            .then( (res:any) => {
                setValues(res.items);
                setLoading(false)
            })
            .catch((e:any) => {
                setLoading(false)
                console.log(e)
            });
    }, [page, limit, storeFilter, storeFilterResolutionArea])

    if (checkedKeys.length === values.length) {
        checked = true;
    } else if (checkedKeys.length === 0) {
        checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < values.length) {
        indeterminate = true;
    }

    const handleChangeLimit = (dataKey: any) =>  setLimit(dataKey);

    const handleCheckAll = (value: any, checked: any) => {
        const keys = checked ? values.map((item) => item.id) : [];
        setCheckedKeys(keys);
    };
    
    const handleCheck = (value: any, checked: any) => {
        const keys = checked
        ? [...checkedKeys, value]
        : checkedKeys.filter((item) => item !== value);
        setCheckedKeys(keys);
    };

    const styles = { borderRadius:'10px 10px 0px 0px' }

    const CheckCell = ({
        rowData,
        onChange,
        checkedKeys,
        dataKey,
        ...props
    }: any) => (
        <Cell {...props} style={{ padding: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Link href={`${module}/edit/${encodeURIComponent(rowData[dataKey])}`}>
                    <div>
                        <FaPencilAlt style={{color:"black", cursor:"pointer" }} />
                    </div>
                </Link>
                <Link href={`${module}/show/${encodeURIComponent(rowData[dataKey])}`}>
                    <div>
                        <FaEye style={{color:"black", cursor:"pointer" }} />
                    </div>
                </Link>
                {/* <Checkbox
                    value={rowData[dataKey]}
                    inline
                    onChange={onChange}
                    checked={checkedKeys.some((item: any) => item === rowData[dataKey])}
                /> */}
            </div>
        </Cell>
    );

    return (
        <>
        <Card style={styles}>
            <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={5}
                size="md"
                layout={["total", "-", "limit", "|", "pager"]}
                total={total}
                limitOptions={showRecords}
                limit={limit}
                activePage={page}
                onChangePage={setPage}
                onChangeLimit={handleChangeLimit}
            />
            
                <Table
                    style={styles}
                    height={420}
                    data={values}
                    loading={loading}
                    bordered
                    cellBordered
                    autoHeight
                    affixHeader
                    affixHorizontalScrollbar
                >
                    <Column width={100} align="center" fixed resizable>
                        <HeaderCell style={{ padding: 0 }}>
                            <div style={{ lineHeight: "40px" }}>
                                <Checkbox
                                    inline
                                    checked={checked}
                                    indeterminate={indeterminate}
                                    onChange={handleCheckAll}
                                />
                            </div>
                        </HeaderCell>
                        <CheckCell
                            dataKey="id"
                            checkedKeys={checkedKeys}
                            onChange={handleCheck}
                        />
                    </Column>
                    
                    {Object.keys(headers)?.map((header) => (
                        <Column width={200} align="center" resizable key={header}>
                            <HeaderCell><b>{headers[header as keyof typeof headers]}</b></HeaderCell>
                            <Cell dataKey={headers[header as keyof typeof headers]} />
                        </Column>
                    ))}
                
                </Table>
            </Card>
        </>
    );
}

export default DataTable;
