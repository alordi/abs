import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { FormCheckbox } from "shards-react";


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
    };
  }
  handleChange(e, equip) {
    const newState = {};
    newState[equip] = !this.state[equip];
    this.setState({...this.state, ...newState });
  }

  render() {
    return (
      <div className="App">
        <p id="head"> Ab Workout Generator</p>
        <p id="equiphead"> Select your available equipment</p>
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
          <div id="rightchecks">
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
      </div>
    );
  }
}

export default App;
