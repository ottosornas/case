import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
class CarItems extends Component {
    
    getDivStyle = () => {
        return {
            padding: '1vh',
            borderBottom: '1px dotted black',
            width: '30vw',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }

    getChildStyle = () => {
        return {
            width: '10vw',
            textAlign: 'center'
        }
    }

    getMidStyle = () => {
        return {
            width: '10vw',
            borderLeft: '1px solid black',
            borderRight: '1px solid black',
            textAlign: 'center'
        }
    }

    getLeftStyle = () => {
        return {
            width: '2vw',
            textAlign: 'center',
            borderRight: '1px solid black'
        }
    }

    getSecondLeftStyle = () =>  {
        return {
            width: '8vw',
            textAlign: 'center'
        }
    }

    getButtonStyle = () => {
        return {
            float: "right" 
        }
    }
    
    render() {
        const {id, brand, model, price} = this.props.data;
        return (
            <div style={{display: "flex"}}>
            <div style={this.getDivStyle()}>
            <div style={this.getLeftStyle()}>
                { id }
            </div>
            <div style={this.getSecondLeftStyle()}>
                {brand}
            </div>
            <div style={this.getMidStyle()}>
                {model}
            </div>
            <div style={this.getChildStyle()}>
                {price}
            <Button onClick={this.props.delCar.bind(this, id)} variant="danger" style={this.getButtonStyle()}>x</Button>
            </div>
            </div>
            </div>
    )}
    
}
export default CarItems;