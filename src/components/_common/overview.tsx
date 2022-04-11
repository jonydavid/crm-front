import React from "react";
import { Col, Row, Card, InputGroup, FormControl } from "react-bootstrap";
import { useEffect, useState } from "react";

import { listCases } from "../../services/caseService";
import { CaseDetailModel } from '../../models/Case';

import Notes from "components/_common/notes";

export default function Overview({page, id}:any){
    const [cases, setCases] = useState<CaseDetailModel>({} as CaseDetailModel)

    useEffect(() => {
        
        listCases(page, id)

            .then(data => {

                setCases(data)

            })

            .catch(e => console.log(e));

    }, [])

    let data = cases
    console.log(cases)
    return(
        <>
            <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginTop: 15 }} className="d-flex justify-content-center">
                <Row style={{ width: '99%' }} >
                    <Card body >
                        <Row className='mt-200'>
                            <Col sm={3} style={{ color: 'gray', marginRight: 30 }} >
                                <Row className='d-flex justify-content-end'>Status</Row>
                                <Row className='d-flex justify-content-end'>Case Origin</Row>
                                <Row className='d-flex justify-content-end'>Case Owner</Row>
                            </Col>
                            <Col>
                                <Row>{cases?.caseStatusName ? cases.caseStatusName : ' - '}</Row>
                                <Row>{cases?.originName ? cases.originName : ' - '}</Row>
                                <Row>{cases?.caseOwnerUserName ? cases.caseOwnerUserName : ' - '}</Row>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Row>

            <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginTop: 15 }}>
                <Row style={{ width: '99%' }}>
                    <Card body>
                        <Row className='mt-200'>
                            <Col>
                                <Row> <h6>Contact Person</h6></Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={1}>
                                <Row>Img</Row>
                            </Col>
                            <Col>
                                {/* <Row>{cases[0].contactName ? cases[0].contactName: ' - ' }</Row> */}
                                <Row>ademirdemaria@hotmail.com (no tenemos)</Row>
                                {/* <Row>{cases[0].contactPhone ? cases[0].contactPhone: ' - ' }</Row> */}
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Row>

            <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginTop: 15 }}>
                <Row style={{ width: '99%' }}>
                    <Card body>
                        <Row className='mt-200' style={{ marginBottom: 35 }}>
                            <Col>
                                <Row> <h6>Hide details</h6></Row>
                            </Col>
                        </Row>
                        <Row>
                            <Row>
                                <Col> <h6>Nro. de Ticket - Cronómetro</h6> </Col>
                            </Row>
                            <Row>
                                <Col style={{ color: 'gray' }}>Nro_Ticket_Finansys</Col>
                                <Col>{cases?.ticketNumber ? cases.ticketNumber : ' - '}</Col>
                                <Col style={{ color: 'gray' }}> Tiempo (auto) </Col>
                                <Col>{cases?.time ? cases.time : ' - '}</Col>
                            </Row>
                        </Row>

                        <Row className='mt-200' style={{ marginBottom: 20, marginTop: 20 }}>
                            <Row>
                                <Col> <h6>CLIENTE</h6> </Col>
                            </Row>
                            <Row align="end">
                                <Col style={{ color: 'gray' }}>Nombre y Apellido</Col>
                                <Col align="start">
                                    {cases?.contactFullname ? cases.contactFullname : ' - '}
                                </Col>

                                <Col style={{ color: 'gray' }}>Empresa name</Col>
                                <Col sm={4} align="start">
                                    {cases?.companyName ? cases.companyName : ' - '}
                                </Col>
                            </Row>
                        </Row>

                        <Row className='mt-200' style={{ marginBottom: 20, marginTop: 20 }}>
                            <Row>
                                <Col> <h6>DATOS DEL CLIENTE</h6> </Col>
                            </Row>
                            <Row align="end">
                                <Col style={{ color: 'gray' }}>Tipo de Documento</Col>
                                <Col align="start">
                                    {cases?.contactDocumentTypeName ? cases.contactDocumentTypeName : ' - '}
                                </Col>

                                <Col style={{ color: 'gray' }}>Correo electronico</Col>
                                <Col sm={4} align="start">
                                    example@example.com (no tenemos)
                                </Col>
                            </Row>
                            <Row align="end">
                                <Col style={{ color: 'gray' }}>Nro. de Documento Cliente</Col>
                                <Col align="start">
                                    {cases?.contactDocumentNumber ? cases.contactDocumentNumber : ' - '}
                                </Col>

                                <Col style={{ color: 'gray' }}>Celular</Col>
                                <Col sm={4} align="start">
                                    {cases?.contactMobile ? cases.contactMobile : ' - '}
                                </Col>
                            </Row>
                            <Row align="end">
                                <Col style={{ color: 'gray' }}>Código Cliente</Col>
                                <Col align="start">
                                    {cases?.contactClientCode ? cases.contactClientCode : ' - '}
                                </Col>

                                <Col style={{ color: 'gray' }}>Phone</Col>
                                <Col sm={4} align="start">
                                    {cases?.contactPhone ? cases.contactPhone : ' - '}
                                </Col>
                            </Row>
                            <Row align="end">
                                <Col style={{ color: 'gray' }}>Sucursal cliente</Col>
                                <Col sm={4} align="start">
                                    {cases?.contactBranchName ? cases.contactBranchName : ' - '}
                                </Col>
                                <Col ></Col>
                                <Col ></Col>
                            </Row>
                        </Row>

                        <Row className='mt-200' style={{ marginBottom: 20, marginTop: 20 }}>
                            <Row>
                                <Col> <h6>DATOS DEL CONTACTO</h6> </Col>
                            </Row>
                            <Row align="end">
                                <Col style={{ color: 'gray' }}>Nombre y apellido gestor</Col>
                                <Col align="start">
                                    {cases?.promoterFullName ? cases.promoterFullName : ' - '}
                                </Col>

                                <Col style={{ color: 'gray' }}>Nro. de documento gestor</Col>
                                <Col sm={4} align="start">
                                    {cases?.promoterDocumentNumber ? cases.promoterDocumentNumber : ' - '}
                                </Col>
                            </Row>
                            <Row align="end">
                                <Col style={{ color: 'gray' }}>Celular gestor</Col>
                                <Col align="start">
                                    {cases?.promoterPhone ? cases.promoterPhone : ' - '}
                                </Col>

                                <Col style={{ color: 'gray' }}>Email gestor</Col>
                                <Col sm={4} align="start">
                                    {cases?.promoterEmail ? cases.promoterEmail : ' - '}
                                </Col>
                            </Row>
                        </Row>

                        <Row className='mt-200' style={{ marginBottom: 20, marginTop: 20 }}>
                            <Row>
                                <Col> <h6>CLASIFICACIÓN DEL CASO</h6> </Col>
                            </Row>
                            <Row className='mt-200'>
                                <Col sm={3} style={{ color: 'gray', marginRight: 30 }} >
                                    <Row className='d-flex justify-content-end'>Type</Row>
                                    <Row className='d-flex justify-content-end'>Subtipo</Row>
                                    <Row className='d-flex justify-content-end'>Tipificacion</Row>
                                </Col>
                                <Col>
                                    <Row>{cases?.typeName ? cases.typeName : ' - '}</Row>
                                    <Row>{cases?.subtypeName ? cases.subtypeName : ' - '}</Row>
                                    <Row>{cases?.typificationName ? cases.typificationName : ' - '}</Row>
                                </Col>
                            </Row>
                        </Row>

                        <Row className='mt-200' style={{ marginBottom: 20, marginTop: 20 }}>
                            <Row>
                                <Col> <h6>EXPLICACIÓN DEL CASO</h6> </Col>
                            </Row>
                            <Row className='mt-200'>
                                <Col sm={3} style={{ color: 'gray', marginRight: 30 }} >
                                    <Row className='d-flex justify-content-end'>Subject</Row>
                                    <Row className='d-flex justify-content-end'>Descripción del Caso</Row>
                                </Col>
                                <Col>
                                    <Row>CONSULTA</Row>
                                    <Row>{cases?.description ? cases.description : ' - '}</Row>
                                </Col>
                            </Row>
                        </Row>

                        <Row className='mt-200' style={{ marginBottom: 20, marginTop: 20 }}>
                            <Row>
                                <Col> <h6>DATOS DEL CASO</h6> </Col>
                            </Row>
                            <Row align="end">
                                <Col style={{ color: 'gray' }}>Case Origin</Col>
                                <Col align="start">
                                    CALL {cases?.originName ? cases.originName : ' - '}
                                </Col>

                                <Col style={{ color: 'gray' }}>Case owner</Col>
                                <Col sm={4} align="start">
                                    {cases?.caseOwnerUserName ? cases.caseOwnerUserName : ' - '}
                                </Col>
                            </Row>
                            <Row align="end">
                                <Col style={{ color: 'gray' }}>Nro. ticket</Col>
                                <Col align="start">
                                    {cases?.ticketNumber ? cases.ticketNumber : ' - '}
                                </Col>

                                <Col style={{ color: 'gray' }}>Fecha/Hora Creado</Col>
                                <Col sm={4} align="start">
                                    {cases?.createdAt ? cases.createdAt : ' - '}
                                </Col>
                            </Row>
                            <Row align="end">
                                <Col style={{ color: 'gray' }}>Status</Col>
                                <Col align="start">
                                    PENDIENTE
                                </Col>

                                <Col style={{ color: 'gray' }}>Fecha/Hora Creado (auto)</Col>
                                <Col sm={4} align="start">
                                    {cases?.createdAt ? cases.createdAt : ' - '}
                                </Col>
                            </Row>
                            <Row align="end">
                                <Col style={{ color: 'gray' }}>Status</Col>
                                <Col align="start">
                                    PENDIENTE
                                </Col>

                                <Col style={{ color: 'gray' }}>Fecha/Hora Creado (auto)</Col>
                                <Col sm={4} align="start">
                                    {cases?.createdAt ? cases.createdAt : ' - '}
                                </Col>
                            </Row>
                            <Row align="end">
                                <Col style={{ color: 'gray' }}>Dirección de llamada</Col>
                                <Col align="start">
                                    {cases?.callDirection ? cases.callDirection : ' - '}
                                </Col>

                                <Col style={{ color: 'gray' }}></Col>
                                <Col align="start">
                                </Col>
                            </Row>
                            <Row align="end">
                                <Col style={{ color: 'gray' }}>id ServiDesk</Col>
                                <Col sm={4} align="start">
                                    {cases?.idServidesk ? cases.idServidesk : ' - '}
                                </Col>

                                <Col style={{ color: 'gray' }}></Col>
                                <Col align="start">
                                </Col>
                            </Row>
                        </Row>

                        <Row className='mt-200' style={{ marginBottom: 20, marginTop: 20 }}>
                            <Row>
                                <Col> <h6>RESOLUTORES DEL CASO</h6> </Col>
                            </Row>
                            <Row align="end">
                                <Col >Áreas Resolutoras</Col>
                                <Col align="start">
                                    {cases?.resolverAreas ? cases.resolverAreas : ' - '}
                                </Col>

                                <Col>Oficial negocio</Col>
                                <Col sm={4} align="start">
                                    {cases?.businessOfficerName ? cases.businessOfficerName : ' - '}
                                </Col>
                            </Row>
                            <Row align="start">
                                <Col >Personas Resolutoras</Col>
                                <Col align="start">
                                    {cases?.resolvers ? cases.resolvers : ' - '}
                                </Col>
                            </Row>

                        </Row>

                        <Row className='mt-200' style={{ marginBottom: 20, marginTop: 20 }}>
                            <Row>
                                <Col> <h6>RESOLUCIÓN / COMENTARIO</h6> </Col>
                            </Row>
                            <Row align="end">
                                <Col >Solution</Col>
                                <Col align="start">
                                    {cases?.solution ? cases.solution : ' - '}
                                </Col>

                                <Col>Comentario de Contacto / Cierre</Col>
                                <Col sm={4} align="start">
                                    -
                                </Col>
                            </Row>
                            <Row align="end">
                                <Col >¿Desea solicitar una prórroga del caso?</Col>
                                <Col align="start">
                                    {cases?.requestExtension ? cases.requestExtension : ' - '}
                                </Col>

                                <Col>Calificación</Col>
                                <Col sm={4} align="start">
                                    -
                                </Col>
                            </Row>

                        </Row>

                        <Row className='mt-200' style={{ marginBottom: 20, marginTop: 20 }}>
                            <Row>
                                <Col> <h6>COMENTARIOS</h6> </Col>
                            </Row>
                            <Row align="start">
                                <Col >Comments</Col>
                                <Col align="start">
                                    -
                                </Col>
                            </Row>

                        </Row>

                        <Row className='mt-200' style={{ marginBottom: 20, marginTop: 20 }}>
                            <Row>
                                <Col> <h6>DATOS ADICIONALES</h6> </Col>
                            </Row>
                            <Row align="end">
                                <Col >Add comment</Col>
                                <Col align="start">
                                    -
                                </Col>

                                <Col>No. of comments</Col>
                                <Col sm={4} align="start">
                                    -
                                </Col>
                            </Row>

                        </Row>

                        <Row className='mt-200' style={{ marginBottom: 20, marginTop: 20 }}>
                            <Row>
                                <Col> <h6>USO INTERNO - AUTOMATIZACIÓN</h6> </Col>
                            </Row>
                            <Row align="end">
                                <Col >Notas_auto</Col>
                                <Col align="start">
                                    -
                                </Col>

                                <Col>Fecha/Hora Cierre</Col>
                                <Col sm={4} align="start">
                                    -
                                </Col>
                            </Row>
                            <Row align="end">
                                <Col >Nro Ticket (auto)</Col>
                                <Col align="start">
                                    123456
                                </Col>

                                <Col>Actualizado</Col>
                                <Col sm={4} align="start">
                                    -
                                </Col>
                            </Row>

                        </Row>

                        <Row className='mt-200' style={{ marginBottom: 20, marginTop: 20 }}>
                            <Row>
                                <Col> <h6>AUTOMATIZACION - FORM</h6> </Col>
                            </Row>
                            <Row align="end">
                                <Col >Nombre/Empresa (auto)</Col>
                                <Col align="start">
                                    -
                                </Col>

                                <Col>RUC (auto)</Col>
                                <Col sm={4} align="start">
                                    -
                                </Col>
                            </Row>
                            <Row align="end">
                                <Col >Nombre (auto)</Col>
                                <Col align="start">
                                    -
                                </Col>

                                <Col>Apellido (auto)</Col>
                                <Col sm={4} align="start">
                                    -
                                </Col>
                            </Row>
                            <Row align="end">
                                <Col >Teléfono Gestor (auto)</Col>
                                <Col align="start">
                                    -
                                </Col>

                                <Col>Email (auto)</Col>
                                <Col sm={4} align="start">
                                    -
                                </Col>
                            </Row>
                        </Row>





                    </Card>


                </Row>


            </Row>

            <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginTop: 15 }}>
                <Row style={{ width: '99%' }}>
                    <Card body>
                        <Row className='mt-200'>
                            <Col>
                                <Row> <h6>Notas</h6></Row>
                            </Col>
                        </Row>
                        <Row>
                            {/* <InputGroup className="mb-3">
                                <FormControl
                                    aria-label="Example text with button addon"
                                    aria-describedby="basic-addon1"
                                    placeholder="Add a note..."
                                />
                            </InputGroup> */}
                           <Notes /> 
                        </Row>
                    </Card>
                </Row>
            </Row>

            <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginTop: 15 }}>
                <Row style={{ width: '99%' }}>
                    <Card body>
                        <Row className='mt-200'>
                            <Col>
                                <Row> <h6>Historial de Estado</h6></Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row style={{ color: 'gray' }}>Status</Row>
                                <Row>Cerrado</Row>
                            </Col>
                            <Col>
                                <Row style={{ color: 'gray' }}>Duration (Days)</Row>
                                <Row>0 days</Row>
                            </Col>
                            <Col>
                                <Row style={{ color: 'gray' }}>Modified Time</Row>
                                <Row>Mar 7, 2022 05:41 AM</Row>
                            </Col>
                            <Col>
                                <Row style={{ color: 'gray' }}>	Modified By</Row>
                                <Row>	Matias Samuel Yorki Samudio</Row>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Row>

            <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginTop: 15 }}>
                <Row style={{ width: '99%' }}>
                    <Card body>
                        <Row className='mt-200'>
                            <Col>
                                <Row > <h6>Attachments</h6></Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row style={{ color: 'gray' }}>No Attachment</Row>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Row>

            <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginTop: 15 }}>
                <Row style={{ width: '99%' }}>
                    <Card body>
                        <Row className='mt-200'>
                            <Col>
                                <Row> <h6>
                                    Open Activities</h6></Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row style={{ color: 'gray' }}>No records found</Row>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Row>

            <Row style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 15, marginTop: 15 }}>
                <Row style={{ width: '99%' }}>
                    <Card body>
                        <Row className='mt-200'>
                            <Col>
                                <Row> <h6>

                                    Closed Activities</h6></Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row style={{ color: 'gray' }}>No records found</Row>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Row>

        </>
    )
}