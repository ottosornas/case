import React, { Component } from 'react';
import UserItems from './UserItems';

class UsersToShow extends Component {
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
                    {this.props.data.map((data) => <UserItems key={data.id} data={data} updateUser={this.props.updateUser} delUser={this.props.delUser}/>)}
            </div>
            ); 
    }
    
}

export default UsersToShow;