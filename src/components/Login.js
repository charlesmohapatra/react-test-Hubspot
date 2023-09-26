import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
// import { AnalyticsBrowser } from "@segment/analytics-next";
import "../App.css";
import { AnalyticsBrowser } from "@segment/analytics-next";
const analytics = AnalyticsBrowser.load({ writeKey: "l9phqG3NMhlxAP5YVRt0PV0i760n19qa" });
// export const analytics = AnalyticsBrowser.load({ writeKey: "6U8CbFjHTjqLqrrg37vueayqEIG9Fbds" });

const onPageEvent = () => {
  let logEvent = {};
  // process the logEvent object here (send to analytics provider, audit/inspect data)
  analytics.page("Experiment Event Logged", logEvent.params);
  console.log("[onPageEvent]", logEvent);
};

export default function Login(props) {
  const [enteredValue, setEnteredValue] = useState("");

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    props.onAddUserId(enteredValue);
  };


  useEffect(() => {
    async function fetchData() {
      try {
        let response = {
          traits: {
            blacklist: false,
            customerCreatedDate: "2021-05-20T11:30:59Z",
            customerType: "company",
            customerTypeAggregate: "B2B",
            firstName: "John",
            firstOrderDateTime: "2021-05-28T11:56:40.367Z",
            lastName: "Wick",
            lastOrderDateTime: "2022-03-16T13:01:31.934Z",
            locale: "nl",
            strategicIndustry: "CONTINENTAL",
            strategicSegment: "SMB",
            userCountryName: "NL",
            userIndustryTypeId: "Abbigliamento_ Accessori_ Gioielleria",
            userStrategicSegmentSplit: "SMB",
          },
        };
        console.log(response);

        // one identify call is required to associate userId to subsequent track calls made
        response.eventKey = "Test";
        response.userStrategicSegmentSplit = response.traits.userStrategicSegmentSplit
        onPageEvent(response);
      } catch (error) {
        console.log("Error in login page", error);
      }
    }
    fetchData();
  });
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Optimizely-Segment Demo</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Stack gap={3} className="col-md-5 mx-auto mt-5">
        <Form onSubmit={formSubmitHandler}>
          <h3 className="mb-3">Sign In</h3>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>UserId or AnonymousId</Form.Label>
            <Form.Control type="text" className="form-control" placeholder="Enter userId or anonymousId" onChange={inputChangeHandler} />
          </Form.Group>

          <Button type="submit" variant="primary">
            Log in
          </Button>
        </Form>
      </Stack>
    </div>
  );
}
