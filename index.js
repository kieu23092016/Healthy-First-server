const express = require("express");
const app = express();

const cors = require("cors");

//parse json to express 
app.use(express.json());
app.use(cors());
const db = require('./models')

// Routers
const certRouter = require('./route/Certification')
app.use("/certification", certRouter);

const usersRouter = require('./route/Users')
app.use("/auth", usersRouter);

const departmentRouter = require('./route/Departments')
app.use("/departments", departmentRouter);

db.sequelize.sync().then(()=>{
    app.listen(3002, ()=>{
        console.log("Server running on port 3001");
    })
})
