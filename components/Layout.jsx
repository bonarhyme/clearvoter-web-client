import React, { useEffect } from "react";
import {
  Container,
  Image,
  Nav,
  Navbar,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const Layout = ({ children }) => {
  // const { userInfo } = useSelector((state) => state.userLogin);
  const userInfo = {
    username: "bonarhyme",
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        fixed="top"
        id="rem-pad"
        className="bg-black"
      >
        <Container>
          <Navbar.Brand>
            <Link href="/">
              <Image
                src="/logo.png"
                width={176.2}
                height={62.6}
                style={{
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/about" passHref>
                <Nav.Link>About</Nav.Link>
              </Link>
            </Nav>
            <Nav>
              {!userInfo ? (
                <Link href="/auth" passHref>
                  <Nav.Link>Login / Register</Nav.Link>
                </Link>
              ) : (
                <ButtonGroup>
                  <Link href="/dashboard" passHref>
                    <Nav.Link className="btn btn-secondary text-white">
                      Dashboard
                    </Nav.Link>
                  </Link>

                  <Button
                    size="sm"
                    // onClick={() => dispatch(logout())}
                    variant="danger"
                  >
                    Logout
                  </Button>
                </ButtonGroup>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Layout;
