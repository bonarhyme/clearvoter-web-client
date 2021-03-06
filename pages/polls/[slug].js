import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaInfoCircle } from "react-icons/fa";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  endPollAction,
  getSinglePollAction,
  publishPollAction,
} from "../../redux/actions/vote.actions";

import VoteInPoll from "../../components/VoteInPoll";
import EditPoll from "../../components/EditPoll";

const Slug = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({});
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [creator, setCreator] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [expiration, setExpiration] = useState("");
  const [endVoting, setEndVoting] = useState(null);
  const [allowVpn, setAllowVpn] = useState(null);
  const [draft, setDraft] = useState(null);
  const [description, setDescription] = useState(null);
  const [parties, setParties] = useState(null);
  const [targetLocations, setTargetLocations] = useState(null);

  const {
    loading: loadingSingle,
    success: successSingle,
    pollInfo: pollInfoSingle,
    error: errorSingle,
  } = useSelector((store) => store.pollGetSingle);

  const { userInfo: userInfoReducer } = useSelector((state) => state.loginUser);

  const {
    loading: loadingPublishPoll,
    success: successPublishPoll,
    pollInfo: pollInfoPublishPoll,
    error: errorPublishPoll,
  } = useSelector((store) => store.pollPublish);

  const {
    loading: loadingEndPoll,
    success: successEndPoll,
    pollInfo: pollInfoEndPoll,
    error: errorEndPoll,
  } = useSelector((store) => store.pollEnd);

  const { success: successAddPollParty } = useSelector(
    (store) => store.pollPartyAdd
  );
  const { success: successAddPollLocation } = useSelector(
    (store) => store.pollLocationAdd
  );

  useEffect(() => {
    if (successSingle) {
      const {
        title,
        creator,
        createdAt,
        expiration,
        endVoting,
        allowVpn,
        draft,
        description,
        parties,
        targetLocations,
        slug,
      } = pollInfoSingle?.data;

      setAllowVpn(allowVpn);
      setCreatedAt(createdAt);
      setCreator(creator);
      setDescription(description);
      setDraft(draft);
      setEndVoting(endVoting);
      setExpiration(expiration);
      setParties(parties);
      setTargetLocations(targetLocations);
      setTitle(title);
      setSlug(slug);
    }
  }, [successSingle]);

  useEffect(() => {
    const slug = window.location.href.split("polls/")[1];
    dispatch(getSinglePollAction(slug));
  }, [
    successPublishPoll,
    successEndPoll,
    successAddPollParty,
    successAddPollLocation,
  ]);

  useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfoReducer);
    }
  }, []);

  const pollPublishHandler = () => {
    if (confirm("Do you really want to publish this poll?")) {
      dispatch(publishPollAction(slug));
    }
  };
  const pollEndHandler = () => {
    if (confirm("Do you really want to end this poll?")) {
      dispatch(endPollAction(slug));
    }
  };

  return (
    <div className="pb-5 pt-3">
      <Head>
        <title>{title}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        {userInfo?.username === creator?.username && <EditPoll />}
        {loadingSingle && <Loader color="black" />}

        {errorSingle && <Message variant="danger">{errorSingle}</Message>}
        {successSingle && (
          <Card>
            <Card.Header>
              <Card.Title>{title}</Card.Title>
              <Card.Text>
                Creator: {creator?.username} | Published:{" "}
                {new Date(createdAt).toLocaleDateString()} | expires:{" "}
                {new Date(expiration).toLocaleString()} | Status:{" "}
                {endVoting ? "Closed" : "Active"} | Vpn:{" "}
                {allowVpn ? "Allowed" : "Not allowed"}
              </Card.Text>
              {loadingPublishPoll && <Loader color="black" />}
              {errorPublishPoll && (
                <Message variant="danger">{errorPublishPoll}</Message>
              )}
              {successPublishPoll && (
                <Message variant="success">
                  {pollInfoPublishPoll?.message}
                </Message>
              )}
              <Card.Text>
                {parties?.length < 2 && (
                  <Message variant="info">
                    <FaInfoCircle size={30} /> Please Add atleast two poll
                    parties in order to publish poll
                  </Message>
                )}
                {parties?.length >= 2 &&
                  userInfo?.username === creator?.username &&
                  draft && (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={pollPublishHandler}
                      className="mx-3"
                    >
                      Publish
                    </Button>
                  )}
                {loadingEndPoll && <Loader color="black" />}
                {errorEndPoll && (
                  <Message variant="danger">{errorEndPoll}</Message>
                )}
                {successEndPoll && (
                  <Message variant="success">
                    {pollInfoEndPoll?.message}
                  </Message>
                )}
                {parties?.length >= 2 &&
                  userInfo?.username === creator?.username &&
                  !endVoting && (
                    <Button size="sm" variant="danger" onClick={pollEndHandler}>
                      End poll
                    </Button>
                  )}
              </Card.Text>
              <Card.Text>
                Poll Link:{" "}
                <b>
                  {" "}
                  {!draft &&
                    typeof window !== "undefined" &&
                    window.location.href}
                </b>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Card.Text>{description}</Card.Text>
              <>
                <Row>
                  {parties?.map((party, index) => {
                    return (
                      <Col xs={12} sm={6} md={4} key={index}>
                        <VoteInPoll
                          party={party}
                          pollInfoSingle={pollInfoSingle}
                          index={index}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </>
            </Card.Body>
            <Card.Footer>
              <Card.Text>
                Allowed Locations:
                {targetLocations?.length > 0 &&
                  targetLocations?.map((location, index) => (
                    <span
                      className="mx-1"
                      style={{ textTransform: "capitalize" }}
                      key={index}
                    >
                      {location?.location},
                    </span>
                  ))}
              </Card.Text>
            </Card.Footer>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default Slug;
