import React, { Component } from 'react';
import Header from "../components/Header";
import Guestview from "./Guestview";
import ListSales from "../components/ListSales";
import "./Profile.css";

class Profile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            sales:[]
        }
    }

    componentDidMount() {
        this.getSales();
    }

    getSales = () => {
        fetch("/api/getSales")
        .then(data => data.json())
        .then(res => this.setState({ sales: res.data}));
    }

    render () {
        if(sessionStorage.getItem("id") === null){
            return (
                <div>
                 <Header />
                 <Guestview />
             </div>
         )
        }
        var name = sessionStorage.getItem("name"); 
        var id = sessionStorage.getItem("id"); 
        return (
            <div>
                <Header />
                <div className={"flexContainer"}>
                    <h1>{name}<hr /></h1>
                    <h3><p>Employee id: {id}</p></h3>
                    <h5><p>Your total sales:</p></h5>
                        <div className={"salesListing"}>
                            <div className={"columnTitel"}>
                                <h6>Brand</h6>
                            </div>
                            <div className={"columnTitel"}>
                                <h6>Model</h6>
                            </div>
                            <div className={"columnTitel"}>
                                <h6>Price</h6>
                            </div>
                        </div>
                        <ListSales data={this.state.sales}/>
                </div>
            </div>
        );
    }
}

export default Profile;