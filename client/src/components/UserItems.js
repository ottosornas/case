import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class UserItems extends Component {
    
    getDivStyle = () => {
        return {
            padding: '1vh',
            borderBottom: '1px dotted black',
            width: '44vw',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            height: '6vh',
            alignItems: 'center'
        }
    }

    getChildStyle = () => {
        return {
            width: '10vw',
            textAlign: 'center',
            borderRight: '1px solid black'
        }
    }

    getButtonStyle = () => {
        return {
            width: '7vw',
            textAlign: 'center',
        }
    }

    getAdminStyle = () => {
        return {
            width: '6vw',
            textAlign: 'center',
            borderRight: '1px solid black'
        }
    }

    render() {
        const {name, email, isAdmin, employee_id} = this.props.data;
        var admin = isAdmin ? "Yes" : "No";
        var employee = (employee_id !== null) ? employee_id : "Not an employee"; 
        return (
            <div style={this.getDivStyle()}>
            <div style={this.getChildStyle()}>
                { employee }
            </div>
            <div style={this.getChildStyle()}>
                {name}
            </div>
            <div style={this.getChildStyle()}>
                { email }
            </div>
            <div style={this.getAdminStyle()}>
                { admin }
            </div>
            <div style={this.getButtonStyle()}>
            <Button variant="secondary" style={{marginRight:'1vw'}} onClick={this.props.updateUser.bind(this, this.props.data)}>Edit</Button>
            <Button variant="danger" onClick={this.props.delUser.bind(this, email)}>x</Button>
            </div>
            </div>
    )}
    
}
export default UserItems;