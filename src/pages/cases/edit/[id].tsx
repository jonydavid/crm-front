import Forms from "components/case/forms";
import _ from "lodash";
import { CreateCaseModel } from "models/Case";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { createCase, refenceField, updateCase } from "services/caseService";


function EditCase({id, uri}:any) {
  const [casesData, setCasesData] = useState<CreateCaseModel>({
    callDirectionId: 1,
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

  useEffect(()=>{
    let page = _.startCase(uri);
    updateCase(page, id)
    .then( (response:any) => {
      if(response.companyId !== null){
        let key = "companyId";
        let value= response.companyId;
        completeField(key, value);
      }
      else if(response.contactId !== null){
        let key = "contactId";
        let value= response.contactId;
        completeField(key, value);
      }
      if(response.promoterId!==null){
        let key = "promoterId";
        let value= response.promoterId;
        completeField(key, value);
      }
      setCasesData(response);

    })
    .catch((e:any) => console.log(e));
    
  }, []);
  
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
        if(value !== null)
        {
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

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const page = "Cases";
      try {
        await createCase(page, casesData);
      } catch (error) {
        console.log(error);
      }
    }
    setValidated(true);
  };


    return (
      <>
      <Form noValidate validated={validated} style={{marginTop:'58px'}} onSubmit={handleSubmit}>
        <Container className="shadow-sm p-3 mb-5 bg-white rounded mt-2">
          <Row className="justify-content-end">
            <Col sm={2}>
              {" "}
              <h4>Editar Caso</h4>{" "}
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
    )
  }
  
  export default EditCase

  export async function getServerSideProps(req:any, res:any) {
    const { query: { id }, resolvedUrl } = req; 
    const uri = resolvedUrl.split("/")[1]
    return {
      props: { id, uri }  
    }
  }
