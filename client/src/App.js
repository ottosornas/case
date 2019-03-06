// /client/App.js
import React, { Component } from "react";
import axios from "axios";
import DataToShow from "./components/DataToShow.js";
import CarsToShow from "./components/CarsToShow.js";
import './App.css';
import Header from './components/Header.js';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

class App extends Component {
  // initialize our state 
  state = {
    employees: [],
    users: [],
    carmodels: [],
    sales: [],
    addCar: false
  };


  componentDidMount() {
    this.getDataFromDb();
   // this.updateSales();
  }
  
  componentDidUpdate() {
    this.setSessionKeys();
  }
  
  setSessionKeys = () => {
    this.state.users.map(user => {
      if(user.email === sessionStorage.getItem("email")) {
        sessionStorage.setItem("name", user.name);
        sessionStorage.setItem("admin", user.isAdmin);
        this.state.employees.map(employee => {
          console.log("comparing: " + employee.name + " " +  user.name + (employee.name === user.name));
          if(employee.name === user.name) {
            console.log(employee.id);
            sessionStorage.setItem("id", employee.id);
            console.log(sessionStorage.getItem("id"))
          }
        })
      }
    })
  }
  
  makeSalesZero = () => {
    this.state.employees.map(employee => {
      employee.sales = 0;
    })
  }

  iterateFunc = (id) => {
    this.state.sales.map(sale => {
      if(sale.employee_id === id) {
        this.state.carmodels.map(model => {
          if(model.id === sale.carmodel_id) {
            this.updateEmployee(id, model.price); 
          }
        })
      }
    })
  }

  updateSales = () => {
    this.makeSalesZero();

    this.state.employees.map(employee => {
      this.iterateFunc(employee.id)
    })
  }

  getDataFromDb = () => {
    fetch("/api/getUsers")
      .then(data => data.json())
      .then(res => this.setState({ users: res.data }));
    
    fetch("/api/getEmployees")
      .then(data => data.json())
      .then(res => this.setState({ employees: res.data }));
    
    fetch("/api/getCarmodels")
      .then(data => data.json())
      .then(res => this.setState({ carmodels: res.data }))
    
    fetch("/api/getSales")
      .then(data => data.json())
      .then(res => this.setState({ sales: res.data }))
    };

  updateEmployee = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    let newSaleSum = 0;
    this.state.employees.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
        newSaleSum = dat.sales + updateToApply;
        dat.sales=newSaleSum;
      }
    });

    axios.post("/api/updateSales", {
      id: objIdToUpdate,
      update: { sales: newSaleSum }
    });
  };

  delCar = (idTodelete) => {
    let objIdToDelete = null;
    this.state.carmodels.forEach(car => {
      if (car.id === idTodelete) {
        objIdToDelete = car._id;
      }
    }); 
    
    try {
      axios.delete("/api/deleteCar", {
        data: {
          id: objIdToDelete
        }
      })
    } catch (e) {
      alert(e.message);
    } finally {
      window.location.reload();
    }
  }

  addNewCar = () => {
    this.setState({addCar: true});
  }

  render() {
    if(this.state.addCar){
      return <Redirect push to="/addCar" />
    }
    const {employees, carmodels} = this.state;
    return (
    <div>
      <main>
        {this.props.children}
      </main>
      <Header />
      <div className={"mainTitle"}>
      <h1>Welcome to the carshop <hr /></h1>
      <h4><p>You can find all the data below</p></h4>
        <Button variant="primary" onClick={() => this.addNewCar()}>Add new car</Button>
      </div>
      <div className={"leftTable"}>
      <div className={"employeeTitel"}>
        <h3>EMPLOYEES<hr /></h3>
        </div>
        <div className={'employees'}>
          <div className={"columnTitel"}>
            <h6>Employee ID</h6>
          </div>
          <div className={"columnTitel"}>
              <h6>Name</h6>
          </div>
          <div className={"columnTitel"}>
              <h6>Total Sales</h6>
          </div>
        </div>
          {employees.length <= 0
          ? "NO EMPLOYEES"
          : <DataToShow data={this.state.employees}/> } 
        </div>
      <div className={"rightTable"}>
        <div className={"carTitel"}>
        <h3>CARS <hr /></h3>
        </div>
        <div className={'cars'}>
        <div className={"idTitel"}>
            <h6>ID</h6>
          </div>
          <div className={"brandTitel"}>
            <h6>Brand</h6>
          </div>
          <div className={"columnTitel"}>
              <h6>Model</h6>
          </div>
          <div className={"columnTitel"}>
              <h6>Price</h6>
          </div>
        </div>
          {carmodels.length <= 0
          ? "NO CARS"
          : <CarsToShow data={this.state.carmodels} delCar={this.delCar}/> } 
      </div>
    </div>
    );
  }
}

export default App;
