const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const express = require('express');
const app = express();
const router = express.Router();
const Data = require("./data");
const Employees = require("./employees");
const Carmodels = require("./carmodels");
const Sales = require("./sales");
const Users = require("./users");
var session = require('express-session');
var bcrypt = require('bcrypt');


//mongodb+srv://otto:<LuniocoreC4se>@cluster0-igwku.mongodb.net/test?retryWrites=true
//const dbRoute = "mongodb://otto:lunicorecase@cluster0-shard-00-00-igwku.mongodb.net:27017,cluster0-shard-00-01-igwku.mongodb.net:27017,cluster0-shard-00-02-igwku.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
const dbRoute = "mongodb://otto:lunicorecase@cluster0-shard-00-00-igwku.mongodb.net:27017,cluster0-shard-00-01-igwku.mongodb.net:27017,cluster0-shard-00-02-igwku.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
// connects our back end code with the database
mongoose.connect(
    dbRoute,
      { useNewUrlParser: true }
    );
  
    mongoose.set('useFindAndModify', false);
    let db = mongoose.connection;
  
    db.once("open", () => console.log("connected to the database"));
  
    // checks if connection with the database is successful
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
  
    // (optional) only made for logging and
    // bodyParser, parses the request body to be a readable json format
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(logger("dev"));

    // Set up an Express session,
    app.use( session({
        secret            : 'super secret key',
        resave            : false,
        saveUninitialized : true
    }));
    
   
router.post("/putEmployee", (req, res) => {
    let employee = new Employees();
    const { id, name, sales } = req.body;
    
    employee.id = id;
    employee.name = name;
    employee.sales = sales;

    employee.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
})

router.post("/putCarmodel", (req, res) => {
    let carmodel = new Carmodels();
    const { id, brand, model, price } = req.body;

    carmodel.id = id;
    carmodel.brand = brand;
    carmodel.model = model;
    carmodel.price = price;

    carmodel.save(err => {
        if (err) return res.json({ success: false, error: err});
        return res.json({ success: true });
    });
})

router.post("/putUser", (req, res) => {
    let user = new Users();
    const { name, email, password, employee_id, admin } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return throwError(err, res);
        user.name = name;
        user.email = email;
        user.password = hash;
        user.employee_id = employee_id;
        user.isAdmin = admin;
        
        console.log("ID: " + employee_id);
        user.save(err => {
            if (err) return res.json({ success: false, error: err});
            return res.json({ success: true });
        });
    })
})

router.get('/isAuthenticated', (req, res) => {
    if(!req.session.isLoggedIn) return res.json({success:false, error:"Not logged in"});
    return res.json({success: true, name:req.session.name, id:req.session.eid, isAdmin:req.session.isAdmin});
})

router.post("/login", (req, res) => {
    const {email, password } = req.body;
    
    Users.find({"email": email}, (err, user) => {
        if (err) return throwError(err, res);
        const hash = user.password;
        bcrypt.compare(password, hash, (err, match => {
            if (err) return throwError(err, res);
            if (match) {
                req.session.regenerate((err) => {
                    req.session.isLoggedIn = true;
                    req.session.isAdmin = user[0].admin;
                    req.session.name = user[0].name;
                    req.session.eid = user[0].employee_id;
                    return res.json({success:true});
                })
            }else {
                return res.json({ success: false, error: err});
            }
        }))

    })
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return throwError(err, res);
        return res.json({success:true});
    })
})

router.post("/putSale", (req, res) => {
    let sale = new Sales();
    const { id, employee_id, carmodel_id } = req.body;

    sale.id = id;
    sale.employee_id = employee_id;
    sale.carmodel_id = carmodel_id;

    sale.save(err => {
        if (err) return res.json({ success: false, error: err});
        return res.json({ success: true });
    });
})

router.get("/getUsers", (req, res) => {
    Users.find((err, data) => {
        if (err) return res.json({ success: false, error: err});
        return res.json({ success: true, data: data});
    });
});

router.get("/getEmployees", (req, res) => {
    Employees.find((err, data) => {
        if (err) return res.json({ success: false, error: err});
        return res. json({ success: true, data: data});
    });;
});

router.get("/getCarmodels", (req, res) => {
    Carmodels.find((err, data) => {
        if (err) return res.json({ success: false, error: err});
        return res. json({ success: true, data: data});
    });;
});

router.get("/getSales", (req, res) => {
    Sales.find((err, data) => {
        if (err) return res.json({ success: false, error: err});
        return res. json({ success: true, data: data});
    });;
});
    
// this is our update method
// this method overwrites existing data in our database
router.post("/updateSales", (req, res) => {
    const { id, update } = req.body;
    var query = {"_id": id};
    var updater = update;

    Employees.findOneAndUpdate(query, updater, function(err, dat) {
        if (err) {
            console.log('got an error' + err);
        }
    });
});

router.post("/updateUser", (req, res) => {
    const { id, password, name, email, employee_id, admin } = req.body;
    var query = {"_id": id};

    if(password.length > 0) {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return throwError(err, res);
            var updater = {
                name: name,
                email: email,
                password: hash,
                employee_id: employee_id,
                isAdmin: admin
            }      
        })
    }else {
        var updater = {
            name: name,
            email: email,
            employee_id: employee_id,
            isAdmin: admin
        }       
    }
    Users.findOneAndUpdate(query, updater, function(err, dat) {
        if (err) {
            console.log('got an error' + err);
        }
    });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteCar", (req, res) => {
    const { id } = req.body;
    var idToDelete = {"_id": id};

    Carmodels.findOneAndDelete(idToDelete, function(err, offer) {
        if (err) console.log(err);
    });
});

router.delete("/deleteEmployee", (req, res) => {
    const { id } = req.body;
    var idToDelete = {"_id": id};
    console.log(idToDelete);
    Employees.findOneAndDelete(idToDelete, function(err, offer) {
        if (err) console.log(err);
    });
});

router.delete("/deleteUser", (req, res) => {
    const { id } = req.body;
    var idToDelete = {"_id": id};
    console.log(idToDelete);
    Users.findOneAndDelete(idToDelete, function(err, offer) {
        if (err) console.log(err);
    });
});


// append /api for our http requests
app.use("/api", router);

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));