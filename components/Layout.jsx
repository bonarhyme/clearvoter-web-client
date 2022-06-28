import React, { useEffect, useState } from "react";
import {
  Container,
  Image,
  Nav,
  Navbar,
  Button,
  ButtonGroup,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { logout } from "../redux/actions/user.actions";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const { userInfo: userInfoReducer } = useSelector((state) => state.loginUser);

  useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfoReducer);
    }
  }, []);

  return (
    <>
      <Container>
        <Navbar
          bg="dark"
          variant="dark"
          expand="lg"
          collapseOnSelect
          fixed="top"
          className="bg-black px-5"
        >
          <Navbar.Brand>
            <Link href="/" passHref>
              <a>
                <Image
                  src="/logo.png"
                  width={176.2}
                  height={62.6}
                  style={{
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                />
              </a>
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
              {!userInfo && (
                <Link href="/auth" passHref>
                  <Nav.Link>Login / Register</Nav.Link>
                </Link>
              )}

              {userInfo && (
                <ButtonGroup style={{ maxWidth: "20rem" }}>
                  <Link href="/dashboard" passHref>
                    <Nav.Link className="btn btn-secondary text-white">
                      Dashboard - {userInfo?.username}
                    </Nav.Link>
                  </Link>

                  <Button
                    size="sm"
                    onClick={() => dispatch(logout())}
                    variant="danger"
                  >
                    Logout
                  </Button>
                </ButtonGroup>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <div className="mt-5 pt-5" style={{ minHeight: "calc(100vh - 10rem)" }}>
        {children}
      </div>
      <footer style={{ backgroundColor: "#ddd" }} className="py-5">
        <Container>
          <p>
            This <strong>open-source</strong> project was started by{" "}
            <a href="https://bonarhyme.com" target="_blank" rel="noopener">
              <strong>Onuorah Bonaventure Chukwudi</strong>
            </a>{" "}
            in reponse to the{" "}
            <a
              href="https://www.linode.com/?utm_source=hashnode&utm_medium=article&utm_campaign=hackathon_announcement"
              className="decorate"
            >
              Linode
            </a>{" "}
            and{" "}
            <a href="https://hashnode.com/" className="decorate">
              Hashnode
            </a>{" "}
            June 2022 Hackathon. Contributions are welcome. To contribute visit{" "}
            <a
              href="https://github.com/bonarhyme/clearvoter-server"
              target="_blank"
              rel="noopener"
              className="decorate"
            >
              server source code
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/bonarhyme/clearvoter-web-client"
              target="_blank"
              rel="noopener"
              className="decorate"
            >
              web client source code
            </a>
          </p>
          <p className="text-center">
            Copyright &copy; ClearVoter 2022
            {new Date().getFullYear() !== 2022
              ? "-" + new Date().getFullYear()
              : ""}
          </p>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
