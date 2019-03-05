import React, { Component } from 'react';

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
        const {brand, model, price} = this.props.data;
        return (
            <div style={this.getDivStyle()}>
            <div style={this.getChildStyle()}>
                {brand}
            </div>
            <div style={this.getMidStyle()}>
                {model}
            </div>
            <div style={this.getChildStyle()}>
                {price}
            </div>
            </div>
    )}
    
}
export default DBItems;