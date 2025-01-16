//Connection to a mySql database

const cors = require("cors")
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
    origin: "http://127.0.0.1:5500"
}))

const { 
    createPool 
} = require('mysql');


const pool = createPool({
    host : "localhost",
    user : "root",
    password : "",
    database : "tennis_court_booking",
    connectionLimit: 10
});

/*pool.getConnection((err, connection) => {
    if(err){
        console.log("error connecting to the database: ", err);
    }
    else{
        console.log("Connected to the database!");
    }
    connection.release();
})*/


app.post("/bookings", (req, res) => {

    const bookings = req.body[0];
    console.log("hRequest recived ", req.body);

    bookings.forEach(booking => {
        console.log(booking.name);
    });

       // console.log({bkID, court, date, time, name});
})


app.listen(port, () => {
    console.log("Server running on http://localhost:" + port);
})
//pool.query("select * from bookings", (err, result, fields) => );