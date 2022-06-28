import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Link from "next/link";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { registerAction, loginAction } from "../redux/actions/user.actions";
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
  const {
    loading: loadingLogin,
    success: successLogin,
    userInfo: userInfoLogin,
    error: errorLogin,
  } = useSelector((store) => store.loginUser);

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
    dispatch(loginAction(username, password));
  };

  useEffect(() => {
    let timeOut;
    if (successReg || userInfoReg?.message) {
      timeOut = setTimeout(() => {
        setRegisterScreen(false);
        setEmail("");
        setConfirmPassword("");
        setPassword("");
      }, 5000);
    }

    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successReg]);

  useEffect(() => {
    let timeOut;
    if (successLogin) {
      setUsername("");
      setPassword("");

      timeOut = setTimeout(() => {
        if (typeof window !== "undefined") {
          document.location.href = "/";
        }
      }, 3000);
    }
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successLogin]);

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
          {loadingLogin && <Loader color="black" />}
          {loadingReg && <Loader color="black" />}
          {registerScreen && errorReg && (
            <Message variant="danger">{errorReg}</Message>
          )}

          {!registerScreen && errorLogin && (
            <Message variant="danger">{errorLogin}</Message>
          )}
          {registerScreen && successReg && (
            <Message variant="success">{userInfoReg.message}</Message>
          )}
          {!registerScreen && successLogin && (
            <Message variant="success">{userInfoLogin.message}</Message>
          )}
          {registerScreen && (
            <Form.Group controlId="formBasicEmail" className="my-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="e.g name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
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
              value={username}
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
              value={password}
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
                  required
                  value={confirmPassword}
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
