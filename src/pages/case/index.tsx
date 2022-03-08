import {useState} from "react";
import {listCompanies} from "../../services/companyService";
import {CompanyModel} from "../../models/Company";
import Cases from "components/case/data-case";
import SideFilter from "components/case/side-filter";

import styles from '../../../public/styles/case/Case.module.scss'
import { Card, Col, Container, Row } from "react-bootstrap";

export default function Index() {

  const styles = {
    marginTop:'15px'
  }
  return (<>
  <Container style={styles} fluid>
    <Row>
      <Col xs={3}>
        <SideFilter/>
      </Col>
      <Col xs={9}>
          <Cases/>
      </Col>
    </Row>
  </Container>
  </>)
}
 export async function getServerSideProps() {
   const data = await listCompanies()
   
   return {props: data}
 }