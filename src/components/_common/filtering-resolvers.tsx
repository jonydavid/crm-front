import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { typesFilter } from "store/filterResolutionAreas/filterReducer";
import { useDispatchFilter } from "store/filterResolutionAreas/FilterProvider";
import { getResolutionAreasFilter } from "services/searchService";
import Select from 'react-select';

export default function FilteringResolvers() {
    const dispatchFilter = useDispatchFilter();
    const [resolutionAreas, setResolutionAreas] = useState([]);

    useEffect(() => {
        getResolutionAreasFilter()
            .then((res: any) => {
                setResolutionAreas(res);
            })
            .catch((e: any) => console.log(e));
    }, [])

    const resolverAreas = () =>  resolutionAreas.map(item => ({value: item.id, label: item.value}))
    const handleChange = (values: any) => dispatchFilter({ type: typesFilter.setFilter,  payload: values.value})
    
    return (
        <Row style={{ marginBottom: '10px' }}>
            <Col>
                <Col sm={2} align="start">
                    <Select
                        instanceId="resolutionAreas"
                        name="resolutionAreas"
                        options={resolverAreas()}
                        onChange={handleChange}
                        className="basic-select"
                        classNamePrefix="select"
                    />
                </Col>
            </Col>
        </Row>
    )
}