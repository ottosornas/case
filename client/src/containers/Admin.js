import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Admin extends Component {
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
    
      putCarmodel = (id, brand, model, price) => {
        var currentModelIds = this.state.carmodels.map(model => model.id);
        if(!currentModelIds.includes(id)){ 
          axios.post("/api/putCarmodel", {
            id: id,
            brand: brand,
            model: model,
            price: price
          });
        }
      }
       // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    axios.post("/api/putData", {
      id: idToBeAdded,
      message: message
    });   
  };


  // our delete method that uses our backend api 
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    }); 

    axios.delete("/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };
  updateID = (newID) => {
    console.log('NewID: ' + newID);
    this.setState({
      idToUpdate: newID,
      visible: true
    })

  }
                /* <div>
                    {data.length <= 0
                    ? "NO DB ENTRIES YET"
                    : <DataToShow data={this.state.employees} delItem={this.deleteFromDB} updateID={this.updateID}/> } 
               </div>
               <div className={buttonVisibilty}>
               <input
                 type="text"
                 className={"updateTextBar"}
                 onChange={e => this.setState({ updateToApply: e.target.value })}
                 placeholder="Put new value of the item here"
                 />
               <Button variant="primary"
                 onClick={() =>
                   this.updateDB(this.state.idToUpdate, this.state.updateToApply)
                 }
                 >
                 UPDATE
               </Button>
             </div> */
    render () {
        if(!sessionStorage.getItem("admin")){
            alert("You need to be an admin in order to view this page!");
            return <Redirect push to="/" />
          }
        return(
            <div>
                <h1>
                    ADMIN PAGE
                </h1>
                
            </div>

        )
    }
}

export default Admin;