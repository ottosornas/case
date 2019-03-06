import React, { Component } from "react";
import "./Register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import Header from '../components/Header'



class Register extends Component {

    constructor (props) {
    super(props);
    this.state = {
        userID: "",
        name: "",
        email: "",
        password: "",
        employee_id: "",
        employees: [],
        isEmployee: false,
        firstIsEmployee: false,
        redirect: false,
        goBack: false,
        isAdmin: false,
    }
}

componentDidMount() {
    this.setStates();
    this.getEmployees();
}

setStates = () => {
    if(this.props.location.state !== undefined) {
        var isEmployed = (this.props.location.state.userToUpdate.employee_id !== null) ? true : false;
        var isAdmin = (this.props.location.state.userToUpdate.isAdmin) ? true : false;
        this.setState({
            userID: this.props.location.state.userToUpdate._id,
            name: this.props.location.state.userToUpdate.name,
            email: this.props.location.state.userToUpdate.email,
            employee_id: this.props.location.state.userToUpdate.employee_id,
            firstIsEmployee: isEmployed,
            isEmployee: isEmployed,
            isAdmin: isAdmin
        });
    }
}

getEmployees = () => {
    fetch("/api/getEmployees")
    .then(data => data.json())
    .then(res => this.setState({ employees: res.data }));
}

validateForm() {
    return (
        this.state.email.length > 0 && 
        this.state.name.length > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  updateUser = async event => {
    event.preventDefault();
    event.stopPropagation();

    var isEqual = (this.state.firstIsEmployee === this.state.isEmployee);
    if(!isEqual) {
        this.updateEmployee();
    }
    try {
        var tempId = (!isEqual && this.state.firstIsEmployee) ? null : this.state.employee_id;
        await axios.post("/api/updateUser", {
            id: this.state.userID,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            employee_id: tempId,
            admin: this.state.isAdmin
        }).then (
            alert("User updated!") 
        ).then(
            this.renderAdmin()
        )
    } catch (e) {
        alert(e.message);
    }
  }

updateEmployee = () => {
    if(this.state.firstIsEmployee === true) {
        this.deleteEmployee();  
    } else {
        this.addEmployee();
    } 
}

addEmployee = () => {

    var currentids = this.state.employees.map(id => id.id);
    let idToBeAdded = 1;
    while (currentids.includes(idToBeAdded)) {
    ++idToBeAdded;
    }
    this.state.employee_id = idToBeAdded;

    axios.post("/api/putEmployee", {
        id: this.state.employee_id,
        name: this.state.name,
        sales: 0
    })
}

deleteEmployee = () => {
    let objIdToDelete = null;
    console.log(this.props.location.state)
    this.state.employees.forEach(employee => {
        console.log(employee.id);
        console.log(this.state.employee_id)
        console.log(employee.id === this.state.employee_id)
        if(employee.id === this.state.employee_id) {
            
            objIdToDelete = employee._id;
        }
    })

    axios.delete("/api/deleteEmployee", {
        data: {
            id: objIdToDelete
          }
    })
}

renderAdmin = () => {
    this.setState({redirect: true});
}

handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    this.setState({ validated: true });
    this.updateUser(event);
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
        <div>
        <Header />
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
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicChecbox">
                    <label><input type="checkbox"  checked={this.state.isEmployee} onClick={ () => {this.setState({isEmployee : !this.state.isEmployee }); }}/>Employee</label>
                    <label><input type="checkbox"  checked={this.state.isAdmin} style={{marginLeft: '1vw'}} onClick={ () => {this.setState({isAdmin : !this.state.isAdmin }); }}/>Admin</label>
                    </Form.Group>
                    <Button 
                        block
                        variant="primary"
                        type="submit"
                        disabled={!this.validateForm()}
                    >
                        Update user
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
       </div>
    );
  }
}

export default Register;