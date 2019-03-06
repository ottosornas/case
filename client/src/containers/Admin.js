import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import UsersToShow from '../components/UsersToShow';
import '../App.css';
import Button from 'react-bootstrap/Button';

class Admin extends Component {
  constructor (props) {
    super(props);
    this.state = {
        users: [],
        update: false,
        userToUpdate: {},
        addCar: false
    }
}

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    fetch("/api/getUsers")
      .then(data => data.json())
      .then(res => this.setState({ users: res.data }));
  }

  putEmployee = (id, name) => {
      var currentEmployeeIds = this.state.employees.map(employee => employee.id);
      if(!currentEmployeeIds.includes(id)){ 
        axios.post("/api/putEmployee", {
          id: id,
          name: name,
          sales: 0
        });
      } 
    }

  updateUser = (user) => {
    console.log(user);
    this.setState({
      userToUpdate: user,
      update: true});
  }

  delUser = (emailToDelete) => {
    var objIdToDelete;
    this.state.users.map(user => {
      if(emailToDelete === user.email) {
        objIdToDelete = user._id;
      }
    })
    
    axios.delete("/api/deleteUser", {
      data: {
        id: objIdToDelete
      }
    });
    window.location.reload();
  }

  addNewUser = () => {
    this.setState({addCar: true});
  }

    render () {
        if(sessionStorage.getItem("admin") !== "true"){
            alert("You need to be an admin in order to view this page!");
            return <Redirect push to="/" />
        }else if(this.state.update){
          return <Redirect to={{
            pathname: '/editUser',
            state: {userToUpdate: this.state.userToUpdate}
          }} />
        }else if(this.state.addCar) {
          return <Redirect to="/registerNewUser" />
        }

        const {users} = this.state;
        return(
            <div>
                <Header />
                <div className={"titelDiv"}>
                  <div className="mainTitle">
                    <h1>Admin page<hr /></h1>
                    <h4><p>Table of all users</p></h4>
                    <Button variant="primary" onClick={() => this.addNewUser()}>Add new user</Button>
                  </div>
                  <div className={'titel'}>
                    <div className={"columnTitel"}>
                      <h6>Employee ID</h6>
                    </div>
                    <div className={"columnTitel"}>
                        <h6>Name</h6>
                    </div>
                    <div className={"columnTitel"}>
                        <h6>Email</h6>
                    </div>
                    <div className={"adminTitel"}>
                        <h6>Admin</h6>
                    </div>
                    <div className={"buttonTitel"}>
                        <h6>Edit/delete user</h6>
                    </div>
                  </div>
                </div>
                <div>
                  {users.length <= 0
                  ? "NO USER ENTRIES YET"
                  : <UsersToShow data={this.state.users} updateUser={this.updateUser} delUser={this.delUser} /> } 
               </div>
            </div>

        )
    }
}

export default Admin;