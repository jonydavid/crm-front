import { Table, Pagination, Checkbox } from "rsuite";
import { useEffect, useState } from "react";
import { FaPencilAlt } from 'react-icons/fa';
import "rsuite/dist/rsuite.min.css";
import { Card } from "react-bootstrap";
import { componentsHelpers } from 'helpers/componentsHelpers'

function DataTable(dataObject:any) {
  const { HeaderCell, Cell, Column } = Table;
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [headers, setHeaders] = useState({});
  const [values, setValues] = useState([]);
  let checked = false;
  let indeterminate = false;

  useEffect(() => {

    setHeaders(componentsHelpers.mapHeader(dataObject) as any);
    setValues(componentsHelpers.mapValue(dataObject) as any);
  }, []);

  const mouseMove = (e:any)=>{
    e.target.style.color= 'black'
  }
  const mouseOut = (e:any)=>{
    e.target.style.color= 'white'
  }

  const styles = {
    borderRadius:'10px 10px 0px 0px'
  }

  const CheckCell = ({
    rowData,
    onChange,
    checkedKeys,
    dataKey,
    ...props
  }: any) => (
    <Cell {...props} style={{ padding: 0, alignItems:'right' }}>
      <div style={{ lineHeight: "46px" }}>
      <FaPencilAlt style={{color:"white"}} onMouseMove={mouseMove} onMouseOut={mouseOut} />
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some((item: any) => item === rowData[dataKey])}
        />
      </div>
    </Cell>
  );

  const data = values.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  if (checkedKeys.length === values.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < values.length) {
    indeterminate = true;
  }

  const handleChangeLimit = (dataKey: any) => {
    setPage(1);
    setLimit(dataKey);
  };

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

  return (
    <>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={values.length}
          limitOptions={[10, 20]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
      <Card style={styles}>
        <Table
          style={styles}
          height={420}
          data={data}
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

          {Object.keys(headers).map((h) => (
            <Column width={200} align="center" resizable>
              <HeaderCell>{headers[h as keyof typeof headers]}</HeaderCell>
              <Cell dataKey={h} />
            </Column>
          ))}
        
        </Table>
      </Card>
    </>
  );
}

export default DataTable;
