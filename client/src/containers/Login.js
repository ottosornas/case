import React, { Component } from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Redirect } from 'react-router-dom';
import Axios from "axios";

class Login extends Component {
constructor (props) {
    super(props);
    this.state = {
        email: "",
        password: "",
        redirect: false,
        success: false
    }
}

login = async event => {
    event.preventDefault();
    try {
        await Axios.post("/api/login", {
            email: this.state.email,
            password: this.state.password,
        })
        alert("User logged in");
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("email", this.state.email);
        this.renderHome();

    } catch (e) {
        alert(e.message);
    }
}

renderHome = () => {
    this.setState({success: true});
}

validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.login(event);
  }

  renderRegister = () => {
      this.setState({redirect: true});
  }
render() {
    if(this.state.redirect) {
        return <Redirect push to="/register" />;
    }else if(this.state.success) {
        return <Redirect push to="/" />
    }
    return (
        <div className="Login">
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        placeholder="Enter email" 
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    value={this.state.password}
                    onChange={this.handleChange} 
                    placeholder="Password" 
                    />
                </Form.Group>
                <Button
                    block
                    disabled={!this.validateForm()}
                    type="submit"
                >
                    Login
            </Button>
            <Button 
                block
                variant="secondary"
                onClick={this.renderRegister}
            >
                Not a user? Register here!
            </Button>
            </Form>

            <div>
                
            </div>
        </div>

       
    );
  }
}

export default Login;