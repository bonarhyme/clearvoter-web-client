import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { voteInPollAction } from "../redux/actions/vote.actions";
import Loader from "./Loader";
import Message from "./Message";

const VoteInPoll = ({ pollInfoSingle, party, index }) => {
  const dispatch = useDispatch();
  const [currentComponent, setCurrentComponent] = useState(false);

  const {
    loading: loadingVoteInPoll,
    success: successVoteInPoll,
    pollInfo: pollInfoVoteInPoll,
    error: errorVoteInPoll,
  } = useSelector((store) => store.pollVoteIn);

  const voteInPollHandler = (slug, selectionId) => {
    dispatch(voteInPollAction(slug, selectionId));
  };

  return (
    <Card>
      <Card.Header style={{ textTransform: "capitalize" }}>
        <b>
          {index + 1}. {party?.name}
        </b>
      </Card.Header>
      <Card.Body>
        <Card.Text>{party?.description}</Card.Text>
        <Card.Text>
          Vote Count: <b>{party?.voteCount}</b>
        </Card.Text>
        {currentComponent && errorVoteInPoll && (
          <Message variant="danger">{errorVoteInPoll}</Message>
        )}
        {currentComponent && successVoteInPoll && (
          <Message variant="danger">{pollInfoVoteInPoll?.message}</Message>
        )}

        <Card.Text>
          {currentComponent && loadingVoteInPoll && (
            <Loader color="black" size="30" />
          )}
          <Button
            size="sm"
            variant="primary"
            type="button"
            disabled={loadingVoteInPoll}
            onClick={() => {
              setCurrentComponent(true);
              voteInPollHandler(pollInfoSingle?.data?.slug, party?._id);
            }}
          >
            Vote{" "}
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default VoteInPoll;
