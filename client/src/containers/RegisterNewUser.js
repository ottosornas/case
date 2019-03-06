import React, { Component } from "react";
import "./Register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Redirect } from 'react-router-dom';



class RegisterNewUser extends Component {

    constructor (props) {
    super(props);
    this.state = {
        name: "",
        email: "",
        password: "",
        employee_id: "",
        employees: [],
        isEmployee: false,
        redirect: false,
        goBack: false,
        isAdmin: false
    }
}

componentDidMount() {
    this.getEmployees();
}

getEmployees = () => {
    fetch("/api/getEmployees")
    .then(data => data.json())
    .then(res => this.setState({ employees: res.data }));
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
    if(this.state.isEmployee){
        var currentids = this.state.employees.map(id => id.id);
        let idToBeAdded = 1;
        while (currentids.includes(idToBeAdded)) {
        ++idToBeAdded;
        }
        this.state.employee_id = idToBeAdded;
    }

    try {
        await axios.post("/api/putUser", {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            employee_id: this.state.employee_id,
            admin: this.state.isAdmin
        })

    } catch (e) {
        alert(e.message);
        window.location.reload();
    }
    if (this.state.isEmployee) this.addEmployee();
        alert("User created");
  }

addEmployee = () => {
    axios.post("/api/putEmployee", {
        id: this.state.employee_id,
        name: this.state.name,
        sales: 0
    })
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
    if(sessionStorage.getItem("admin") !== "true"){
        alert("You need to be an admin in order to view this page!");
        return <Redirect push to="/" />
    }
    const { validated } = this.state;
    if(this.state.redirect) {
        return <Redirect push to="/admin" />;
    }else if(this.state.goBack) {
        return <Redirect push to="/admin" />;
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
                <Form.Group controlId="formBasicChecbox">
                <label><input type="checkbox"  onClick={ () => {this.setState({isEmployee : !this.state.isEmployee }); }}/>Employee</label>
                <label><input type="checkbox"  style={{marginLeft: '1vw'}} onClick={ () => {this.setState({isAdmin : !this.state.isAdmin }); }}/>Admin</label>
                </Form.Group>
                <Button 
                    block
                    variant="primary"
                    type="submit"
                    disabled={!this.validateForm()}
                >
                    Register new user
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

export default RegisterNewUser;