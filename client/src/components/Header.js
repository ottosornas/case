import React, {Component} from 'react';
import {Navbar, Button, Nav} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './Header.css';
import axios from "axios";


class Header extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            signIn: false,
            signUp: false,
            redirect: false,
            admin: false,
            home: false
        }
    }
    getStyle = () => {
        return {
            marginRight: '1vw'
        }
    }

    getSignButtonStyle = () => {
        return {
            display: sessionStorage.getItem("isLoggedIn") ? 'none' : 'inline'
        }
    }

    getWelcomeTextstyle = () => {
        return {
            display: sessionStorage.getItem("isLoggedIn") ? 'inline' : 'none'
        }
    }

    logout = () => {
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("admin");
        axios.post("/api/logout", {
        });
        this.setHome();
    }

    setHome = () => {
        if(window.location.pathname !== '/'){
            this.setState({home: true});
        }else {
            window.location.reload();
        }
    }

    setProfile = () => {
        if(window.location.pathname !== '/profile'){
            this.setState({redirect: true});
        }
    }

    setAdmin = () => {
        if(window.location.pathname !== '/admin'){
            this.setState({admin: true});
        }
    }

    setSignin = () => {
        if(window.location.pathname !== '/login'){
            this.setState({signIn: true});
        }
    }

    setSignup = () => {
        if(window.location.pathname !== '/signup'){
            this.setState({signUp: true});
        }
    }
    render() {
        if(this.state.signIn) {
            return <Redirect push to="/login" />;
        }else if(this.state.signUp) {
            return <Redirect push to="/register" />;
        }else if(this.state.redirect) {
            return <Redirect push to="/profile" />;
        }else if(this.state.admin) {
            return <Redirect push to="/admin" />
        }else if(this.state.home) {
            return <Redirect push to="/" />
        }
        return (
            <Navbar bg="dark" variant="dark">
            <div style={this.getSignButtonStyle()}> 
                <Button 
                    variant="outline-success" 
                    style={this.getStyle()}
                    onClick={() => this.setSignin()}
                    >
                    Sign in
                </Button>
                <Button 
                    variant="info"
                    onClick={() => this.setSignup()}
                >
                Sign up
                </Button>
            </div>
            <div style={this.getWelcomeTextstyle()}>
                <Navbar.Brand>Logged in as: {sessionStorage.getItem("name")}</Navbar.Brand>
            </div>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link
                    onClick={() => this.setHome()}
                    >
                    Home
                    </Nav.Link>
                    <Nav.Link 
                        onClick={() => this.setProfile()}
                    >
                    Profile
                    </Nav.Link>
                    <Nav.Link
                        onClick={() => this.setAdmin()}
                    >
                    Admin tools
                    </Nav.Link>
                    <Nav.Link 
                        onClick={() => this.logout()}
                    >
                    Logout
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>   
        </Navbar>
        )
    }
}

export default Header;
