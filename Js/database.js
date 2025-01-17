//Connection to a mySql database

const cors = require("cors")
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
    //origin: "http://127.0.0.1:5500"
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

app.post("/bookings", (req, res) => {

    const bookings = req.body[0];
    console.log("hRequest recived ", req.body);

    console.log("Bookings: ", bookings);

    let queryPromises = [];

    bookings.forEach(booking => {
        console.log(booking.name);

        const query = ("INSERT INTO bookings (bkNumber, Court, Date, Time, Name) VALUES (?,?,?,?,?)");
        const values = [booking.bkID, booking.court, booking.date, booking.time, booking.name];


        queryPromises.push(
            new Promise((resolve, reject) => {
                pool.query(query, values, (error, resaults) => {
                    
                    if(error){
                        reject(error);
                    }
                    else {
                        resolve(resaults);
                    }
                });
            })
        ); 
    });


    Promise.all(queryPromises)
        .then(() => {
            console.log("send");
            res.status(200).json({message: "!All bookings successfully added"});
        })
        .catch(error => {
            console.error("Error insering bookings:", error);
            res.status(500).json({error: "An error ocurred while adding bookings."});
        });

       // console.log({bkID, court, date, time, name});
})


app.get("/getBookings", (req, res) => {

    console.log("Get bookings");

    const query = "SELECT * FROM bookings";

    pool.query(query, (error, results) => {
        if(error) {
            console.log("Error fetching bookings:", error);
            res.status(500).json({ error: "An error occurred while fetching bookings"});
        }
        else{

            console.log("Raw results from database:", results);
            const cleanResults = JSON.parse(JSON.stringify(results));
            console.log("Bookings fetched from database:", cleanResults);
            res.status(200).json(cleanResults);
        }

    })
})


app.listen(port, "0.0.0.0", () => {
    console.log("Server running on http://localhost:" + port);
})
//pool.query("select * from bookings", (err, result, fields) => );