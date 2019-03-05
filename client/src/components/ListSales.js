import React, { Component } from 'react';
import Sales from './SalesToShow';

class ListSales extends Component {
    constructor (props) {
        super(props);
        this.state = {
            carmodels:[]
        }
    }

componentDidMount() {
    this.getCarmodels();
}

getStyle = () => {
    return{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

getCarmodels = () => {
    fetch("/api/getCarmodels")
    .then(data => data.json())
    .then(res => this.setState({ carmodels: res.data }));
}

returnSale = (sale) => {
    if(sale.employee_id == sessionStorage.getItem("id")){
        var carToDisplay = {};
        this.state.carmodels.map(car => {
            if(car.id === sale.carmodel_id) {
                carToDisplay = car;
            }
        });
        return (
            <div> 
                <Sales key={sale.id} data={carToDisplay}/>
            </div>
        );
    }
}
    render() {
        return(
            <div style={this.getStyle()}>    
                    {this.props.data.map((sale) => this.returnSale(sale))}
                
            </div>
            ); 
    }
    
}

export default ListSales;