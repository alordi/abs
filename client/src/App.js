import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { FormCheckbox } from "shards-react";
import { Button } from "shards-react";
import { Container, Row, Col } from "shards-react";

function Workouts(props) {
  const begin = props.begin;
  const type = props.type;
  if (begin) {
    if (type === "3x3"){ 
      return <Container className="bigcontainer">
                <Row>
                  <Col> 3x3 1 </Col>
                </Row>
                <Row>
                  <Col> 3x3 2 </Col>
                </Row>
                <Row>
                  <Col> 3x3 3 </Col>
                </Row>
            </Container>
    }
    else if (type === "4x2"){ 
      return <Container className="bigcontainer">
                <Row>
                  <Col> 4x2 1 </Col>
                </Row>
                <Row>
                  <Col> 4x2 2 </Col>
                </Row>
                <Row>
                  <Col> 4x2 3 </Col>  
                </Row>
                <Row>
                  <Col> 4x2 4 </Col>
                </Row>
            </Container>
    }
    else if (type === "5x2"){ 
      return <Container className="bigcontainer"> 
                <Row>
                  <Col> 5x2 1 </Col>
                </Row>
                <Row>
                  <Col> 5x2 2 </Col>
                </Row>
                <Row>
                  <Col> 5x2 3 </Col>
                </Row>
                <Row>
                  <Col> 5x2 4 </Col>
                </Row>
                <Row>
                  <Col> 5x2 5 </Col>
                </Row>
            </Container>
    }
    else if (type === "4min"){ 
      return <Container className="bigcontainer">
                <Row>
                  <Col> 4min 1 (20 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 10 sec rest </Col>
                </Row>
                <Row>
                  <Col> 4min 2 (20 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 10 sec rest </Col>
                </Row>
                <Row>
                  <Col> 4min 3 (20 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 10 sec rest </Col>
                </Row>
                <Row>
                  <Col> 4min 4 (20 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 10 sec rest </Col>
                </Row>
            </Container>
    }
    else if (type === "6min"){ 
      return <Container className="bigcontainer">
                <Row>
                  <Col> 6min 1 (30 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 15 sec rest </Col>
                </Row>
                <Row>
                  <Col> 6min 2 (30 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 15 sec rest </Col>
                </Row>
                <Row>
                  <Col> 6min 3 (30 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 15 sec rest </Col>
                </Row>
                <Row>
                  <Col> 6min 4 (30 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 15 sec rest </Col>
                </Row>
            </Container>
    }
    else {
      return <p>Please select a workout format</p>
    }
  }
  return <div></div>;
}

class App extends React.Component {
  state = {
    data: null
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.generateWorkouts = this.generateWorkouts.bind(this);
    this.state = {
      bar: false,
      plate: false,
      roller: false,
      decline: false,
      hyperbench: false,
      smedball: false,
      lmedball: false,
      bigball: false,
      w3x3: true,
      w4x2: false,
      w5x2: false,
      w4min: false,
      w6min: false,
      started: false,
      type: "3x3",
    };
  }

  generateWorkouts() {
    this.setState({started: true});
    if (this.state.w3x3){
      this.setState({type: "3x3"});
    }
    else if (this.state.w4x2){
      this.setState({type: "4x2"});
    }
    else if (this.state.w5x2){
      this.setState({type: "5x2"});
    }
    else if (this.state.w4min){
      this.setState({type: "4min"});
    }
    else if (this.state.w6min){
      this.setState({type: "6min"});
    }
    else {
      this.setState({type: "none"});
    }
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    console.log(response);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  handleChange(e, equip) {
    const newState = {};
    newState[equip] = !this.state[equip];
    this.setState({...this.state, ...newState });
  }

  handleChangeWorkout(e, work) {
    const newState = {};
    newState[work] = !this.state[work];
    if (this.state["w3x3"] && work !== "w3x3") {
      newState["w3x3"] = false;
    }
    if (this.state["w4x2"] && work !== "w4x2") {
      newState["w4x2"] = false;
    }
    if (this.state["w5x2"] && work !== "w5x2") {
      newState["w5x2"] = false;
    }
    if (this.state["w4min"] && work !== "w4min") {
      newState["w4min"] = false;
    }
    if (this.state["w6min"] && work !== "w6min") {
      newState["w6min"] = false;
    }
    this.setState({...this.state, ...newState });
  }

  render() {
    return (
      <div className="App">
        <p id="head"> Ab Workout Generator</p>
        <p className="checkhead"> Select your available equipment</p>
        <div id="main">
          <div id="leftchecks">
            <FormCheckbox
              checked={this.state.bar}
              onChange={e => this.handleChange(e, "bar")}
            >
            Pull Up Bar
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.plate}
              onChange={e => this.handleChange(e, "plate")}
            >
            45 LB Plate
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.roller}
              onChange={e => this.handleChange(e, "roller")}
            >
            Ab Roller
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.decline}
              onChange={e => this.handleChange(e, "decline")}
            >
            Decline Bench
            </FormCheckbox>
          </div>
          <div id="rightchecks" className="checks">
            <FormCheckbox
              checked={this.state.hyperbench}
              onChange={e => this.handleChange(e, "hyperbench")}
            >
            Hyperextension Bench
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.smedball}
              onChange={e => this.handleChange(e, "smedball")}
            >
            ~5 LB Medicine Ball
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.lmedball}
              onChange={e => this.handleChange(e, "lmedball")}
            >
            ~15 LB Medicine Ball
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.bigball}
              onChange={e => this.handleChange(e, "bigball")}
            >
            Big Balance Ball
            </FormCheckbox>
          </div>
        </div>
        <div id="workouts">
        <p className="checkhead"> Select your workout format</p>
          <FormCheckbox
            inline
            checked={this.state.w3x3}
            onChange={e => this.handleChangeWorkout(e, "w3x3")}
          >
          3 x 3
          </FormCheckbox>
          <FormCheckbox
            inline
            checked={this.state.w4x2}
            onChange={e => this.handleChangeWorkout(e, "w4x2")}
          >
          4 x 2
          </FormCheckbox>
          <FormCheckbox
            inline
            checked={this.state.w5x2}
            onChange={e => this.handleChangeWorkout(e, "w5x2")}
          >
          5 x 2
          </FormCheckbox>
          <FormCheckbox
            inline
            checked={this.state.w4min}
            onChange={e => this.handleChangeWorkout(e, "w4min")}
          >
          4 min
          </FormCheckbox>
          <FormCheckbox
            inline
            checked={this.state.w6min}
            onChange={e => this.handleChangeWorkout(e, "w6min")}
          >
          5 min
          </FormCheckbox>
        </div>
        <div>
          <Button outline theme="warning" id="generate" size="lg" onClick={this.generateWorkouts} >
            Generate Workout!
          </Button>
        </div>
        <Workouts begin={this.state.started} type={this.state.type}/>
      </div>
    );
  }
}

export default App;
