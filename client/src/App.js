import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { FormCheckbox } from "shards-react";
import { Button } from "shards-react";
import { Container, Row, Col } from "shards-react";
import axios from 'axios'


function Workouts(props) {
  const begin = props.begin;
  const type = props.type;
  const works = props.works;
  if (begin) {
    if (type === "3x3"){ 
      return <Container className="bigcontainer">
                <Row>
                  <Col> {works[0]} </Col>
                </Row>
                <Row>
                  <Col> {works[1]} </Col>
                </Row>
                <Row>
                  <Col> {works[2]} </Col>
                </Row>
            </Container>
    }
    else if (type === "4x2"){ 
      return <Container className="bigcontainer">
                <Row>
                  <Col> {works[0]} </Col>
                </Row>
                <Row>
                  <Col> {works[1]} </Col>
                </Row>
                <Row>
                  <Col> {works[2]} </Col>  
                </Row>
                <Row>
                  <Col> {works[3]} </Col>
                </Row>
            </Container>
    }
    else if (type === "5x2"){ 
      return <Container className="bigcontainer"> 
                <Row>
                  <Col> {works[0]} </Col>
                </Row>
                <Row>
                  <Col> {works[1]} </Col>
                </Row>
                <Row>
                  <Col> {works[2]} </Col>
                </Row>
                <Row>
                  <Col> {works[3]} </Col>
                </Row>
                <Row>
                  <Col> {works[4]} </Col>
                </Row>
            </Container>
    }
    else if (type === "4min"){ 
      return <Container className="bigcontainer">
                <Row>
                  <Col> {works[0]} (20 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 10 sec rest </Col>
                </Row>
                <Row>
                  <Col> {works[1]} (20 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 10 sec rest </Col>
                </Row>
                <Row>
                  <Col> {works[2]} (20 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 10 sec rest </Col>
                </Row>
                <Row>
                  <Col> {works[3]} (20 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 10 sec rest </Col>
                </Row>
            </Container>
    }
    else if (type === "6min"){ 
      return <Container className="bigcontainer">
                <Row>
                  <Col> {works[0]} (30 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 15 sec rest </Col>
                </Row>
                <Row>
                  <Col> {works[1]} (30 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 15 sec rest </Col>
                </Row>
                <Row>
                  <Col> {works[2]} (30 sec) </Col>
                </Row>
                <Row className="smallcontainer">
                  <Col> 15 sec rest </Col>
                </Row>
                <Row>
                  <Col> {works[3]} (30 sec) </Col>
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
    this.callBackend = this.callBackend.bind(this);
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
      equips: ["na"],
      works: []
    };
  }

  async generateWorkouts() {
    var arr = ["na"];
    this.setState({started: true});
    
    if (this.state.bar) {
      arr.push("Bar");
    }
    if (this.state.plate) {
      arr.push("Plate");
    }
    if (this.state.roller) {
      arr.push("Ab Roller");
    }
    if (this.state.smedball) {
      arr.push("5 Ball");
    }
    if (this.state.lmedball) {
      arr.push("15 Ball");
    }
    if (this.state.bigball) {
      arr.push("Big Ball");
    }
    if (this.state.decline) {
      arr.push("Decline Bench");
    }
    if (this.state.hyperbench) {
      arr.push("HE Bench");
    }
    this.setState({equips: arr});

    if (this.state.w3x3){
      await this.callBackend("3x3", this.state.equips);
      this.setState({type: "3x3"});
    }
    else if (this.state.w4x2){
      await this.callBackend("4x2", this.state.equips);
      this.setState({type: "4x2"});
    }
    else if (this.state.w5x2){
      await this.callBackend("5x2", this.state.equips);
      this.setState({type: "5x2"});
    }
    else if (this.state.w4min){
      await this.callBackend("min", this.state.equips);
      this.setState({type: "4min"});
    }
    else if (this.state.w6min){
      await this.callBackend("min", this.state.equips);
      this.setState({type: "6min"});
    }
    else {
      this.setState({type: "none"});
    }
  }

  async callBackend(format, equips){
    await axios
          .get('/' + format, {
            params: {
              equips: equips
            }
          })
          .then(response => {
            this.setState({works: response.data});
          })
  }

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
          6 min
          </FormCheckbox>
        </div>
        <div>
          <Button outline theme="warning" id="generate" size="lg" onClick={this.generateWorkouts} >
            Generate Workout!
          </Button>
        </div>
        <Workouts begin={this.state.started} type={this.state.type} works={this.state.works}/>
      </div>
    );
  }
}

export default App;
