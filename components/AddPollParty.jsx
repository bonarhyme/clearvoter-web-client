import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { ADD_POLL_PARTY_RESET } from "../redux/constants/vote.constants";
import { addPollPartyAction } from "../redux/actions/vote.actions";

const AddPollParty = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const {
    loading: loadingAddPollParty,
    success: successAddPollParty,
    pollInfo: voteInfoAddPollParty,
    error: errorAddPollParty,
  } = useSelector((store) => store.pollPartyAdd);

  const addPollPartyHandler = (e) => {
    e.preventDefault();
    const slug = window.location.href.split("polls/")[1];
    dispatch(addPollPartyAction(slug, name, description));
  };

  useEffect(() => {
    let timeOut;
    if (successAddPollParty) {
      setName("");
      setDescription("");
      timeOut = setTimeout(() => {
        dispatch({ type: ADD_POLL_PARTY_RESET });
      }, 5000);
    }

    return () => clearTimeout(timeOut);
  }, [successAddPollParty]);

  return (
    <Form
      className="border p-3"
      style={{ backgroundColor: "#eee" }}
      onSubmit={addPollPartyHandler}
    >
      {loadingAddPollParty && <Loader color="black" />}

      {errorAddPollParty && (
        <Message variant="danger">{errorAddPollParty}</Message>
      )}
      {successAddPollParty && (
        <Message variant="success">{voteInfoAddPollParty?.message}</Message>
      )}
      <h2 className="py-2">Add Poll Party</h2>
      <Form.Group controlId="formBasicName" className="my-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          required
          value={name}
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
      <Button size="lg" type="submit" className="my-3">
        Add Poll Party
      </Button>
    </Form>
  );
};

export default AddPollParty;
