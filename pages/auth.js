import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Link from "next/link";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register as registerAction } from "../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const dispatch = useDispatch();
  const [registerScreen, setRegisterScreen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const {
    loading: loadingReg,
    success: successReg,
    userInfo: userInfoReg,
    error: errorReg,
  } = useSelector((store) => store.registerUser);

  const handleRegister = (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setPasswordMessage("Passwords do not match.");
    } else {
      dispatch(registerAction(username, email, password));
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    // dispatch(login(username, password));
  };

  return (
    <div>
      <h1 className="text-center pt-2">
        {registerScreen ? "Register" : "Login"}
      </h1>
      <Container className="mt-5" style={{ maxWidth: "30rem" }}>
        <Form
          className="border p-3"
          style={{ backgroundColor: "#eee" }}
          onSubmit={registerScreen ? handleRegister : handleLogin}
        >
          {registerScreen && errorReg && (
            <Message variant="danger">{errorReg}</Message>
          )}

          {registerScreen && loadingReg && <Loader />}
          {registerScreen && (
            <Form.Group controlId="formBasicEmail" className="my-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="e.g name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          )}
          <Form.Group controlId="formBasicUsername" className="my-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g John123"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordMessage("");
              }}
              required
            />
          </Form.Group>

          {registerScreen && (
            <>
              {passwordMessage && (
                <Message variant="danger">{passwordMessage}</Message>
              )}
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordMessage("");
                  }}
                />
              </Form.Group>
            </>
          )}
          <Button size="lg" type="submit" className="my-3">
            {registerScreen ? "Register" : "Login"}
          </Button>

          <p>
            {registerScreen ? (
              <span>
                Already have an account?{" "}
                <Link href="/auth" passHref>
                  <a
                    onClick={() => setRegisterScreen(false)}
                    className="decorate"
                  >
                    Login
                  </a>
                </Link>{" "}
              </span>
            ) : (
              <>
                <span>
                  Don&apos;t have an account?{" "}
                  <Link href="/auth" passHref>
                    <a
                      onClick={() => setRegisterScreen(true)}
                      className="decorate"
                    >
                      Register
                    </a>
                  </Link>{" "}
                </span>
              </>
            )}
          </p>
        </Form>
      </Container>
    </div>
  );
};

export default Auth;
