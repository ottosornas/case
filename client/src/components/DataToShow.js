import React, { Component } from 'react';
import DBItems from './DBItems';

class DataToShow extends Component {
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
                    {this.props.data.map((data) => <DBItems key={data.id} data={data}/>)}
            </div>
            ); 
    }
    
}

export default DataToShow;