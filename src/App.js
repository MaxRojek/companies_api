import React from "react";
import axios from "axios";
import "./App.css";

import SearchApp from "./Table/Table.js";

class App extends React.Component {
  state = {
    dane: []
  };

  componentDidMount() {
    axios.get("https://recruitment.hal.skygate.io/companies").then(res => {
      res.data.sort((a, b) => (a.id > b.id) ? 1 : -1)  
    this.setState({ dane: res.data });
      
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <SearchApp data={this.state.dane} />
        </div>
      </div>
    );
  }
}

export default App;
