import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Card, CardGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getAllPollsAction } from "../redux/actions/vote.actions";
import styles from "../styles/Home.module.css";

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
        <CardGroup>
          {successAll &&
            pollInfoAll?.data.length > 0 &&
            pollInfoAll?.data.map((poll) => {
              const {
                creator,
                title,
                description,
                expiration,
                slug,
                updatedAt,
              } = poll;
              return (
                <Card>
                  <Card.Header>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                      Creator: {creator?.username} | Published:{" "}
                      {new Date(updatedAt).toLocaleDateString()} | expires:{" "}
                      {new Date(expiration).toLocaleString()}
                    </Card.Text>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sapiente rem omnis quo sit nam odio tenetur ea accusantium nemo, distinctio sint aliquam reiciendis beatae debitis, earum eos mollitia pariatur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Id sapiente rem omnis quo sit nam odio tenetur ea accusantium nemo, distinctio sint aliquam reiciendis beatae debitis, earum eos mollitia pariatur!".slice(
                        0,
                        255
                      )}
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
        </CardGroup>
      </Container>
    </div>
  );
}
