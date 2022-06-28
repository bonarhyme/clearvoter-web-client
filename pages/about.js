import Head from "next/head";
import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <div className="pb-5 pt-3">
      <Head>
        <title>Clear Voter | About </title>
        <meta name="description" content="The transparent poling platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <header>
          <h1
            className="text-center py-4"
            style={{ textDecoration: "overline" }}
          >
            About Us
          </h1>
        </header>
        <main>
          <p>
            ClearVoter is an open-source electronic voting (e-voting) platform
            that allows individuals or brands create polls in order to get the
            choice, opinion, or will on a question; from a target audience or a
            group of persons.
          </p>
          <p>
            ClearVoter allows users or poll creators restrict the votes to a
            particular location or region.
          </p>
          <p>
            ClearVoters also allows users or poll creators decide the
            requirements for voting e.g valid emails, phone number or IP
            addresses.
          </p>
          <p>
            Clear Voter uses a number of APIs to detect if the voter's email,
            phone number or IP address is valid.
          </p>
          <p>
            Clear voter was created by{" "}
            <a
              href="https://bonarhyme.com"
              target="_blank"
              rel="noopener"
              className="decorate"
            >
              <strong>Onuorah Bonaventure Chukwudi</strong>
            </a>{" "}
            and contributions are welcome. To contribute visit{" "}
            <a
              href="https://github.com/bonarhyme/clearvoter-server"
              target="_blank"
              rel="noopener"
              className="decorate"
            >
              server source code
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/bonarhyme/clearvoter-web-client"
              target="_blank"
              rel="noopener"
              className="decorate"
            >
              web client source code
            </a>
          </p>
        </main>
      </Container>
    </div>
  );
};

export default About;
