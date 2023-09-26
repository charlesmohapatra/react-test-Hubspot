import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Badge } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Buffer } from "buffer";
import axios from "axios";
import "../App.css";
import { createInstance, OptimizelyFeature, OptimizelyProvider, withOptimizely, OptimizelyExperiment, OptimizelyVariation, enums } from "@optimizely/react-sdk";
import { AnalyticsBrowser } from "@segment/analytics-next";
import { useConfig } from "statsig-react";
import { Statsig, StatsigProvider } from "statsig-react";
// initialize Segment Analytics
const analytics = AnalyticsBrowser.load({ writeKey: "l9phqG3NMhlxAP5YVRt0PV0i760n19qa" });

const optimizely = createInstance({
  sdkKey: "Lgk3PUSJP9zSH8P4tgDQN", // pass in Optimizely SDK key here
  datafileOptions: {
    autoUpdate: true,
  },
  // userProfileService,
});

const onActivate = (experiment) => {
  // Send data to analytics provider here (example: Segment)

  analytics.track("Experiment Activated", {
    experiment: experiment.experiment,
    attributes: {
      strategicIndustry: experiment.attributes.strategicIndustry,
      userStrategicSegmentSplit: experiment.attributes.userStrategicSegmentSplit,
    },
    variation: experiment.variation,
  });
  console.log("[onActivate]", experiment);
};

// optimizely.notificationCenter.addNotificationListener(enums.NOTIFICATION_TYPES.ACTIVATE, onActivate);

const onDecision = (decisionType) => {
  analytics.track("Experiment Decided", {
    decisionInfo: decisionType.decisionInfo,
    attributes: {
      strategicIndustry: decisionType.attributes.strategicIndustry,
      userStrategicSegmentSplit: decisionType.attributes.userStrategicSegmentSplit,
    },
    type: decisionType.type,
  });
  console.log("[onDecision]", decisionType);
};

// optimizely.notificationCenter.addNotificationListener(enums.NOTIFICATION_TYPES.DECISION, onDecision);

const onPageEvent = (logEvent) => {
  // process the logEvent object here (send to analytics provider, audit/inspect data)
  analytics.page("Experiment Event Logged", logEvent.params);
  console.log("[onPageEvent]", logEvent);
};

// optimizely.notificationCenter.addNotificationListener(enums.NOTIFICATION_TYPES.LOG_EVENT, onLogEvent);

const onTrack = (event) => {
  // process the event here (send to analytics provider, audit/inspect data)
  analytics.track("Experiment Clicked", {
    eventKey: event.eventKey,
    attributes: {
      strategicIndustry: "SMB",
      userStrategicSegmentSplit: "Type",
    },
  });
  console.log("[onTrack]", event);
};

// optimizely.notificationCenter.addNotificationListener(enums.NOTIFICATION_TYPES.TRACK, onTrack);

const eventTags = {
  category: "Business Cards",
  purchasePrice: 123.17,
  revenue: 12317, // reserved "revenue" tag. no floating point allowed
  value: 5, // reserved "value" tag
};

const footerEventTags = {
  category: "Business Cards",
  purchasePrice: 56.36,
  revenue: 5636, // reserved "revenue" tag. no floating point allowed
  value: 2, // reserved "value" tag
};

// just an additional thing to display. ignore
// class ExperimentCard extends React.Component {
//   onClick = () => {
//     const { optimizely } = this.props;
//     // after we’ve confirmed purchase completed
//     optimizely.track("test-event-entered");
//   };

//   render() {
//     return (
//       <OptimizelyExperiment experiment="offer-feature-testing">
//         <OptimizelyVariation variation="variation_1">
//           <Card bg="secondary">
//             <Card.Header>Variation 1</Card.Header>
//             <Card.Body>
//               <Card.Title>This is Variation 1</Card.Title>
//               <Card.Text>Congratulations! You are part of Food Industry.</Card.Text>
//               <Card.Text>You got a promo code for variation 1.</Card.Text>
//               <Button variant="primary" onClick={this.onClick}>
//                 Purchase Variation 1
//               </Button>
//             </Card.Body>
//           </Card>
//         </OptimizelyVariation>
//         <OptimizelyVariation variation="variation_2">
//           <Card bg="dark">
//             <Card.Header>Variation 2</Card.Header>
//             <Card.Body>
//               <Card.Title>This is Variation 2</Card.Title>
//               <Card.Text>Congratulations! You are part of Food Industry.</Card.Text>
//               <Card.Text>You got a promo code for variation 2.</Card.Text>
//               <Button variant="primary" onClick={this.onClick}>
//                 Purchase Variation 2
//               </Button>
//             </Card.Body>
//           </Card>
//         </OptimizelyVariation>
//         <OptimizelyVariation default>
//           <Card text="dark">
//             <Card.Header>Default</Card.Header>
//             <Card.Body>
//               <Card.Title>This is Default Variation</Card.Title>
//               <Card.Text>Sorry, you are a common user. Not part of any industry.</Card.Text>
//             </Card.Body>
//           </Card>
//         </OptimizelyVariation>
//       </OptimizelyExperiment>
//     );
//   }
// }

// const WrappedExperimentCard = withOptimizely(ExperimentCard);

export default function Dashboard(props) {
  let [userProfile, setUserProfile] = useState("");
  let { userId } = props;
  const { config, isLoading } = useConfig("dashboard-page");
  // var variationKey = optimizelyClient.activate(
  //   "test-exp-feature-test",
  //   "user-99996"
  // );
  // console.log(variationKey);

  useEffect(() => {
    async function fetchData() {
      try {
        // fetch user attributes from Segment
        // let response = await fetch(`https://28gvj3sukd.execute-api.eu-west-1.amazonaws.com/v1/traits?spaceId=spa_kTLro13ENQC52xbkDtAQJU&userId=${userId}&businessUnit=pixart`, {
        //   method: "GET",
        //   mode: "cors",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "x-api-key": "SOME_API_KEY", // I can provide this later, if required.
        //   },
        // });

        // response = await response.json();

        // change these traits for each user, in order to display different variations
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

        setUserProfile(response.traits);
        optimizely.setUser({
          id: userId,
          attributes: response.traits,
        });

        // one identify call is required to associate userId to subsequent track calls made
        analytics.identify(userId, {
          email: "sarthaktest123456@gmail.com",
          userId: userId
        });
        response.eventKey = "Test";
        response.userStrategicSegmentSplit = response.traits.userStrategicSegmentSplit
        onTrack(response);
        onPageEvent(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [userId]);

  const onClick = () => {
    // after we’ve confirmed variation is clicked
    optimizely.track("AB Testing Experiment Clicked", userId, userProfile, eventTags);
  };

  const onFooterClick = () => {
    // after we’ve confirmed variation is clicked
    optimizely.track("test-event-entered", userId, userProfile, footerEventTags);
  };

  return Object.keys(userProfile).length === 0 ? (
    <header className="App-header">
      <Spinner animation="border" variant="warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </header>
  ) : (
    <>
    <Navbar bg={config.get("background", "secondary")} variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <div>{config.get("topic", "Customer Data Platform")}</div>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link onClick={onClick} href="#home">
            <div>{config.get("type", "General-test")}</div>
          </Nav.Link>
          <Nav.Link onClick={onClick} href="#features">
            <div>{config.get("work", "Customer Data Platform")}</div>
          </Nav.Link>
          <Nav.Link onClick={onClick} href="#businessunit">
            <div>{config.get("businessUnit", "Cimpress")}</div>
          </Nav.Link>
          <Nav.Link onClick={onClick} href="#environment">
            <div>{config.get("environment", "development")}</div>
          </Nav.Link>
          <Button variant="secondary" as={Link} to="/">
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
    <Container>
      <center>
        <div className="box">UserID of user is {userId}</div>
      </center>
    </Container>
    <Container>
      <footer className="App-footer" onClick={onFooterClick}>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="col fs-5">
              <Badge pill bg="success">
                © 2023 Customer Data Platform
              </Badge>
            </div>
            <div className="col fs-5">
              <Badge pill bg="info">
                Variation 1 User
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </Container>
  </>
  );
}
