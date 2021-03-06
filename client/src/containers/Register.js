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
        name: "",
        email: "",
        password: "",
        redirect: false,
        goBack: false,
        isAdmin: false
    }
}


validateForm() {
    return (
        this.state.email.length > 0 && 
        this.state.password.length > 0 &&
        this.state.name.length > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  addNewUser = async event => {
    event.preventDefault();
    try {
        await axios.post("/api/putUser", {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            employee_id: "",
            admin: false
        })

    } catch (e) {
        alert(e.message);
        window.location.reload();
    }
        alert("User created");
    try {
        await axios.post("/api/login", {
            email: this.state.email,
            password: this.state.password,
        })
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("email", this.state.email);
        this.renderHome();

    } catch (e) {
        alert(e.message);
    }
  }


renderHome = () => {
    this.setState({redirect: true});
}

handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    this.setState({ validated: true });
    this.addNewUser(event);
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
                <Form.Group controlId="name">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                    required
                    type="text"
                    value={this.state.name} 
                    onChange={this.handleChange} 
                    placeholder="Full name"
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        placeholder="Enter email" 
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    value={this.state.password}
                    onChange={this.handleChange} 
                    placeholder="Password" 
                    required
                    />
                </Form.Group>
                <Button 
                    block
                    variant="primary"
                    type="submit"
                    disabled={!this.validateForm()}
                >
                    Register
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