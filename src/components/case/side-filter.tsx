import { componentsHelpers } from "helpers/componentsHelpers";
import { useEffect, useState } from "react";
import { Container, FormControl, InputGroup, Card, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { IoCaretDown } from "react-icons/io5";
import dataCase from "../../../data/prueba.json";

function SideFilter() {
  const [headers, setHeaders] = useState({});
  const [values, setValues] = useState([]);

  useEffect(() => {

    setHeaders(componentsHelpers.mapHeader(dataCase) as any);
    setValues(componentsHelpers.mapValue(dataCase) as any);
  }, []);

  const style = {
    card:{
      marginTop:"67px",
      borderRadius:'10px 10px 0 0'
    },
    input:{
      borderRadius:'0% 20px 20px 0%'
    },
    inputButton:{
      borderRadius:'20px 0 0 20px'
    },
    select:{
      with: "100px"
    }
    
  }

  const dataSelect = [{
    "label": "Es",
    "value": "es"
  },
  {
    "label": "No está",
    "value": "not in"
  },
  {
    "label": "Contiene",
    "value": "contiene",
    "role": "Master"
  },
  {
    "label": "No contiene",
    "value": "no contiene"
  },
  {
    "label": "empieza por",
    "value": "empieza por"
  },
  {
    "label": "Termina por",
    "value": "termina por"
  },
  {
    "label": "Esta vacio",
    "value": "esta vacio"
  },
  {
    "label": "No esta vacio",
    "value": "No esta vacio"
  }]

  const onClickIcon = (e:any)=>{
    let datos = e.target;
    console.log(datos)
    return datos;
  }

  const onClickCheck = (e:any)=>{
    console.log(e.target)
  }
  return (
    <>
      <Card style={style.card}>
        <Container fluid>
          <h6 className="mt-2">Filtrar Casos por:</h6>
          <InputGroup className="mb-3 mt-2">
            <InputGroup.Text id="basic-addon1" style={style.inputButton}><BsSearch/></InputGroup.Text>
            <FormControl
              style={style.input}
              placeholder="Buscar"
              aria-label="Buscar"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <a style={{fontWeight:"bold", color:"black"}} onClick={onClickIcon}><IoCaretDown/>Filtros definidos por el sistema</a>
          <Form>
          {['checkbox'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                style={{ color:"black"}}
                label="Registros modificados"
                name="group12"
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                style={{ color:"black"}}
                label="Registros no modificados"
                name="group13"
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                style={{ color:"black"}}
                label="Acción en Registro"
                name="group14"
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                style={{ color:"black"}}
                label="Acción en Registro relacionado"
                name="group15"
                id={`inline-${type}-1`}
              />
              
            </div>
          ))}
          <a style={{fontWeight:"bold", color:"black"}} onClick={onClickIcon}><IoCaretDown/>Filtrar por campos</a>
          {['checkbox'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              {
                Object.keys(headers).map((h) => (
                  <div>
                    <Form.Check
                      inline
                      style={{ color:"black"}}
                      label={headers[h as keyof typeof headers]}
                      name="group1"
                      id={`inline-${type}-1`}
                      onClick={onClickCheck}
                    />
                    <div id={h} className="d-none">
                      <Form.Select aria-label="Default select example" size="sm">
                        {dataSelect.map((index)=>{
                          return <option value={index.value}>{index.label}</option>
                        })}
                      </Form.Select>
                      <FormControl className="mt-1" size="sm"/>
                    </div>
                  <br/>
                  </div>
                ))
              }
            </div>
          ))}
        </Form>
        </Container>
      </Card>
    </>
  );
}

export default SideFilter
