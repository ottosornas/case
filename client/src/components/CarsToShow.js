import React, { Component } from 'react';
import CarItems from './CarItems';

class CarsToShow extends Component {
getStyle = () => {
    return{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}
    render() {
        return(
            <div style={this.getStyle()}>    
                    {this.props.data.map((data) => <CarItems key={data.id} data={data} delCar={this.props.delCar}/>)}
            </div>
            ); 
    }
    
}

export default CarsToShow;