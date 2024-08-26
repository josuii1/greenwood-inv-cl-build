import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "./components/logo.png";
import LogoutButton from "./components/LogoutButton";
const getToken = () => {
  return localStorage.getItem("token");
};

function NavigationBar() {
  const token = getToken();

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
           Greenwood Invoicing
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Invoices</Nav.Link>
              <Nav.Link href="/createinvoice">New Invoice</Nav.Link>
            </Nav>
            {token ? null : (
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            )}
            {token ? (
              <Nav>
                <LogoutButton />
              </Nav>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
