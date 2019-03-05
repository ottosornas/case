import React, { Component } from "react";
import "./Register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Redirect } from 'react-router-dom';



class Register extends Component {

    constructor (props) {
    super(props);
    this.state = {
        brand: "",
        model: "",
        price: "",
        id: "",
        carmodels: [],
        goBack: false,
    }
}

componentDidMount() {
    this.getCarmodels();
}

getCarmodels = () => {
    fetch("/api/getCarmodels")
    .then(data => data.json())
    .then(res => this.setState({ carmodels: res.data }));
}

validateForm() {
    return (
        this.state.brand.length > 0 && 
        this.state.model.length > 0 &&
        this.state.price > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  addNewCar = async event => {
    event.preventDefault();
    var currentids = this.state.carmodels.map(id => id.id);
    let idToBeAdded = 1;
    while (currentids.includes(idToBeAdded)) {
    ++idToBeAdded;
    }
    this.state.id = idToBeAdded;
    console.log(idToBeAdded)

    try {
        await axios.post("/api/putCarmodel", {
            id: this.state.id,
            brand: this.state.brand,
            model: this.state.model,
            price: this.state.price
            
        })
        alert("Car created");
        this.goBack();

    } catch (e) {
        alert(e.message);
    }
  }

handleSubmit(event) {
    const form = event.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    this.setState({ validated: true });
    this.addNewCar(event);
}

goBack = () => {
    this.setState({ goBack: true });
}

render() {
    const { validated } = this.state;
    if(this.state.redirect) {
        return <Redirect push to="/" />;
    }else if(this.state.goBack) {
        return <Redirect push to="/" />;
    }
    return (
       <div className="Register">
            <Form 
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}
            >
                <Form.Group controlId="brand">
                    <Form.Label>Brand name</Form.Label>
                    <Form.Control
                    required
                    type="text"
                    value={this.state.brand} 
                    onChange={this.handleChange} 
                    placeholder="Enter brand"
                    />
                </Form.Group>
                <Form.Group controlId="model">
                    <Form.Label>Model</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={this.state.model} 
                        onChange={this.handleChange} 
                        placeholder="Enter model" 
                        required
                    />
                </Form.Group>

                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                    type="number" 
                    value={this.state.price}
                    onChange={this.handleChange} 
                    placeholder="Enter price" 
                    required
                    />
                </Form.Group>
                <Button 
                    block
                    variant="primary"
                    type="submit"
                    disabled={!this.validateForm()}
                >
                    Register new car
                </Button>
                <Button
                    block
                    variant="info"
                    onClick={ () => {this.setState({ goBack: true }); }}
                >
                    Back
                </Button>
            </Form>       
       </div> 
    );
  }
}

export default Register;