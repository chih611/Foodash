import { Card, Col, Container, Row, Tab } from "react-bootstrap";
import { useEffect } from "react";

const Report = (props) => {
  useEffect(() => {}, []);

  return (
    <>
      <Tab.Pane
        {...props}
        className="g-4 bg-2nd-color mt-1 px-3 py-3 rounded-4"
      >
        <Row xs={1} md={2} className="justify-content-around">
          <Col lg={4}>
            <Card className="rounded-4 mb-4">
              <Card.Body>
                <Card.Title>Revenue</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="rounded-4">
              <Card.Body>
                <Card.Title>Revenue</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="rounded-4">
              <Card.Body>
                <Card.Title>Revenue</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="rounded-4">
              <Card.Body>
                <Card.Title>Revenue</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="rounded-4">
              <Card.Body>
                <Card.Title>Revenue</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Pane>
    </>
  );
};

export default Report;
