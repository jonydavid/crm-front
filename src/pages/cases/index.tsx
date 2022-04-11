import { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useRouter } from 'next/router'
import SideFilter from "components/_common/side-filter";
import Kanban from "components/_common/kanban";

import { FaFilter, FaList, FaColumns } from 'react-icons/fa';

import DataTable from "components/_common/data-table";

import FilteringResolvers from "components/_common/filtering-resolvers";

import FilterProvider from "store/filter/FilterProvider";
import FilterContextResolutionAreasProvider from "store/filterResolutionAreas/FilterProvider";

export default function Index({module}:any) {
    const [viewFilter, setViewFilter] = useState(true);
    const [viewKanban, setViewKanban] = useState(false);
    const router = useRouter()

    const toggleViewFilter = () => setViewFilter(!viewFilter)
    const toggleViewKanban = () => setViewKanban(!viewKanban)

    const goToCreate = () => {
        router.push(`${module}/new`)
    }

    const textList   = 'Vista de lista';
    const textKanban = 'Vista Kanban';

    return ( 
        <>
            <Container style={{background: '#edf0f4'}} fluid>
                <FilterProvider>
                    <FilterContextResolutionAreasProvider>
                        <Row style={{padding: '6px', background: '#FFF', marginTop: '70px'}}>
                            <Col xs={1} >
                                <Button variant="secondary" style={{background: '#FFF'}} onClick={toggleViewFilter}>
                                    <div>
                                        <FaFilter style={{color:"black"}} />
                                    </div>
                                </Button>
                            </Col>
                            <Col xs={6} >
                                <FilteringResolvers />
                            </Col>
                            <Col xs={2} >
                                <Button variant="secondary" style={{background: '#FFF', color: 'black'}} onClick={toggleViewKanban}>
                                    <div>
                                        {viewKanban ? 
                                            <><FaList style={{color:"black"}} /> {textList}</>: 
                                            <><FaColumns style={{color:"black"}} /> {textKanban}</>
                                        }
                                    </div>
                                </Button>
                            </Col>
                            <Col xs={2} >
                                
                                <Button onClick={goToCreate}>Crear Caso</Button>
                            </Col>

                        </Row>
                        <Row>
                            <Col xs={2} style={{marginLeft: '27px', padding: '7px 0' }}>
                                <h6>{viewKanban ? textList: textKanban}</h6>
                            </Col>
                        </Row>
                        <Row>
                            {viewFilter && (
                                <Col xs={3}>
                                    <SideFilter module={module}/>
                                </Col>
                            )}
                            
                            <Col xs={ viewFilter ? 9 : 12} >
                                {viewKanban && (
                                    <div suppressHydrationWarning={true} style={{backgroundColor: '#edf0f4',overflow: "auto", display: "flex" }}>
                                        {process.browser && <Kanban module={module} />}
                                    </div>
                                )}

                                {!viewKanban && ( <DataTable module={module} /> )}

                            </Col>
                        </Row>
                    </FilterContextResolutionAreasProvider>
                </FilterProvider>
            </Container>
        </>
    )
}

export function getServerSideProps(req:any, res:any) {
    const module = req.resolvedUrl;
    return { props: { module } }
}