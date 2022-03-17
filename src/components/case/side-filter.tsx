import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  FormControl,
  InputGroup,
  Card,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { IoCaretDown } from "react-icons/io5";

function SideFilter() {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const request: any = {
      method: "get",
      url: "https://localhost:5001/v1/api/Filter/cases",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    axios(request)
      .then(function (response) {
        setValues(response.data);
      })
      .catch(function (error) {
        alert(error);
      });
  }, []);

  const style = {
    card: {
      marginTop: "67px",
      borderRadius: "10px 10px 0 0",
    },
    card_header: {
      background: "transparent",
      borderBottom: "0px",
    },
    input: {
      borderRadius: "0% 20px 20px 0%",
    },
    inputButton: {
      borderRadius: "20px 0 0 20px",
    },
    select: {
      with: "100px",
    },
    scrollCard: {
      overflowY: "scroll",
      height: "500px",
    },
  };

  const dataSelect = [
    {
      label: "Es",
      value: "es",
    },
    {
      label: "No está",
      value: "not in",
    },
    {
      label: "Contiene",
      value: "contiene",
      role: "Master",
    },
    {
      label: "No contiene",
      value: "no contiene",
    },
    {
      label: "empieza por",
      value: "empieza por",
    },
    {
      label: "Termina por",
      value: "termina por",
    },
    {
      label: "Esta vacio",
      value: "esta vacio",
    },
    {
      label: "No esta vacio",
      value: "No esta vacio",
    },
  ];

  const onClickIcon = (e: any) => {
    let datos = e.target;
    console.log(datos);
    return datos;
  };

  const onClickCheck = async (e: any) => {
    let idCheck = e.target.id;
    let type = e.target.alt.split(" ")[0];
    let endpoint = e.target.alt.split(" ")[1];
    console.log(type, endpoint);
    let element: any = document.getElementsByClassName(`${idCheck}`)[0];
    let display = element.className.split(" ")[1];
    if (display == "d-none") {
      if (type == "MultipleSelect") {
        let q = `https://localhost:5001/v1/api/${endpoint}`;
        //let d = await mapMultiSelect(q);
        //console.log(d);
      }
      element.classList.remove("d-none");
    } else {
      element.classList.add("d-none");
    }
  };

  const dataMultiSelect: any = async (uri: any) => {
    return await axios.get(uri);
  };

  const mapMultiSelect: any = async (uri: any) => {
    let { data } = await dataMultiSelect(uri);
    return data.map((index:any)=>{
      <option value={index.id}>{index.value}</option>
    });
  };
  return (
    <>
      <Card style={style.card}>
        <Card.Header style={style.card_header}>
          <h6 className="mt-2">Filtrar Casos por:</h6>
          <InputGroup className="mb-3 mt-2 fixed">
            <InputGroup.Text id="basic-addon1" style={style.inputButton}>
              <BsSearch />
            </InputGroup.Text>
            <FormControl
              style={style.input}
              placeholder="Buscar"
              aria-label="Buscar"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Card.Header>
        <Container fluid style={style.scrollCard}>
          <a
            style={{ fontWeight: "bold", color: "black" }}
            onClick={onClickIcon}
          >
            <IoCaretDown />
            Filtros definidos por el sistema
          </a>
          <Form>
            {["checkbox"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  style={{ color: "black" }}
                  label="Registros modificados"
                  name="group12"
                  id={`inline-${type}-12`}
                />
                <Form.Check
                  inline
                  style={{ color: "black" }}
                  label="Registros no modificados"
                  name="group13"
                  id={`inline-${type}-13`}
                />
                <Form.Check
                  inline
                  style={{ color: "black" }}
                  label="Acción en Registro"
                  name="group14"
                  id={`inline-${type}-14`}
                />
                <Form.Check
                  inline
                  style={{ color: "black" }}
                  label="Acción en Registro relacionado"
                  name="group15"
                  id={`inline-${type}-15`}
                />
              </div>
            ))}
            <a
              style={{ fontWeight: "bold", color: "black" }}
              onClick={onClickIcon}
            >
              <IoCaretDown />
              Filtrar por campos
            </a>
            {["checkbox"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                {values.map((h: any) => (
                  <div>
                    <Form.Check
                      inline
                      style={{ color: "black" }}
                      label={h.title}
                      name="group1"
                      id={`inline-${type}-${h.title
                        .replace(" ", "-")
                        .replace(" ", "-")
                        .replace(" ", "-")}`}
                      onClick={onClickCheck}
                      alt={`${h.type} ${h.endpoint}`}
                    />
                    <div
                      className={`inline-${type}-${h.title
                        .replace(" ", "-")
                        .replace(" ", "-")
                        .replace(" ", "-")} d-none`}
                    >
                      <Row>
                        <Col md={4}>
                          <Form.Select
                            aria-label="Default select example"
                            size="sm"
                          >
                            {dataSelect.map((index) => {
                              return (
                                <option value={index.value}>
                                  {index.label}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          {h.type == "Textfield" && (
                            <FormControl className="mt-1" size="sm" />
                          )}
                          {h.type == "MultipleSelect" && (
                            <Form.Select>
                              <option value="ok">Seleccione</option>
                              {/*mapMultiSelect(`https://localhost:5001/v1/api/${h.endpoint}`)*/}
                              <div
                                id={`${h.type}-${h.title
                                  .replace(" ", "-")
                                  .replace(" ", "-")
                                  .replace(" ", "-")}`}
                              ></div>
                            </Form.Select>
                          )}
                          {h.type == "Date" && (
                            <FormControl
                              type="date"
                              className="mt-1"
                              size="sm"
                            />
                          )}
                        </Col>
                      </Row>
                    </div>
                    <br />
                  </div>
                ))}
              </div>
            ))}
          </Form>
        </Container>
      </Card>
    </>
  );
}

export default SideFilter;
