import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { createPollAction } from "../redux/actions/vote.actions";
import Loader from "./Loader";
import Message from "./Message";
import { CREATE_POLL_RESET } from "../redux/constants/vote.constants";

const CreatePoll = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiration, setExpiration] = useState("");
  const [allowVpn, setAllowVpn] = useState(true);

  const {
    loading: loadingCreatePoll,
    success: successCreatePoll,
    pollInfo: voteInfoCreatePoll,
    error: errorCreatePoll,
  } = useSelector((store) => store.pollCreate);

  const createFormHandler = (e) => {
    e.preventDefault();
    dispatch(createPollAction(title, description, expiration, allowVpn));
  };

  useEffect(() => {
    let timeOut;
    if (successCreatePoll) {
      setTitle("");
      setDescription("");
      setAllowVpn(true);
      setExpiration("");

      timeOut = setTimeout(() => {
        dispatch({ type: CREATE_POLL_RESET });
      }, 5000);
    }

    return () => clearTimeout(timeOut);
  }, [successCreatePoll]);

  return (
    <Form
      className="border p-3"
      style={{ backgroundColor: "#eee" }}
      onSubmit={createFormHandler}
    >
      {loadingCreatePoll && <Loader color="black" />}

      {errorCreatePoll && <Message variant="danger">{errorCreatePoll}</Message>}
      {successCreatePoll && (
        <p>
          <Link href={`/dashboard/#${voteInfoCreatePoll?.data?.slug}`} passHref>
            <a className="decorate">Click here</a>
          </Link>{" "}
          to publish your poll
        </p>
      )}
      {successCreatePoll && (
        <Message variant="success">{voteInfoCreatePoll?.message}</Message>
      )}
      <h2 className="py-2">Create Poll</h2>
      <Form.Group controlId="formBasicTitle" className="my-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
          required
          value={title}
        />
      </Form.Group>
      <Form.Group controlId="formBasicDescription" className="my-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          placeholder="Enter Description"
          onChange={(e) => setDescription(e.target.value)}
          required
          value={description}
          style={{ maxHeight: "25rem" }}
        />
      </Form.Group>
      <Form.Group controlId="formBasicExpiration" className="my-3">
        <Form.Label>Expiration</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter Expiration"
          onChange={(e) => setExpiration(e.target.value)}
          required
          value={expiration}
        />
      </Form.Group>
      <Form.Group controlId="formBasicAllowVpn" className="my-3">
        <Form.Check
          type="radio"
          required
          label="Allow"
          onChange={() => setAllowVpn(true)}
          checked={allowVpn}
        />
        <Form.Check
          type="radio"
          required
          label="Not Allowed"
          onChange={() => setAllowVpn(false)}
          checked={!allowVpn}
        />
      </Form.Group>
      <Button size="lg" type="submit" className="my-3">
        Publish
      </Button>
    </Form>
  );
};

export default CreatePoll;
