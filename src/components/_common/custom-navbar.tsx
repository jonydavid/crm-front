
import Link from 'next/link'
import { Button, Container, Form, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { BsBank2 } from "react-icons/bs";
import SearchGlobal from './searchGlobal'

function CustomNavbar() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/"><BsBank2 size="30px"/>    CRM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="contacts">Contactos</Nav.Link>
              <Nav.Link href="company">Empresas</Nav.Link>
              <Nav.Link  href="case">
                Casos
                {/* <Link href="case">Casos</Link> */}
              </Nav.Link>
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>

            {/* <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Search"
              />
              
              

              <Button variant="outline-success">Buscar</Button>
            </Form> */}

            <SearchGlobal />

            <Nav>
              <Nav.Link href="#deets">icon1</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                icon2
              </Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
  
  export default CustomNavbar