import React, { useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import AddPollParty from "./AddPollParty";

const EditPoll = () => {
  const [showPartyForm, setShowPartyForm] = useState(true);
  const [showLocationForm, setShowLocationForm] = useState(true);

  return (
    <section className="py-5">
      <Row>
        <Col xs={12} md={6} style={{ position: "relative" }} className="mb-3">
          {showPartyForm ? (
            <Card className="p-2">
              <FaTimes
                size={30}
                color="red"
                onClick={() => setShowPartyForm(false)}
                style={{
                  cursor: "pointer",
                  margin: "0.5rem",
                  position: "absolute",
                  right: "0",
                }}
                title="close party form"
              />
              <AddPollParty />
            </Card>
          ) : (
            <Button
              size="lg"
              variant="primary"
              onClick={() => setShowPartyForm(true)}
            >
              Add Poll Party
            </Button>
          )}
        </Col>
        <Col xs={12} md={6} style={{ position: "relative" }}>
          {showLocationForm ? (
            <Card className="p-2">
              <FaTimes
                size={30}
                color="red"
                onClick={() => setShowLocationForm(false)}
                style={{
                  cursor: "pointer",
                  margin: "0.5rem",
                  position: "absolute",
                  right: "0",
                }}
                title="close location form"
              />
              <div>The other one</div>
            </Card>
          ) : (
            <Button size="lg" variant="secondary">
              Add Target Location
            </Button>
          )}
        </Col>
      </Row>
    </section>
  );
};

export default EditPoll;
