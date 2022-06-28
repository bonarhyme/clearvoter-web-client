import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getSinglePollAction } from "../../redux/actions/vote.actions";

const Slug = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: loadingSingle,
    success: successSingle,
    pollInfo: pollInfoSingle,
    error: errorSingle,
  } = useSelector((store) => store.pollGetSingle);

  useEffect(() => {
    const slug = window.location.href.split("polls/")[1];
    dispatch(getSinglePollAction(slug));
  }, []);

  return (
    <div className="pb-5 pt-3">
      <Head>
        <title> </title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        {loadingSingle && <Loader color="black" />}
        {errorSingle && <Message variant="danger">{errorSingle}</Message>}
        {successSingle && (
          <Card>
            <Card.Header>
              <Card.Title>{pollInfoSingle?.data?.title}</Card.Title>
              <Card.Text>
                Creator: {pollInfoSingle?.data?.creator?.username} | Published:{" "}
                {new Date(pollInfoSingle?.data?.createdAt).toLocaleDateString()}{" "}
                | expires:{" "}
                {new Date(pollInfoSingle?.data?.expiration).toLocaleString()} |
                Status: {pollInfoSingle?.data?.endVoting ? "Closed" : "Active"}{" "}
                | Vpn:{" "}
                {pollInfoSingle?.data?.allowVpn ? "Allowed" : "Not allowed"}
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Card.Text>{pollInfoSingle?.data?.description}</Card.Text>
              <Card.Text>
                <Row>
                  {pollInfoSingle?.data?.parties.map((party, index) => {
                    return (
                      <Col xs={12} sm={6} md={4}>
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
                            <Card.Text>
                              <Button size="sm" variant="primary" type="button">
                                Vote
                              </Button>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Card.Text>
                Allowed Locations:
                {pollInfoSingle?.data?.targetLocations?.map((location) => (
                  <span
                    className="mx-1"
                    style={{ textTransform: "capitalize" }}
                    key={location}
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
