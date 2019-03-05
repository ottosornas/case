import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Guestview extends Component {

    getStyle = () => {
        return {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '15vh'
        }
    }

    render () {
        if(!sessionStorage.getItem("isLoggedIn")){
            alert("You need to be logged in to view this page!");
            return <Redirect push to="/" />
          }
        return (
            <div style={this.getStyle()}>
                <h1><p>Empty profile page for {sessionStorage.getItem("name")}</p></h1>
                <h5><p>Become an employee and watch as this page becomes populated...</p></h5>
            </div>
        )
    }
}

export default Guestview;