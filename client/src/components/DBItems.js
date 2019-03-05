import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class DBItems extends Component {
    
    getDivStyle = () => {
        return {
            padding: '1vh',
            borderBottom: '1px dotted black',
            width: '30vw',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center'
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

    render() {
        const {sales, id, name} = this.props.data;
        return (
            <div style={this.getDivStyle()}>
            <div style={this.getChildStyle()}>
                { id }
            </div>
            <div style={this.getMidStyle()}>
                {name}
            </div>
            <div style={this.getChildStyle()}>
                {sales}
            </div>
            </div>
    )}
    
}
export default DBItems;