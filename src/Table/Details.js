import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Table } from 'reactstrap';
import { Badge } from 'reactstrap';
import axios from "axios";
import { FormGroup, Label, Input} from 'reactstrap';

const Example = (props) => {
  return (
    <tr>
<th scope="row">{props.value}</th>
  <th>{props.date}</th>
          
        </tr>
  );
}

class ModalOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      money:[],
      dates:[],
      values:[],
      month:'',
     // monthIncome:''
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const url = "https://recruitment.hal.skygate.io/incomes/";

    let adress = url.concat(this.props.id);

    axios.get(adress).then(res => {
      this.setState({ money: res.data });
    
      
      this.state.money.incomes.sort((a, b) => (a.date > b.date) ? 1 : -1)// sortowanie po dacie 
     
      for (let index = 0; index < this.state.money.incomes.length; index++) {
        this.state.dates.push(this.state.money.incomes[index].date)
        this.state.values.push(this.state.money.incomes[index].value)
     
      }

    });
    
    
  }
  handleChange = (event) => {
    this.setState({ month: event.target.value });
  }

  toggle() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }
   
  render() {
    const { className, children } = this.props;
    const { showModal } = this.state;
    
    let options =[]
    const rows = []
    let range = parseInt(this.state.month)
   
    for (let z = 0; z <this.state.values.length; z++) { //render incomes range
      
      options.push(  <option>{z+1}</option> )
     
      }
   
    for (let y = 0; y <range; y++) { //render rows
      
      rows.push( <Example date={this.state.dates[y]} value={this.state.values[y]} /> )
   
    }

    let monthIncome=0;
    for (let size = 0; size <range; size++) { //render rows
      
      monthIncome += parseFloat(this.state.values[size])
        
    }
   //console.log(monthIncome)
   
    
    return (
      <div>
        {React.cloneElement(React.Children.only(children), {
          onClick: this.toggle
        })}
        <Modal isOpen={showModal} toggle={this.toggle} className={className}>
          <ModalHeader toggle={this.toggle}>Company City {this.props.city} </ModalHeader>
          <Badge color="secondary">Company id: {this.state.money.id} Name: {this.props.name}</Badge>
          <ModalBody>
          <Table dark>
            
      <thead>
        <tr>
          <th> total value:{monthIncome.toFixed(2)} </th>
          <th>Date
          <FormGroup>
        <Label for="exampleSelect">Select months</Label>
        <Input type="select" value={this.state.month} onChange={this.handleChange} name="select" id="exampleSelect">
          {options}
        </Input>
      </FormGroup>
          </th>
          
        </tr>
      </thead>
      <tbody>
   
        {rows}
      </tbody>
    </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Ok
            </Button>{" "}
           
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalOverlay;
