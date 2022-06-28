import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { ADD_POLL_LOCATION_RESET } from "../redux/constants/vote.constants";
import { addPollLocationAction } from "../redux/actions/vote.actions";

const AddPollLocation = () => {
  const dispatch = useDispatch();

  const [location, setLocation] = useState("");

  const {
    loading: loadingAddPollLocation,
    success: successAddPollLocation,
    pollInfo: voteInfoAddPollLocation,
    error: errorAddPollLocation,
  } = useSelector((store) => store.pollLocationAdd);

  const addPollLocationHandler = (e) => {
    e.preventDefault();
    const slug = window.location.href.split("polls/")[1];
    dispatch(addPollLocationAction(slug, location));
  };

  useEffect(() => {
    let timeOut;
    if (successAddPollLocation) {
      setLocation("");

      timeOut = setTimeout(() => {
        dispatch({ type: ADD_POLL_LOCATION_RESET });
      }, 5000);
    }

    return () => clearTimeout(timeOut);
  }, [successAddPollLocation]);

  return (
    <Form
      className="border p-3"
      style={{ backgroundColor: "#eee" }}
      onSubmit={addPollLocationHandler}
    >
      {loadingAddPollLocation && <Loader color="black" />}

      {errorAddPollLocation && (
        <Message variant="danger">{errorAddPollLocation}</Message>
      )}
      {successAddPollLocation && (
        <Message variant="success">{voteInfoAddPollLocation?.message}</Message>
      )}
      <h2 className="py-2">Add Poll Location</h2>
      <Form.Group controlId="formBasicLocation" className="my-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Location"
          onChange={(e) => setLocation(e.target.value)}
          required
          value={location}
        />
      </Form.Group>

      <Button size="lg" type="submit" className="my-3" variant="secondary">
        Add Poll Location
      </Button>
    </Form>
  );
};

export default AddPollLocation;
