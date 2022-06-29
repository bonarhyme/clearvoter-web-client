import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { getAllPollsAction } from "../redux/actions/vote.actions";

export default function Home() {
  const dispatch = useDispatch();

  const {
    loading: loadingAll,
    success: successAll,
    pollInfo: pollInfoAll,
    error: errorAll,
  } = useSelector((store) => store.pollsGetAll);

  useEffect(() => {
    dispatch(getAllPollsAction());
  }, []);

  return (
    <div className="pb-5 pt-3">
      <Head>
        <title>Clear Voter | Home </title>
        <meta name="description" content="The transparent poling platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <header>
          <h1
            className="text-center py-4"
            style={{ textDecoration: "overline" }}
          >
            All polls
          </h1>
        </header>
        <main>
          <>
            {loadingAll && <Loader color="black" />}
            {errorAll && <Message variant="danger">{errorAll}</Message>}
            {successAll &&
              pollInfoAll?.data.length > 0 &&
              pollInfoAll?.data.map((poll) => {
                const {
                  creator,
                  title,
                  description,
                  expiration,
                  slug,
                  createdAt,
                  _id,
                } = poll;
                return (
                  <Card key={_id} className="mb-5">
                    <Card.Header>
                      <Card.Title>{title}</Card.Title>
                      <Card.Text>
                        <small>
                          Creator: {creator?.username} | Published:{" "}
                          {new Date(createdAt).toLocaleDateString()} | expires:{" "}
                          {new Date(expiration).toLocaleString()}
                        </small>
                      </Card.Text>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {description.slice(0, 255)}
                        ...
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Link href={`polls/${slug}`} passHref>
                        <Card.Link className="decorate">View more</Card.Link>
                      </Link>
                    </Card.Footer>
                  </Card>
                );
              })}
          </>
        </main>
      </Container>
    </div>
  );
}
