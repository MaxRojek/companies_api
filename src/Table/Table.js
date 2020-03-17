import axios from "axios";
import "./Table.css";
import React from "react";
import ModalOverlay from "./Details";
import { Button } from "reactstrap";
// SearchApp component
class SearchApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
     
    };
  }
  handleChange(event) {
    
    let searchValue = event.target.value;

    
    this.setState({ search: searchValue });
  }
  render() {
    
    let name = this.props.data,
      searchString = this.state.search.trim().toLowerCase();

    if (searchString.length > 0) {
      
      name = name.filter(e => e.name.toLowerCase().match(searchString));
    }
   
    return (
      <div>
        <UserInput update={e => this.handleChange(e)} />
        <Table data={name} />
      </div>
    );
  }
}


class UserInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <input className="form-control mb-2" placeholder="Search Company" onChange={e => this.props.update(e)} />
      </div>
    );
  }
}


class Income extends React.Component {
  state = {
    money: "",
    profits: []
  };

  componentDidMount() {
    const url = "https://recruitment.hal.skygate.io/incomes/";

    let adress = url.concat(this.props.id);

    axios.get(adress).then(res => {
      this.setState({ profits: res.data });
    
      let coins = 0;
      
      
        for (let index = 0; index < this.state.profits.incomes.length; index++) {
          coins += parseFloat(this.state.profits.incomes[index].value)
          
        }
          
      this.setState({ money: coins.toFixed(2) });

    });
    
  }

  render() {
    return <td>{this.state.money}</td>;
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class TableRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td>{this.props.city}</td>
        <Income id={this.props.id} />
       <td> <ModalOverlay id={this.props.id} name={this.props.name} city={this.props.city} >
    <Button color="success" type="button">Details</Button>
  </ModalOverlay></td>
      </tr>
    );
  }
}


class Table extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <table className="table">
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Total Income</th>
            </tr>
            {this.props.data.map(function(d, i) {
              return <TableRow key={"company" + i} name={d.name} city={d.city} id={d.id} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default SearchApp;
