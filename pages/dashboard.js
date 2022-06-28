import Head from "next/head";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreatePoll from "../components/CreatePoll";
import { FaTimes } from "react-icons/fa";
import AssociatedPolls from "../components/AssociatedPolls";

const Dashboard = () => {
  const [create, setCreate] = useState(false);

  return (
    <div className="pb-5 pt-3">
      <Head>
        <title>Clear Voter | Dashboard </title>
        <meta name="description" content="The transparent poling platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <header>
          <h1
            className="text-center py-4"
            style={{ textDecoration: "overline" }}
          >
            Dashboard
          </h1>
        </header>
        <main>
          {create ? (
            <Container className="mt-5" style={{ maxWidth: "30rem" }}>
              <FaTimes
                color="red"
                size={30}
                title="close form"
                onClick={() => setCreate(false)}
                style={{
                  float: "right",
                  cursor: "pointer",
                  margin: "0.5rem 0.3rem",
                }}
              />
              <CreatePoll />
            </Container>
          ) : (
            <Button size="lg" variant="primary" onClick={() => setCreate(true)}>
              Create Poll
            </Button>
          )}

          <Container className="py-5">
            <AssociatedPolls />
          </Container>
        </main>
      </Container>
    </div>
  );
};

export default Dashboard;
