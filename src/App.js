import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { FormCheckbox } from "shards-react";
import { Button } from "shards-react";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      bar: false,
      plate: false,
      roller: false,
      hyperbench: false,
      medball: false,
      bigball: false,
      w3x3: true,
      w4x2: false,
      w5x2: false,
      w4min: false,
      w5min: false,
    };
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
    if (this.state["w5min"] && work !== "w5min") {
      newState["w5min"] = false;
    }
    this.setState({...this.state, ...newState });
  }

  render() {
    return (
      <div className="App">
        <p id="head"> Ab Workout Generator</p>
        <p class="checkhead"> Select your available equipment</p>
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
          </div>
          <div id="rightchecks" class="checks">
            <FormCheckbox
              checked={this.state.hyperbench}
              onChange={e => this.handleChange(e, "hyperbench")}
            >
            Hyperextension Bench
            </FormCheckbox>
            <FormCheckbox
              checked={this.state.medball}
              onChange={e => this.handleChange(e, "medball")}
            >
            Medicine Ball
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
        <p class="checkhead"> Select your workout format</p>
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
            checked={this.state.w5min}
            onChange={e => this.handleChangeWorkout(e, "w5min")}
          >
          5 min
          </FormCheckbox>
        </div>
        <div>
          <Button outline theme="warning" id="generate" size="lg">
            Generate Workout!
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
