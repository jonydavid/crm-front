import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Forms from "components/case/forms";
import { CreateCaseModel } from "../../models/Case";
import { createCase, refenceField } from "../../services/caseService";
import { useRouter } from "next/router";

function New({module}:any) {
  const [casesData, setCasesData] = useState<CreateCaseModel>({
    callDirectionId: 1,
    contactId: null,
    companyId: null,
  } as CreateCaseModel);
  const [dataReference, setDataReference] = useState({
    documentTypeName: "",
    email: "",
    clientCode: "",
    documentNumber: "",
    branchName: null,
    phone: "",
    mobile: "",
  });

  const [dataPromoter, setDataPromoter] = useState({
    email: "",
    documentNumber: "",
    mobile: "",
  });

  const [validated, setValidated] = useState(false);
  const router = useRouter();

  const handleChange = (e: any, name: string | null = null) => {
    if (!name) {
      let key = e.target.name;
      let value;
      switch (e.target.type) {
        case "checkbox":
          value = e.target.checked;
          break;
        case "select-one":
          if (isNaN(e.target.value)) {
            value = null;
            break;
          }
          value = Number(e.target.value);
          break;
        default:
          value = e.target.value;
          break;
      }
      if (key == "companyId" || key == "contactId" || key == "promoterId") {
        completeField(key, value);
      }
      setCasesData({ ...casesData, [key]: value });
      return;
    } else {
      setCasesData({ ...casesData, [name]: e });
      return;
    }
  };

  const completeField = async (key: any, value: any) => {
    let page;
    switch (key) {
      case "companyId":
        page = "Info/cases/contact-info";
        if (value !== null) {
          try {
            const res: any = await refenceField(page, value);
            setDataReference(res);
          } catch (error) {
            console.log(error);
          }
        }

        break;
      case "contactId":
        page = "Info/cases/company-info";
        if (value !== null) {
          try {
            const res: any = await refenceField(page, value);
            setDataReference(res);
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case "promoterId":
        page = "Info/cases/contact-info";
        try {
          const res: any = await refenceField(page, value);
          setDataPromoter(res);
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      let page = "Cases";
      try {
        await createCase(page, casesData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(module.split('/')[0])

  return (
    <>
      <Form
        noValidate
        validated={validated}
        style={{ marginTop: "58px" }}
        onSubmit={handleSubmit}
      >
        <Container className="shadow-sm p-3 mb-5 bg-white rounded mt-2">
          <Row className="justify-content-end">
            <Col sm={2}>
              {" "}
              <h4>Crear caso</h4>{" "}
            </Col>
            <Col sm={2}>
              <Form.Select>
                <option value="1">Diseños</option>
                <option value="2">Standard</option>
                <option value="3">Test</option>
              </Form.Select>
            </Col>
            <Col align="end">
              <Button variant="secondary">Cancelar</Button>{" "}
              <Button variant="secondary">Guardar y nuevo</Button>{" "}
              <Button variant="primary" type="submit">
                Guardar
              </Button>{" "}
            </Col>
          </Row>
        </Container>
        <Forms
          handleChange={handleChange}
          reference={dataReference}
          dataPromoter={dataPromoter}
          caseData={casesData}
        />
      </Form>
    </>
  );
}

export default New;

export function getServerSideProps(req:any, res:any) {
  const module = req.resolvedUrl;
  return { props: { module } }
}
