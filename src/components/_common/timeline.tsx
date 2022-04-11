import React from "react";
import { Card, Col, Row } from "react-bootstrap";

export default function Timeline() {
    return (
        <Row style={{
            maxHeight: "22rem", overflow: "auto", backgroundColor: '#edf0f4'
        }}>


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
        </Row>
    )
}